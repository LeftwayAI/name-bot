# Name Generator Project Progress

## Project Goal
Build an SEO-optimized AI name generator site that ranks for queries like:
- "business name generator"
- "startup name ideas"
- "brand name generator"
- "company name generator"

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- SQLite (for analytics + saved names)
- Claude API (for AI generation)
- Vercel (deployment)

## Domain
TBD - Daniel is picking

## Progress Log

### 2026-01-05 - Project Setup
- Created GitHub repo: https://github.com/LeftwayAI/name-bot
- Set up 20-minute cron job to push project forward
- Created this progress file

### 2026-01-05 - Next.js Project Initialized ✓
- Initialized Next.js 16.1.1 with TypeScript
- Configured Tailwind CSS v4 with PostCSS
- Created app directory structure with:
  - `app/layout.tsx` - Root layout with metadata
  - `app/page.tsx` - Landing page with basic name generator UI
  - `app/globals.css` - Global styles with Tailwind
- Set up ESLint configuration
- Created .gitignore for Next.js
- Build verified successfully

### 2026-01-05 - AI Name Generation Added ✓
- Installed @anthropic-ai/sdk package
- Created API route at `/api/generate` that uses Claude 3.5 Sonnet
- Updated landing page to be interactive with client-side state management
- Added form validation and error handling
- Displays generated names in a responsive grid layout
- Created .env.example for API key configuration
- Build verified successfully

### Next Task
Deploy to Vercel and add environment variable

## SEO Pages to Build
- [x] / - Main landing page with generator (basic UI created)
- [ ] /business-name-generator
- [ ] /startup-name-ideas
- [ ] /brand-name-generator
- [ ] /company-name-generator
- [ ] /app-name-generator
- [ ] /product-name-generator
- [ ] /blog-name-generator
- [ ] /podcast-name-generator
- [ ] /youtube-channel-name-generator

## Blockers
- None currently
