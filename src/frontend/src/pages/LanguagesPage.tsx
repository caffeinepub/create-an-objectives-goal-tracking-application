import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Languages } from 'lucide-react';

export function LanguagesPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Languages</h1>
        <p className="text-muted-foreground">
          Choose your preferred language for the application.
        </p>
      </div>

      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="h-5 w-5" />
              Language Preferences
            </CardTitle>
            <CardDescription>
              Select the language you want to use throughout the app.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Language selection feature coming soon. Currently, the application is available in English.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
