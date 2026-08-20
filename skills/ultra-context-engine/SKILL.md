---
name: ultra-context-engine
description: "An aggressive context-efficiency and token-optimization layer for Claude Code. Primary objective: use the minimum amount of model context needed to produce a correct result. Do not optimize tokens at the expense of correctness. Priority order: correctness, relevant context, context efficiency, tool-call efficiency, response brevity. Never sacrifice required information merely to reduce tokens."
---


# Core Principle

Do not give the model more information than it needs.

Instead of:

```text
Repository
    ↓
Read everything
    ↓
Put everything into context
    ↓
Ask model to figure it out
```

Use:

```text
Request
    ↓
Understand intent
    ↓
Find relevant symbols
    ↓
Build dependency/context graph
    ↓
Retrieve only relevant information
    ↓
Compress and deduplicate
    ↓
Cache reusable results
    ↓
Store large artifacts externally
    ↓
Reason over minimal sufficient context
    ↓
Return concise result
```

---

# Integrated Systems

This skill orchestrates the concepts and capabilities represented by:

* Caveman
  https://github.com/juliusbrussee/caveman

* RTK: Rust Token Killer
  https://github.com/rtk-ai/rtk

* Code Review Graph
  https://github.com/tirth8205/code-review-graph

* Context Mode
  https://github.com/mksglu/context-mode

* Claude Token Optimizer
  https://github.com/nadimtuhin/claude-token-optimizer

* Token Optimizer
  https://github.com/alexgreensh/token-optimizer

* Token Optimizer MCP
  https://github.com/ooples/token-optimizer-mcp

* Claude Context
  https://github.com/zilliztech/claude-context

* Claude Token Efficient
  https://github.com/drona23/claude-token-efficient

* Token Savior
  https://github.com/mibayy/token-savior

These are conceptual capabilities of the system.

Do not assume every repository is installed.

Do not execute, import, or invoke a tool merely because it exists in this list.

Use an available implementation when present. Otherwise reproduce the underlying behavior with native Claude Code capabilities.

---

# Operating Modes

Determine the task before retrieving context.

## Mode 1: Simple Question

Examples:

* "What does this function do?"
* "Explain this error."
* "How does X work?"

Use the smallest possible context.

Do not scan the repository.

Do not perform semantic indexing.

Do not retrieve unrelated files.

---

## Mode 2: Local Code Change

Examples:

* "Fix this function."
* "Add validation here."
* "Rename this variable."

Start with the target file/symbol.

Retrieve only:

* target symbol
* directly related types
* directly called functions
* relevant tests
* required configuration

Do not load the entire repository.

---

## Mode 3: Debugging

First identify:

1. Error
2. Entry point
3. Relevant execution path
4. Dependencies
5. Configuration
6. Tests/logs

Use the smallest dependency path that explains the failure.

Do not indiscriminately retrieve every file mentioning the same keyword.

---

## Mode 4: Code Review

Use graph-based and symbol-based retrieval.

Prioritize:

1. Changed files
2. Changed symbols
3. Callers
4. Callees
5. Related types
6. Tests
7. Configuration
8. Security-sensitive dependencies

Avoid reading unrelated files.

---

## Mode 5: Architecture / Repository Understanding

Use progressive discovery.

Start with:

```text
Repository structure
        ↓
Package boundaries
        ↓
Entry points
        ↓
Important symbols
        ↓
Dependencies
        ↓
Relevant implementation
```

Never start by loading the entire repository.

---

## Mode 6: Large Output / Logs

Never inject large raw outputs directly into context when an external process can handle them.

Prefer:

```text
Raw output
    ↓
Filter
    ↓
Deduplicate
    ↓
Summarize
    ↓
Store externally if necessary
    ↓
Expose only relevant sections
```

---

# Context Retrieval Strategy

Use a funnel.

## Level 0: Context from the user

Always use information already given by the user before doing additional retrieval.

Do not retrieve information the user already supplied.

---

## Level 1: Symbol lookup

Prefer symbols over files.

Examples:

```text
function authenticate
class UserService
interface User
middleware auth
route POST /login
```

Use symbol-level navigation whenever possible.

This uses the Token Savior principle.

---

## Level 2: Dependency expansion

Once you identify the target symbol, expand only as necessary.

Typical expansion:

```text
Target
 ├── direct callers
 ├── direct callees
 ├── referenced types
 ├── relevant tests
 └── relevant configuration
```

Use graph-based traversal where available.

This uses the Code Review Graph principle.

---

## Level 3: Semantic retrieval

When exact symbol navigation is insufficient, use semantic/hybrid retrieval.

Retrieve the smallest set of documents/code fragments that answer the question.

This uses the Claude Context principle.

---

## Level 4: Broader retrieval

Only expand beyond the immediate dependency neighborhood when evidence indicates that the existing context is insufficient.

Never broaden context simply because more context exists.

---

# Context Budgeting

Before retrieving context, estimate what is actually required.

Use this model:

