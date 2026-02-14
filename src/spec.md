# Specification

## Summary
**Goal:** Add authenticated Stats and Settings pages and a persistent top navigation for signed-in users.

**Planned changes:**
- Add new authenticated routes for `/stats` and `/settings`, ensuring all route content renders correctly within the existing AppShell layout (no duplicate outlets).
- Add a persistent in-app top navigation (tabs/header nav) for signed-in users linking to: My Goals (`/`), New Goal (`/create`), Stats (`/stats`), and Settings (`/settings`), with active route indication and hidden/disabled auth-only links when signed out.
- Implement a Stats page that loads goals using existing frontend hooks/queries and displays: total goals, counts by status (Not Started/In Progress/Completed), and average progress (0–100), with loading/error states consistent with the app and English-only text.
- Implement a Settings page that loads/displays the user profile name and allows updating/saving it using existing profile APIs, with validation and loading/saving states consistent with the app, updating the displayed name in the app where applicable, and English-only text.

**User-visible outcome:** Signed-in users can navigate via a top menu to My Goals, create a new goal, view basic goal statistics, and view/update their profile name in Settings.
