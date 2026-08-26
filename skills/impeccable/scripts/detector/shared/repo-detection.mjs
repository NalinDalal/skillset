import fs from 'node:fs';
import path from 'node:path';

const MONOREPO_TOOLING_FILES = ['turbo.json', 'nx.json', 'lerna.json'];
const WORKSPACE_CONFIG_FILES = ['pnpm-workspace.yaml'];
const MONOREPO_FALLBACK_PROJECT_DIRS = ['apps', 'packages'];
const WORKSPACE_DISCOVERY_IGNORED_DIRS = new Set([
  'node_modules',
  '.git',
  'dist',
  'build',
  '.next',
  '.nuxt',
  '.svelte-kit',
  '.turbo',
  '.cache',
  'coverage',
  'vendor',
  'vendors',
]);

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    return null;
  }
}

function stripYamlInlineComment(line) {
  let quote = null;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if ((ch === '"' || ch === "'") && line[i - 1] !== '\\') {
      quote = quote === ch ? null : quote || ch;
      continue;
    }
    if (ch === '#' && !quote) return line.slice(0, i);
  }
  return line;
}

function parseYamlFlowList(body) {
  const items = [];
  let quote = null;
  let current = '';
  for (let i = 0; i < body.length; i++) {
    const ch = body[i];
    if ((ch === '"' || ch === "'") && body[i - 1] !== '\\') {
      quote = quote === ch ? null : quote || ch;
      current += ch;
      continue;
    }
    if (ch === ',' && !quote) {
      const value = unquoteYamlValue(current);
      if (value) items.push(value);
      current = '';
      continue;
    }
    current += ch;
  }
  const value = unquoteYamlValue(current);
  if (value) items.push(value);
  return items;
}

