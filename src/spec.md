# Specification

## Summary
**Goal:** Improve mobile navigation and allow quickly toggling goal completion directly from the goals list.

**Planned changes:**
- Add a Home (house icon) item to the mobile bottom navigation that routes to `/` and follows the same active highlighting as other items.
- Ensure the bottom navigation stays a single-row layout without overflow/wrapping on common mobile widths.
- Add a visible checkbox control on each goal card in the goals dashboard list to toggle Completed/Not Completed using the existing update mutation, updating list state accordingly.
- Add a horizontal swipe/slide gesture on touch devices for each goal card to trigger (or reveal) the same completion toggle action without navigating into the goal detail view.
- Add UI error handling for failed completion updates (show an error and revert any optimistic UI changes).

**User-visible outcome:** On mobile, users can tap a Home button in the bottom nav to return to the homepage, and they can mark goals complete/incomplete from the goals list via a checkbox or swipe action without opening goal details.
