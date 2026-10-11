# Directory Directory Market Research

**Research date:** October 11, 2026  
**Scope:** Competitors, current product baseline, differentiation, authority building, monetization, and a proposed 90-day roadmap

## Recommended Position

Directory Directory has direct competitors. Its strongest opportunity is an **independent, evidence-backed guide to finding the right directory for a specific job**: discovering resources, researching a niche, finding a community, or choosing where to list a project.

The existing app already has a broad catalog, dedicated directory pages, metadata, articles, and saved/community interactions. Its biggest competitive improvement is better evidence behind the catalog and clearer distinctions between editorial labels, verification, and measured community activity.

Build authority category by category through accurate records, explainable recommendations, visible corrections, and original research others can cite. A large listing count and attractive cards are easy to imitate.

## Evidence And Limits

This is a targeted review of public competitor pages, official search guidance, and local source files. It is not a complete competitor audit, keyword-volume study, customer survey, or live application verification.

“Observed” means a feature or statement appeared on a referenced page or in inspected source. Vendor verification, traffic, and performance claims were not independently audited. Opportunities, commercial ideas, and numerical targets are proposals to validate. No market share, revenue, customer count, or independent traffic estimate was established. Public sources were accessed during this research; linked pages can change.

## Current Product Baseline

The current source is more developed than the README suggests. The README describes eight older categories, profiles without passwords, and session-only saves; inspected source differs. Update that documentation during the next implementation cycle.

| Area | Observed Current Source | Competitive Implication |
| --- | --- | --- |
| Catalog | Twelve categories: AI, Business, Creative, Entertainment, News, Health, Auto, Learning, Travel, Professionals, Community, and Adult. Records include identity, destination, name, topics, summary, category, presentation fields, statuses, and preview image. [Catalog](../src/shared/catalog/catalog.ts) | This is a broad resource metadirectory. The record shape does not include explicit source, verification date, operator, pricing, or submission eligibility. |
| Labels | Static statuses include New, Top, Best, Local, Popular, Trending, Regional, National, and International. [Catalog](../src/shared/catalog/catalog.ts) | These are editorial labels unless documented measurements support stronger claims. They do not establish live popularity, verification, or location detection. |
| Pages and SEO | Dedicated directory-detail routing, metadata, WebPage/WebSite data, breadcrumbs, and canonical helpers already exist. Canonicals depend on `EXPO_PUBLIC_SITE_URL`. [Detail route](../app/directory/[slug].tsx), [SEO](../src/shared/catalog/directorySeo.ts) | Extend the existing pages with evidence. Rebuilding routing is unnecessary. Production indexability remains unverified. |
| Saved/community data | Saved IDs, ratings, reviews, votes, and comments hydrate from persisted state and are written back locally. [Landing provider](../src/shared/landing/LandingProvider.tsx) | Persistence is device-local; it does not establish shared community activity or cross-device synchronization. |
| Identity and forms | Authentication uses local credential/session mechanisms; contact is a local preview. [Authentication](../src/shared/auth/service.ts), [Contact](../src/components/ContactPage/useContactForm.ts) | Real identity, server-authorized shared contributions, synchronized saves, and confirmed form delivery remain future work. |
| Content and API | Seven static articles and API/docs/pricing information routes exist. [Articles](../src/shared/blog/articles.ts), [API route](../app/api.tsx) | Improve the existing editorial library. An information page does not prove an operational HTTP API or paid data service. |

The copied `ai/` instructions describe intended connected behavior; they do not establish that these product capabilities are implemented.

## Market Structure

Three overlapping markets should remain distinct:

- **Broad discovery:** Find directories for a topic, profession, region, hobby, or research task.
- **Submission research:** Understand eligibility, costs, requirements, and submission instructions.
- **Submission services:** Pay someone to complete submissions.

Use one catalog with two task modes: **Find a Directory** and **List My Project**. A research directory may not accept submissions. A launch platform may accept submissions without serving as a durable reference directory.

Start by testing Business/developer resources and Creative resources: both fit the existing catalog and enable practical research tasks. This is an initial hypothesis, not measured demand. Expand category coverage after learning which tasks create repeat use.

## Competitor Comparison

The opportunity column is an interpretation of reviewed public pages, not proof that a competitor lacks a feature throughout its product.

