import { useGetCallerUserProfile } from '../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, User, Mail, Calendar } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

export function ProfilePage() {
  const { data: userProfile, isLoading, error } = useGetCallerUserProfile();
  const { identity } = useInternetIdentity();

  if (isLoading) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-64 mt-2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load profile. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const principalId = identity?.getPrincipal().toString() || '';

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Profile</h1>
        <p className="text-muted-foreground">
          View your profile information and account details.
        </p>
      </div>

      <div className="max-w-2xl space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>
              Your personal information and account details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <User className="h-4 w-4" />
                Display Name
              </div>
              <p className="text-lg font-semibold">{userProfile?.name || 'Not set'}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Mail className="h-4 w-4" />
                Principal ID
              </div>
              <p className="text-sm font-mono break-all bg-muted p-3 rounded-md">
                {principalId}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Account Status
              </div>
              <p className="text-sm">Active</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
