import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function LoadingState() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-20" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-2 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function DetailLoadingState() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Skeleton className="h-10 w-3/4" />
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-24 w-full" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
