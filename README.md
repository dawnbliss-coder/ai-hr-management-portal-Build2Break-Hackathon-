<div align="center">

# AI-Powered HR Management Portal

**A full-stack HR automation platform built with Next.js 15 and Google Gemini.**

Policy document Q&A over your own PDFs · Resume-to-JD skill scoring · AI-generated onboarding roadmaps

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![Gemini](https://img.shields.io/badge/Google-Gemini-8E75B2?logo=googlegemini&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS%20v4-38BDF8?logo=tailwindcss&logoColor=white)

Built for the **Build2Break Hackathon**

</div>

---

## Screenshots

### Policy Q&A Bot

<table>
<tr><td colspan="2"><b>Correct responses from the policy PDF</b> when the question's context is present in the document</td></tr>
<tr>
<td><img src="docs/screenshots/policyqap1.png" alt="Policy Q&A – positive case 1" width="400"/></td>
<td><img src="docs/screenshots/policyqap2.png" alt="Policy Q&A – positive case 2" width="400"/></td>
</tr>
<tr><td colspan="2"><b>Correctly responds "not mentioned in the policy document"</b> when the question's context is absent from the document</td></tr>
<tr>
<td><img src="docs/screenshots/policyqan1.png" alt="Policy Q&A – negative case 1" width="400"/></td>
<td><img src="docs/screenshots/policyqan2.png" alt="Policy Q&A – negative case 2" width="400"/></td>
</tr>
<tr><td colspan="2"><b>Handles a hallucination-inducing question correctly</b></td></tr>
<tr>
<td><img src="docs/screenshots/policyqah1.png" alt="Policy Q&A – hallucination test" width="400"/></td>
<td></td>
</tr>
</table>

### Resume Scoring Engine

<table>
<tr><td><b>Resume is highly relevant to the applied job role</b></td></tr>
<tr><td><img src="docs/screenshots/resumescoringp1.png" alt="Resume scoring – strong match" width="500"/></td></tr>
<tr><td><b>Resume is not relevant to the applied job role</b></td></tr>
<tr><td><img src="docs/screenshots/resumescoringn1.png" alt="Resume scoring – weak match" width="500"/></td></tr>
</table>

### Onboarding Roadmap Generator

<table>
<tr><td><b>Resume is highly relevant to the applied job role</b></td></tr>
<tr><td><img src="docs/screenshots/onboardingp1.png" alt="Onboarding roadmap – strong match" width="500"/></td></tr>
<tr><td><b>Resume is not relevant to the applied job role</b></td></tr>
<tr><td><img src="docs/screenshots/onboardingn1.png" alt="Onboarding roadmap – weak match" width="500"/></td></tr>
</table>

---

## Core Modules

| Module | What it does |
|---|---|
| **Knowledge Base (RAG)** | Upload internal HR policy PDFs. The app extracts and summarizes the text, generates vector embeddings, and stores them in MongoDB Atlas for semantic search. |
| **Skill Scoring Engine** | Analyzes a candidate resume against a job description to produce a match percentage, matched/missing skills, and key highlights. |
| **Talent Pool Management** | A persistent, searchable database of every candidate that's been scored, with delete support. |
| **Onboarding Module** | Turns a candidate's identified skill gaps into a structured 30-day training roadmap. |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| AI Engine | Google Gemini — `gemini-2.5-flash` for text generation, `gemini-embedding-001` for vector embeddings |
| Database | MongoDB Atlas (with Atlas Vector Search) |
| PDF Processing | pdf2json |
| Styling | Tailwind CSS v4 |

---

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

| Variable | Description |
|---|---|
| `MONGODB_URI` | Your MongoDB Atlas connection string (no port number in `mongodb+srv://` URIs) |
| `GEMINI_API_KEY` | Your Google AI Studio API key |

---

## Project Structure

```
app/
  api/
    onboarding/       # 2-week & 30-day onboarding plan generation
    policies/         # PDF upload + RAG chat
    skills/           # Resume scoring, talent pool list/delete
  page.tsx            # Single-page dashboard (Policies / Scoring / Onboarding tabs)
lib/
  gemini.ts           # Gemini text generation + embeddings
  mongodb.ts          # Cached MongoDB client
```
