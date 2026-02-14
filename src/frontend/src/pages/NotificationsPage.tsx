import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell } from 'lucide-react';

export function NotificationsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Notifications</h1>
        <p className="text-muted-foreground">
          Manage your notification preferences and settings.
        </p>
      </div>

      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Settings
            </CardTitle>
            <CardDescription>
              Control how and when you receive notifications.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Notification settings feature coming soon. You'll be able to customize your notification preferences here.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
