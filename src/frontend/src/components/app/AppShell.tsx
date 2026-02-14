import { ReactNode } from 'react';
import { AuthControls } from '../auth/AuthControls';
import { AppNav } from './AppNav';
import { AppBottomNav } from './AppBottomNav';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useNavigate } from '@tanstack/react-router';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { identity } = useInternetIdentity();
  const navigate = useNavigate();
  const isAuthenticated = !!identity;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/assets/generated/goals-logo.dim_512x512.png"
                alt="Goals Logo"
                className="h-10 w-10 rounded-lg"
              />
              <button
                onClick={() => navigate({ to: '/' })}
                className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
              >
                Goals
              </button>
            </div>

            <div className="flex items-center gap-4">
              {isAuthenticated && <AppNav />}
              <AuthControls />
            </div>
          </div>
        </div>
      </header>

      <main className={`container mx-auto px-4 py-8 ${isAuthenticated ? 'pb-24 md:pb-8' : ''}`}>
        {children}
      </main>

      {isAuthenticated && <AppBottomNav />}

      <footer className="border-t border-border mt-16 py-8 bg-card/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} · Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