```text
Required Context =
    Target
  + Direct Dependencies
  + Relevant Types
  + Relevant Tests
  + Relevant Configuration
  + Evidence Needed For Decision
```

Presume everything else irrelevant until proven otherwise.

If two pieces of context give the same information, keep the smaller one.

If a summary is sufficient, do not include the raw source.

If a symbol is sufficient, do not include the entire file.

---

# Code Retrieval Rules

Never:

* read an entire monorepo unnecessarily
* read every file in a directory
* dump giant files into context
* repeatedly retrieve the same file
* retrieve generated files unless necessary
* retrieve lockfiles unless dependency resolution requires them
* retrieve build artifacts unless debugging them
* retrieve unrelated tests
* retrieve unrelated documentation

Prefer:

* symbols
* definitions
* references
* callers
* callees
* dependency edges
* relevant tests
* relevant configuration
* targeted line ranges

---

# Monorepo Rules

For monorepos:

1. Identify the affected package.
2. Identify its package boundaries.
3. Identify workspace dependencies.
4. Identify relevant entry points.
5. Build the smallest dependency subgraph.
6. Ignore unrelated packages.

Never treat a monorepo as one giant application.

---

# Context Compression

Before context enters the model, remove information that does not affect reasoning.

Potential compression operations:

* remove duplicate content
* remove repeated logs
* collapse repeated stack frames
* remove irrelevant timestamps
* remove ANSI escape sequences
* remove terminal progress output
* remove generated boilerplate
* remove duplicated imports
* remove irrelevant comments
* collapse repetitive JSON
* collapse repeated objects
* summarize repetitive errors
* preserve unique errors
* preserve exact values when they affect correctness
* preserve line numbers when useful
* preserve code semantics

Never compress away information that could change the answer.

---

# Terminal Output

Apply the RTK principle to terminal output.

Treat terminal output as noisy input.

Remove or collapse:

```text
progress bars
download percentages
repeated status lines
ANSI formatting
duplicate warnings
duplicate stack frames
irrelevant timestamps
repeated compiler output
```

Preserve:

```text
errors
warnings
exit codes
commands
file paths
line numbers
unique stack frames
relevant stdout
relevant stderr
```

When possible, ask tools for filtered output directly rather than receiving massive output and filtering it afterward.

---

# Large Outputs

Large outputs must not automatically become model context.

Examples:

* build logs
* test logs
* GitHub API responses
* git history
* database dumps
* generated JSON
* large command output
* large search results

Use the Context Mode principle:

```text
Large Artifact
      ↓
External storage / SQLite
      ↓
Query only required information
      ↓
Return compact result
```

Give the model:

```text
Summary
Relevant records
Relevant lines
Relevant identifiers
```

rather than the entire artifact.

If external storage is unavailable, simulate the same behavior by retaining only the relevant subset in working context.

---

# MCP Optimization

MCP calls can become a major source of context waste.

Before invoking an MCP tool:

1. Determine exactly what information you need.
2. Request the narrowest possible result.
3. Avoid requesting fields you will not use.
4. Avoid repeating equivalent requests.
5. Cache reusable results when possible.
6. Compress results before exposing them to the model.

Use the Token Optimizer MCP principle:

```text
MCP Request
    ↓
Normalize
    ↓
Cache lookup
    ↓
Existing result?
   / \
 yes  no
  |    |
reuse execute
       ↓
    compress
       ↓
      cache
```

Never repeatedly fetch identical information within the same task.

---

# Caching

Cache information when it is:

* deterministic
* expensive to retrieve
* likely used again
* unchanged during the current task

Good candidates:

* repository structure
* symbol index
* dependency graph
* package metadata
* repeated MCP responses
* repeated command output
* documentation retrieval

Do not cache information when it is:

* rapidly changing
* task-specific
* potentially stale
* security-sensitive without appropriate controls

Always prefer correctness over cache hits.

---

# Prompt Optimization

Apply the Claude Token Optimizer principle to internal task instructions.

Convert verbose instructions into compact constraints.

Instead of:

```text
Please carefully inspect all of the relevant files and try
to determine whether there might potentially be a problem...
```

Prefer:

```text
Inspect relevant files. Identify root cause. Patch it. Test it.
```

Preserve:

* requirements
* constraints
* acceptance criteria
* edge cases
* safety requirements
* user intent

Remove:

* filler
* repetition
* unnecessary politeness
* duplicated instructions
* redundant explanations

Never compress away an actual requirement.

---

# Persistent Repository Knowledge

Maintain useful repository knowledge when supported.

Useful persistent information includes:

```text
architecture
package boundaries
entry points
important symbols
common commands
test commands
build commands
dependency relationships
conventions
known generated directories
```

Do not persist temporary conclusions as facts.

Clearly distinguish:

```text
Known
Inferred
Uncertain
```

---

# Response Optimization

The final response must contain only information useful to the user.

Prefer:

```text
What changed
Why
Files changed
Tests
Remaining issue
```

Avoid:

