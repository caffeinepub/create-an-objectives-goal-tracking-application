# Specification

## Summary
**Goal:** Simplify the mobile settings/navigation by removing Languages and Notifications, and make adding a new goal easier with a visible “+” entry point.

**Planned changes:**
- Remove the “Languages” and “Notifications” entries from the mobile bottom navigation and adjust the layout to avoid empty slots or misalignment.
- Remove the “/languages” and “/notifications” routes from the frontend router so they are no longer accessible.
- Add a clearly visible “+” button on the goals dashboard that navigates to the existing Create Goal flow at `/create`.

**User-visible outcome:** On mobile, the bottom navigation no longer shows Languages or Notifications and remains properly aligned, and users can tap a “+” from the goals dashboard to start creating a goal (taking them to `/create`).
