---
name: resume-revamp-jake-ats
description: "This skill assumes Claude receives: Input 1: Job Description. Input 2: Existing Resume (optional but preferred). Goal: produce an ATS-optimized resume using Jake's template structure and keywords from the job description. Revamps a candidate's resume to maximize ATS score by aligning content with a given job description. The output follows the standard structure of Jake's Resume template, with keyword optimization, clarity, conciseness, and strong recruiter readability."
---

# ATS Resume Protocol

Turn raw career data into a single-page LaTeX document that clears ATS filters with an 85%+ match rate and survives a 6-second skim test.

### Core Objectives

1. ATS Dominance: zero tables, zero graphics, standard headings, strict keyword mapping.
2. Human Impact: use the Google XYZ formula for every bullet point.
3. Signal-over-Noise: prioritize production-scale impact over task lists.
4. The "Commit Message" Summary: a 3-line summary that acts as a high-level technical profile.

### Input Format
```text
JOB_DESCRIPTION: <Paste JD here>
CURRENT_RESUME: <Paste resume/notes here>
CONTEXT: <Optional: projects, GitHub links, etc.>
```


### The Architecture (Strict LaTeX Output)

**1. Header (Digital Identity)**
* Name: Huge, scshape.
* Links: Professional email, Phone (with country code), LinkedIn, GitHub, Portfolio (clean URLs).

**2. Professional Summary (Commit Message)**
* Formula: [Role + Level] + [Core Tech Focus] + [1-2 Major Achievements with Metrics].
* Example: "Frontend Engineer specialized in React/Next.js ecosystems. Optimized core web vitals for 1M+ users, reducing TBT by 45% through advanced code-splitting and state management."

**3. Technical Skills (Keyword Matrix)**
* Categorized: Languages, Frameworks, Tools, Cloud/DevOps.
* Prioritization: Map top 10 keywords from JD to the front of each category.
* Signal Filter: List only technologies you can defend in a deep-dive interview.

**4. Experience (XYZ Engine)**
* Formula: Action Verb + Accomplished [X] + as measured by [Y] + by doing [Z].
* Formatting: Bold key metrics (e.g., 40%, $2M) and key technologies within the bullets.
* Tense: Past tense for previous roles, present for current.
* Requirement: 3 to 5 bullets for recent roles, 2 to 3 for older ones.

**5. Projects (Proof of Competence)**
* Highlight technical complexity (e.g., "Distributed Systems," "Real-time Sync," "MonoRepo").
* Include GitHub links where possible.

**6. Technical Achievements (The Standout)**
* Competitive programming (LeetCode/Codeforces stats).
* Open-source contributions (PRs merged, stars).
* System-level builds (Redis clones, parsers, etc.).

### Strict Optimization Rules

* One Page Limit: no exceptions. If content overflows, trim older roles or less relevant bullets.
* Keyword Alchemy: extract the top 25 keywords from the JD. Make sure they appear naturally at least twice (once in Skills, once in Experience/Projects).
* Formatting Guardrail: no tables (ATS cannot read them). Standard fonts (Arial, Calibri, or Computer Modern). Month/Year formatting for all dates.
* The "So What?" Test: if a bullet point does not have a number, a percentage, or a specific technical outcome, rewrite it.

### Required Output Format

Provide only the complete, copy-paste ready LaTeX script. No preamble. No "Here is your resume." Just the code.
