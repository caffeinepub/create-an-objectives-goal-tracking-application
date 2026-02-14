import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useQueries';
import { AppShell } from './components/app/AppShell';
import { ProfileSetupModal } from './components/profile/ProfileSetupModal';
import { GoalsDashboardPage } from './pages/GoalsDashboardPage';
import { CreateGoalPage } from './pages/CreateGoalPage';
import { GoalDetailPage } from './pages/GoalDetailPage';
import { StatsPage } from './pages/StatsPage';
import { SettingsPage } from './pages/SettingsPage';
import { createRouter, RouterProvider, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';

// Sign-in screen component
function SignInScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-foreground">Welcome to Goals</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Track your objectives, measure progress, and achieve your dreams. Sign in to get started.
        </p>
      </div>
    </div>
  );
}

// Layout component that includes the app shell
function Layout() {
  const { identity, isInitializing } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <AppShell>
        {!isAuthenticated ? <SignInScreen /> : <Outlet />}
      </AppShell>
      {showProfileSetup && <ProfileSetupModal />}
    </>
  );
}

// Define routes
const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: GoalsDashboardPage,
});

const createRoute_ = createRoute({
  getParentRoute: () => rootRoute,
  path: '/create',
  component: CreateGoalPage,
});

const detailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/goal/$goalId',
  component: GoalDetailPage,
});

const statsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/stats',
  component: StatsPage,
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: SettingsPage,
});

const routeTree = rootRoute.addChildren([indexRoute, createRoute_, detailRoute, statsRoute, settingsRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
