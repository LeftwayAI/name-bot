# rose.glass Progress

## 🎯 THE GOAL: $500 revenue by January 15, 2025

That's ~10 days. Every task should move toward PAYING CUSTOMERS.

**The customer journey:**
```
Google search → Land on SEO page → Generate names FREE → Check domain availability → "Claim this name" bundle ($49)
```

## Meta-Level Thinking (for every agent, every run)

Before picking a task, ask:
1. **Is this the highest-impact thing?** SEO pages bring traffic, but domain availability is the upsell hook.
2. **Am I building toward the journey above?** If not, why?
3. **What would make this FAIL?** (Broken generator? No payment flow? Bad content?)
4. **Should I pivot?** If something feels wrong, document it and suggest alternatives.

---

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
✅ rose.glass - Purchased and connected to Vercel

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

### 2026-01-05 - Deployed to Vercel ✓
- Domain: rose.glass connected
- Deployment: READY at roseglass-git-main-leftway.vercel.app
- Stripe key: Added (sk_live)
- **BLOCKER**: ANTHROPIC_API_KEY not set in Vercel env - generator fails

### 2026-01-05 - First SEO Page Built ✓
- Created `/business-name-generator` page with:
  - Full AI name generator functionality (same as home page)
  - Rich SEO content (1,500+ words)
  - Sections: How to Choose Names, Why Use AI, Popular Styles, Testing Tips
  - SEO metadata with proper title, description, keywords
  - OpenGraph and Twitter card tags
  - Responsive 3-column grid layout for generated names
- Build verified successfully
- Page accessible at: rose.glass/business-name-generator

### 2026-01-05 - Second SEO Page Built ✓
- Created `/startup-name-ideas` page with:
  - Full AI name generator functionality
  - Rich SEO content (1,800+ words)
  - Sections: What Makes Great Names, Why Use AI, Naming Strategies, 2026 Trends, Validation Steps
  - Startup-focused content and examples
  - SEO metadata optimized for "startup name ideas" keywords
  - OpenGraph and Twitter card tags
  - Responsive 3-column grid layout
- Build verified successfully
- Page accessible at: rose.glass/startup-name-ideas
- Committed and pushed to GitHub

### Next Task
1. Build third SEO page: /brand-name-generator
2. Eventually: Add ANTHROPIC_API_KEY to Vercel (currently blocked on Daniel)

## SEO Pages to Build

Each page should go through multiple passes:
1. **Research** - What do people actually search? What questions do they have?
2. **Draft** - Write initial content (1500+ words)
3. **Enrich** - Add examples, FAQs, comparisons to competitors
4. **Polish** - Improve readability, add internal links, optimize metadata

### Completed
- [x] / - Main landing page with generator
- [x] /business-name-generator - v1 complete (could use enrichment pass)
- [x] /startup-name-ideas - v1 complete (could use enrichment pass)

### Next Up
- [ ] /brand-name-generator
  - [ ] Research pass
  - [ ] Draft pass
  - [ ] Enrich pass
  - [ ] Polish pass
- [ ] /company-name-generator
- [ ] /app-name-generator
- [ ] /product-name-generator
- [ ] /blog-name-generator
- [ ] /podcast-name-generator
- [ ] /youtube-channel-name-generator

## Blockers
- None currently
