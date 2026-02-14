# Specification

## Summary
**Goal:** Add a persistent bottom navigation for authenticated users to quickly access Settings, Languages, Profile, Notifications, Statistics, and Averages.

**Planned changes:**
- Add a sticky bottom navigation bar visible on all pages when the user is authenticated, with items: Settings, Languages, Profile, Notifications, Statistics, and Averages.
- Highlight the active bottom-nav item based on the current TanStack Router route/pathname and navigate client-side without full page reloads.
- Add new frontend routes/pages for Languages, Profile, Notifications, and Averages (scaffold pages with clear English titles), keeping existing /settings and /stats unchanged.
- Adjust global/layout spacing so page content is not hidden behind the sticky bottom navigation (ensure sufficient bottom padding/margin on short and long pages).

**User-visible outcome:** Authenticated users see a bottom navigation bar on every page and can one-tap navigate to Settings, Languages, Profile, Notifications, Statistics, and Averages without content being covered by the bar.
