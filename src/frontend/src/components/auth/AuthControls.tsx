import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, Loader2 } from 'lucide-react';
import { useGetCallerUserProfile } from '../../hooks/useQueries';

export function AuthControls() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { data: userProfile } = useGetCallerUserProfile();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <div className="flex items-center gap-3">
      {isAuthenticated && userProfile && (
        <span className="text-sm text-muted-foreground hidden sm:inline">
          {userProfile.name}
        </span>
      )}
      <Button
        onClick={handleAuth}
        disabled={isLoggingIn}
        variant={isAuthenticated ? 'outline' : 'default'}
        size="sm"
        className="gap-2"
      >
        {isLoggingIn ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : isAuthenticated ? (
          <>
            <LogOut className="h-4 w-4" />
            Sign Out
          </>
        ) : (
          <>
            <LogIn className="h-4 w-4" />
            Sign In
          </>
        )}
      </Button>
    </div>
  );
}
