import { useState, useEffect } from 'react';
import { useGetCallerUserProfile, useSaveCallerUserProfile } from '../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, CheckCircle2, Loader2, User } from 'lucide-react';

export function SettingsPage() {
  const { data: userProfile, isLoading, error } = useGetCallerUserProfile();
  const saveProfile = useSaveCallerUserProfile();
  const [name, setName] = useState('');
  const [validationError, setValidationError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name);
    }
  }, [userProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');
    setShowSuccess(false);

    const trimmedName = name.trim();

    if (!trimmedName) {
      setValidationError('Name cannot be empty');
      return;
    }

    if (trimmedName.length > 50) {
      setValidationError('Name must be 50 characters or less');
      return;
    }

    try {
      await saveProfile.mutateAsync({ name: trimmedName });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err: any) {
      setValidationError(err.message || 'Failed to save profile');
    }
  };

  const hasChanges = userProfile && name.trim() !== userProfile.name;
  const isSaving = saveProfile.isPending;

  if (isLoading) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-64 mt-2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-24" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load settings. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>
              Update your display name and profile information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Display Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  maxLength={50}
                  disabled={isSaving}
                />
                <p className="text-xs text-muted-foreground">
                  This is how your name will appear throughout the app.
                </p>
              </div>

              {validationError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{validationError}</AlertDescription>
                </Alert>
              )}

              {showSuccess && (
                <Alert className="border-green-600 dark:border-green-500">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-500" />
                  <AlertDescription className="text-green-600 dark:text-green-500">
                    Profile updated successfully!
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                disabled={!hasChanges || isSaving}
                className="gap-2"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