function unquoteYamlValue(value) {
  return String(value || '')
    .trim()
    .replace(/^['"]|['"]$/g, '');
}

function readPackageWorkspaces(repoRoot) {
  const pkg = readJson(path.join(repoRoot, 'package.json'));
  const workspaces = pkg?.workspaces;
  if (Array.isArray(workspaces)) return workspaces;
  if (Array.isArray(workspaces?.packages)) return workspaces.packages;
  return [];
}

function readLernaWorkspaces(repoRoot) {
  const lerna = readJson(path.join(repoRoot, 'lerna.json'));
  return Array.isArray(lerna?.packages) ? lerna.packages : [];
}

function readPnpmWorkspaces(repoRoot) {
  try {
    const body = fs.readFileSync(path.join(repoRoot, 'pnpm-workspace.yaml'), 'utf-8');
    const patterns = [];
    let inPackages = false;
    for (const line of body.split(/\r?\n/)) {
      const trimmed = stripYamlInlineComment(line).trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const flowMatch = trimmed.match(/^packages:\s*\[(.*)\]\s*$/);
      if (flowMatch) {
        patterns.push(...parseYamlFlowList(flowMatch[1]));
        inPackages = false;
        continue;
      }
      if (/^packages:\s*$/.test(trimmed)) {
        inPackages = true;
        continue;
      }
      if (inPackages && /^[A-Za-z0-9_-]+:\s*/test(trimmed)) break;
      if (inPackages) {
        const match = trimmed.match(/^-\s*(.+)$/);
        if (match) patterns.push(unquoteYamlValue(match[1]));
      }
    }
    return patterns;
  } catch {
    return [];
  }
}

function readImpeccableProjectRoots(repoRoot) {
  const patterns = [];
  for (const name of ['config.json', 'config.local.json']) {
    const cfg = readJson(path.join(repoRoot, '.impeccable', name));
    if (!Array.isArray(cfg?.projectRoots)) continue;
    for (const entry of cfg.projectRoots) {
      if (typeof entry === 'string' && entry.trim()) patterns.push(entry.trim());
    }
  }
  return patterns;
}

export function readWorkspacePatternGroups(repoRoot) {
  return [
    readImpeccableProjectRoots(repoRoot),
    [
      ...readPackageWorkspaces(repoRoot),
      ...readPnpmWorkspaces(repoRoot),
      ...readLernaWorkspaces(repoRoot),
    ].filter(Boolean),
  ];
}

export function readWorkspacePatterns(repoRoot) {
  return readWorkspacePatternGroups(repoRoot).flat();
}

export function normalizeWorkspacePattern(pattern) {
  return String(pattern || '')
    .trim()
    .replace(/^['"]|['"]$/g, '')
    .replace(/^\.\//, '')
    .replace(/\/+$/, '');
}

export function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function segmentMatches(patternSegment, relSegment) {
  if (patternSegment === '*') return true;
  if (!patternSegment.includes('*')) return patternSegment === relSegment;
  const re = new RegExp(`^${escapeRegExp(patternSegment).replace(/\\\*/g, '[^/]*')}$`);
  return re.test(relSegment);
}

function workspacePatternMatchesRel(pattern, relSegments) {
  const patternSegments = normalizeWorkspacePattern(pattern).split('/').filter(Boolean);
  if (!patternSegments.length) return false;
  if (patternSegments.includes('**')) {
    const firstGlobIndex = patternSegments.findIndex((segment) => segment.includes('*'));
    const literalPrefix = firstGlobIndex === -1
      ? patternSegments
      : patternSegments.slice(0, firstGlobIndex);
    if (relSegments.length < literalPrefix.length + 1) return false;
    for (let i = 0; i < literalPrefix.length; i++) {
      if (!segmentMatches(literalPrefix[i], relSegments[i])) return false;
    }
    return true;
  }
  if (relSegments.length < patternSegments.length) return false;
  for (let i = 0; i < patternSegments.length; i++) {
    if (!segmentMatches(patternSegments[i], relSegments[i])) return false;
  }
  return true;
}

function isExcludedByWorkspacePattern(relSegments, patterns) {
  return patterns.some((rawPattern) => {
    const pattern = normalizeWorkspacePattern(rawPattern);
    if (!pattern.startsWith('!')) return false;
    return workspacePatternMatchesRel(pattern.slice(1), relSegments);
  });
}

function projectRootFromWorkspacePattern(repoRoot, relSegments, rawPattern) {
  const pattern = normalizeWorkspacePattern(rawPattern);
  if (!pattern || pattern.startsWith('!')) return null;
  const patternSegments = pattern.split('/').filter(Boolean);
  if (!patternSegments.length) return null;
  if (patternSegments.includes('**')) {
    return projectRootFromDoubleStarPattern(repoRoot, relSegments, patternSegments);
  }
  if (relSegments.length < patternSegments.length) return null;
  for (let i = 0; i < patternSegments.length; i++) {
    if (!segmentMatches(patternSegments[i], relSegments[i])) return null;
  }
  return path.join(repoRoot, ...relSegments.slice(0, patternSegments.length));
}

function projectRootFromDoubleStarPattern(repoRoot, relSegments, patternSegments) {
  const firstGlobIndex = patternSegments.findIndex((segment) => segment.includes('*'));
  const literalPrefix = firstGlobIndex === -1
    ? patternSegments
    : patternSegments.slice(0, firstGlobIndex);
  if (relSegments.length < literalPrefix.length + 1) return null;
  for (let i = 0; i < literalPrefix.length; i++) {
    if (!segmentMatches(literalPrefix[i], relSegments[i])) return null;
  }
  const prefixDir = path.join(repoRoot, ...literalPrefix);
  const targetDir = path.join(repoRoot, ...relSegments);
  const packageRoot = nearestPackageRootBetween(repoRoot, targetDir, prefixDir);
  if (packageRoot) return packageRoot;
  return path.join(repoRoot, ...relSegments.slice(0, literalPrefix.length + 1));
}

export function nearestPackageRootBetween(repoRoot, targetDir, stopDir) {
  let dir = path.resolve(targetDir);
  const stop = path.resolve(stopDir || repoRoot);
  const root = path.resolve(repoRoot);
  while (dir && dir !== stop && isPathInsideOrEqual(dir, root)) {
    if (fs.existsSync(path.join(dir, 'package.json'))) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}

function isPathInside(candidate, root) {
  const rel = path.relative(root, candidate);
  return !!rel && !rel.startsWith('..') && !path.isAbsolute(rel);
}

export function isPathInsideOrEqual(candidate, root) {
  return path.resolve(candidate) === path.resolve(root) || isPathInside(candidate, root);
}

export function isMonorepoRoot(dir) {
  if (readWorkspacePatterns(dir).some((pattern) => !normalizeWorkspacePattern(pattern).startsWith('!'))) return true;
  if (!MONOREPO_TOOLING_FILES.some((file) => fs.existsSync(path.join(dir, file)))) return false;
  return hasFallbackWorkspaceChildren(dir);
}

function hasFallbackWorkspaceChildren(dir) {
  for (const name of MONOREPO_FALLBACK_PROJECT_DIRS) {
    const base = path.join(dir, name);
    let entries;
    try {
      entries = fs.readdirSync(base, { withFileTypes: true });
    } catch {
      continue;
    }
    if (entries.some((entry) => entry.isDirectory() && !isIgnoredWorkspaceDiscoveryDir(entry.name))) return true;
  }
  return false;
}

function isIgnoredWorkspaceDiscoveryDir(name) {
  return name.startsWith('.') || WORKSPACE_DISCOVERY_IGNORED_DIRS.has(name);
}

export function detectPackageManager(dir) {
  if (fs.existsSync(path.join(dir, 'bun.lock'))) return 'bun';
  if (fs.existsSync(path.join(dir, 'pnpm-lock.yaml'))) return 'pnpm';
  if (fs.existsSync(path.join(dir, 'yarn.lock'))) return 'yarn';
  if (fs.existsSync(path.join(dir, 'package-lock.json'))) return 'npm';
  return null;
}

export function detectRepositoryContext(root) {
  const repoRoot = findMonorepoRoot(root);
  if (!repoRoot) {
    return {
      root: path.resolve(root),
      packageManager: detectPackageManager(root),
      isMonorepo: false,
      workspaces: [],
      tooling: [],
    };
  }

  const workspaces = readWorkspacePatterns(repoRoot);
  const tooling = MONOREPO_TOOLING_FILES.filter(file => fs.existsSync(path.join(repoRoot, file)));

  return {
    root: repoRoot,
    packageManager: detectPackageManager(repoRoot),
    isMonorepo: true,
    workspaces,
    tooling,
  };
}

function findMonorepoRoot(startDir) {
  let dir = path.resolve(startDir);
  const homeDir = path.resolve(path.dirname(startDir) === startDir ? startDir : path.parse(startDir).root);
  while (true) {
    if (dir === homeDir) return null;
    if (isMonorepoRoot(dir)) return dir;
    if (fs.existsSync(path.join(dir, '.git'))) return null;
    const parent = path.dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

export {
  MONOREPO_TOOLING_FILES,
  WORKSPACE_CONFIG_FILES,
  MONOREPO_FALLBACK_PROJECT_DIRS,
  WORKSPACE_DISCOVERY_IGNORED_DIRS,
  readPackageWorkspaces,
  readPnpmWorkspaces,
  readLernaWorkspaces,
  readImpeccableProjectRoots,
  isExcludedByWorkspacePattern,
  projectRootFromWorkspacePattern,
  workspacePatternMatchesRel,
  isIgnoredWorkspaceDiscoveryDir,
};