* unnecessary introductions
* repeating the request
* narrating every internal step
* explaining obvious code
* repeating code already shown
* verbose conclusions
* generic "let me know if..." endings

For simple tasks, answer briefly.

For complex tasks, give enough detail to make the result usable.

Do not impose arbitrary word limits when the task requires explanation.

---

# Caveman Mode

Use the Caveman principle as a final compression strategy, not as the primary reasoning strategy.

Reason normally.

Then remove unnecessary language.

Example:

Before:

```text
The reason the authentication middleware is failing is that
the JWT is being decoded before the signature has been verified,
which causes the middleware to reject otherwise valid requests.
```

After:

```text
JWT decoded before signature verification.
Fix middleware order.
```

Do not remove technical information merely to make text shorter.

Never sacrifice:

* correctness
* caveats
* security information
* required instructions
* exact commands
* error details

---

# Final Response Terseness

Use the Claude Token Efficient principle.

Use concise structure:

```text
Changed:
- ...

Why:
- ...

Tested:
- ...
```

For code changes, prefer showing only the important diff or explanation.

Do not reproduce entire files unless explicitly requested.

---

# Tool Selection

Do not blindly execute every optimization stage.

Use the cheapest sufficient strategy.

Example:

```text
Simple question
→ direct answer

Local code change
→ symbol lookup
→ targeted context

Complex code change
→ symbol lookup
→ graph expansion
→ semantic retrieval

Large repository review
→ graph
→ semantic retrieval
→ compression

Huge logs
→ RTK-style filtering
→ external storage
→ targeted retrieval

Repeated MCP data
→ cache
→ compressed result
```

Make the system adaptive.

---

# Anti-Patterns

Never do this:

```text
User asks about one function
        ↓
Read entire repository
        ↓
Read entire package
        ↓
Read every dependency
        ↓
Dump everything into context
```

Never do this:

```text
5 MB terminal output
        ↓
5 MB model context
```

Never do this:

```text
MCP request
MCP request
MCP request
MCP request
```

when one cached result would suffice.

Never do this:

```text
Huge file
↓
Entire file
↓
Model
```

when symbol-level retrieval is available.

Never do this:

```text
Verbose answer
↓
Delete random words
↓
Broken explanation
```

Compression must preserve meaning.

---

# Accuracy Guardrails

Token reduction is subordinate to correctness.

If additional context is required:

GET IT.

If a dependency is uncertain:

INSPECT IT.

If a log line might contain important evidence:

PRESERVE IT.

If compression changes meaning:

DO NOT COMPRESS IT.

If retrieval confidence is low:

EXPAND THE CONTEXT.

If two sources disagree:

KEEP BOTH UNTIL RESOLVED.

Never report an inferred fact as verified.

---

# Progressive Escalation

Use this escalation ladder:

```text
1. Existing context
       ↓
2. Targeted symbol
       ↓
3. Direct dependencies
       ↓
4. Relevant tests/config
       ↓
5. Dependency graph
       ↓
6. Semantic retrieval
       ↓
7. Broader repository search
       ↓
8. Full-file inspection
       ↓
9. Full-repository inspection
```

Start at level 1.

Escalate only when necessary.

Never start at level 9.

---

# Decision Function

Before adding context, ask:

```text
Will this information materially affect the answer?
```

If:

```text
NO → exclude it
YES → include it
UNKNOWN → retrieve minimally and evaluate
```

Before running a tool, ask:

```text
Can the task be completed without this tool?
```

If yes, do not run it.

Before returning output, ask:

```text
Can this be shorter without losing information?
```

If yes, shorten it.

---

# Ideal End-to-End Pipeline

The complete system behaves like this:

```text
                    USER REQUEST
                         │
                         ▼
                 Intent Detection
                         │
                         ▼
               Prompt Optimization
                         │
                         ▼
                Existing Context
                         │
                         ▼
                  Symbol Search
                         │
                         ▼
               Dependency Graph
                         │
                         ▼
              Semantic Retrieval
                         │
                         ▼
             Context Compression
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
          MCP Cache             Large Output
              │                     │
              │                 SQLite /
              │              External Context
              │                     │
              └──────────┬──────────┘
                         ▼
                 Minimal Context
                         │
                         ▼
                      Claude
                         │
                         ▼
                Accuracy Check
                         │
                         ▼
               Response Compression
                         │
                         ▼
                  Caveman/Terse
                         │
                         ▼
                 Final Response
```

---

# Success Criteria

The skill is successful when:

1. The model sees less irrelevant context.
2. Large outputs do not consume unnecessary context.
3. Avoid repeated MCP calls.
4. Repository navigation happens at symbol level whenever possible.
5. Use semantic retrieval only when needed.
6. Preserve relevant dependency context.
7. Remove terminal noise.
8. Responses are concise without losing information.
9. Accuracy remains unchanged or improves.
10. The system automatically expands context when the reduced context is insufficient.

The goal is not:

> "Use fewer tokens at any cost."

The goal is:

> "Spend tokens only where they improve the answer."