| Competitor | Observed Position And Strengths | Evidence Limit And Opportunity |
| --- | --- | --- |
| [DirectoryHunt.com](https://directoryhunt.com/) | Direct metadirectory with search, Trending/Popular/New views, prices, featured listings, and displayed DR/traffic fields. | Its homepage does not establish how every metric was verified. Differentiate through visible evidence, dates, and recommendation criteria independent of sponsorship. |
| [Directory Finder](https://directoryfinder.com/) | Submission-focused catalog with categories, tags, pricing, link type, approval time, DR, and estimated traffic. Claims automatic Ahrefs DR verification. | These claims do not establish successful submissions or customer conversions. The homepage discloses a Directify connection. Offer independent criteria and field-level verification history. |
| [DirectoryHunter](https://directoryhunter.com/) | Separates directories, launch platforms, and leaderboards; emphasizes free access, curation, and no promoted listings. | Public positioning does not establish completeness or accuracy. Add audience, language, geography, eligibility, and useful comparison workflows. |
| [Directory Surf](https://directory.surf/) | Searchable categorized table with pricing, DR, founding year, traffic filters, and a Saved section; identifies Ahrefs as its DR source. | These fields do not establish current submission availability or outcomes. Extend beyond SEO attributes to usability, audience fit, and editorial evidence. |
| [DirectoryDuck Explore](https://directoryduck.com/explore) | Broad inspiration across directories, marketplaces, review sites, job boards, and other models. | Its stated purpose serves directory builders. Also serve people deciding which resource to use, with clear classification and decision information. |
| [Zillman’s Directory of Directories](https://www.zillman.us/subject-tracers/directory-resources/) | Broad reference resource with a named curator, annual downloadable compilation, and suggestions channel. | Publication dates do not prove every destination is current. Combine editorial accountability with continuously maintained, searchable records. |
| [LaunchDirectories](https://launchdirectories.com/free-startup-directories) | Startup submission list with DR/link/cost fields, free/badge filters, and a promoted submission service. | Performance claims are vendor-reported. Recommend by relevance and observed requirements without promising ranking gains. |
| [dariubs GitHub list](https://github.com/dariubs/directory-of-directories) | Free, inspectable metadirectory list with issues, pull requests, and a published license. | A link list does not establish destination accuracy. Offer structured comparisons, dates, corrections, and personal workflows. |

Search engines, spreadsheets, newsletters, communities, and human-curated catalogs such as [Curlie](https://curlie.org/en/) are substitutes.

Freshness alone is not unique: [Yo.directory](https://yo.directory/) presents New, Verified, and Dead collections. Make verification specific and inspectable. [Directory Scout](https://directoryscout.com/) promotes directory software; its previously indexed [directories URL](https://directoryscout.com/directories) returned a 404 during this research. That concerns one URL, not the status of its entire business.

## Product Improvements In Priority Order

### P0: Traceable Facts

Extend the current catalog with:

- Evidence URL, field-level verification date, method, reviewer, and confidence
- Operator and related network/ownership where established
- Audience, language, geographic scope, and resource type
- Submission eligibility and direct submission URL where applicable
- Published price source and whether payment buys review or publication
- Account, badge, and reciprocal-link requirements
- Editorial/moderation policy
- Active, uncertain, temporarily inaccessible, closed, or redirected state

Automated reachability, editorial verification, and confirmed submission experience are separate checks. An HTTP response does not prove quality or acceptance of submissions. Anti-bot challenges and temporary failures should remain uncertain until reviewed.

Use “Not Published” or “Unknown” honestly. Missing traffic is not zero traffic. Preserve old values in revision history with their observation dates.

### P0: Explainable Recommendations

Recommend by user task, audience relevance, eligibility, current usability, and editorial quality. Show “Why This Fits.”

Document the basis for Best, Top, Popular, and Trending. Rename labels that imply unavailable live measurements. Describe geography as coverage; do not imply personal location detection from static tags.

If DR is added, identify provider and date. Ahrefs defines it as relative backlink-profile strength and says it does not measure legitimacy or spam likelihood. It cannot substitute for useful audience or expected conversions. [Ahrefs DR documentation](https://help.ahrefs.com/en/articles/1409408-what-is-domain-rating-dr), [DR and spam](https://help.ahrefs.com/en/articles/2408704-does-a-low-dr-mean-that-the-website-is-spammy)

### P1: Help Users Finish Their Task

Build on existing persisted saves with comparisons, named shortlists, private notes, requirements checklists, and planned/submitted/accepted/rejected status. Add opt-in alerts for meaningful changes.

Keep anonymous browsing useful. Add real account synchronization when users need ownership across devices. If shared reviews are introduced, implement identity, moderation, revision history, and owner corrections first.

Separate “I submitted,” “I was accepted,” and independently confirmed outcomes. Rejection caused by ineligibility differs from a broken submission form. Keep sponsorship separate from editorial order, ratings, and verification.

## Becoming A Reference Authority

Publish inclusion criteria, verification definitions, funding disclosures, named editorial responsibility, and a correction process. Owners should be able to suggest factual changes without buying favorable rankings.

Create work that others can inspect and reuse:

- A maintained taxonomy and glossary
- Category guides with audience, coverage, exclusions, and tradeoffs
- Comparisons of directories, marketplaces, communities, and launch platforms
- Small submission studies with dates, sample sizes, failures, and limitations
- Quarterly directory-health reports using a defined, repeatable sample

Distinguish reachability, acceptance, referral visits, and conversions. Report denominators and time windows. Small studies cannot establish universal performance.

Recruit category practitioners, credit accepted contributions, and publish versioned methodology and research tables where redistribution is permitted. The six-month moat is a reliable history of facts, changes, outcomes, and expert decisions; that history is harder to copy than the interface.

## Search And Distribution

Extend existing detail pages with original decision information. Verify the production canonical base during implementation. Keep device-local ratings excluded from public aggregate-rating claims unless a legitimate shared system exists.

Prioritize useful category/task pages. Queries such as “professional association directories” and “directories for open-source projects” are hypotheses; no keyword volumes were measured. Use Search Console and interviews to choose content.

Manage filters deliberately: Google warns that faceted navigation can create excessive URL spaces. Index selected useful landing pages instead of every filter combination. [Google faceted-navigation guidance](https://developers.google.com/crawling/docs/faceted-navigation)

Avoid promises that mass directory links create search authority. Google lists low-quality directory links and paid links intended to manipulate rankings as link-spam examples. Disclose sponsorship and qualify paid links. Listing does not guarantee rankings or sales. [Google spam policies](https://developers.google.com/search/docs/essentials/spam-policies), [Outbound-link guidance](https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links)

Improve the existing article library through firsthand research and expert review. Seek feedback from directory builders and researchers; distribute useful findings through relevant communities with their participation rules. [Google people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)

## Monetization Tests

Keep basic discovery and factual records free.

| Proposed Experiment | Buyer And Value | Validation |
| --- | --- | --- |
| Research/shortlist service | Founders or agencies receive relevant, documented selections | Test paying pilots, research time, satisfaction, and repeat purchase. Promise deliverables rather than acceptance or rankings. |
| Team workspace | Agencies manage client shortlists and submission progress | Confirm repeated use and willingness to pay before extensive collaboration development. |
| Change alerts, exports, or API | Frequent researchers need maintained records | Validate demand, data rights, maintenance cost, and support burden. Current information routes are not a functioning API. |
| Disclosed sponsorship | Relevant operators/vendors reach a defined audience | Separate payment from editorial ranking; measure qualified clicks and renewal. |

Choose prices through interviews, cost estimates, and small paid experiments. No pricing or paid-demand validation was performed here.

## Proposed 90-Day Roadmap

| Timing | Priority | Deliverable And Decision |
| --- | --- | --- |
| Days 1–15 | P0: Baseline and audience | Refresh README; interview about 10 users; select two categories; define successful discovery and label methodology. |
| Days 16–30 | P0: Catalog pilot | Audit a manageable sample, such as 100 records; add evidence, dates, eligibility, and status to existing pages; publish correction policy. |
| Days 31–60 | P1: Task completion | Add shortlists, notes, comparison, and one submission checklist; improve several articles; observe users before expanding coverage. |
| Days 61–90 | P1: Repeat use and revenue | Implement sync/shared contributions only if demand warrants it; publish a health report; run one paid pilot; connect confirmed contact intake before relying on it for leads. |

These are workload proposals, not implementation claims or forecasts. Reduce coverage if maintenance exceeds capacity. Delay mass imports, automated submission services, gamification, and paid API work until the trusted workflow demonstrates value.

## Success Measures And Open Questions

Establish baselines first:

- Discovery: relevant shortlists/useful outbound visits, cross-checked in task studies
- Reliability: evidence/date coverage, stale fields, broken links, correction turnaround
- Usability: time to find a resource, unsuccessful searches, abandoned filters
- Retention: returning researchers and saved-workflow users at 30 days
- Economics: paid conversion, repeat purchase, labor, and contribution margin
- Authority: independent citations, recurring expert contributors, branded discovery, and useful organic-query coverage

Proposed pilot gates: evidence/date on every audited record, corrections reviewed within seven days, and at least 8 of 10 task-study users finding a suitable directory within three minutes. These are targets to recalibrate after measuring a baseline.

Determine whether researchers or submission-focused founders return more often, which categories can be maintained economically, and whether alerts or human research earn payment. Grow only as quickly as coverage remains dependable.