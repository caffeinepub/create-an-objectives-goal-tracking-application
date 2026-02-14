import { useGetAllGoals } from '../hooks/useQueries';
import { LoadingState } from '../components/state/LoadingState';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, TrendingUp, Target } from 'lucide-react';
import { GoalStatus } from '../backend';

export function AveragesPage() {
  const { data: goals, isLoading, error } = useGetAllGoals();

  if (isLoading) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Averages</h1>
        <LoadingState />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Averages</h1>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load averages. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const totalGoals = goals?.length || 0;
  const completedCount = goals?.filter((g) => g.status === GoalStatus.completed).length || 0;
  const inProgressCount = goals?.filter((g) => g.status === GoalStatus.inProgress).length || 0;

  const averageProgress = totalGoals > 0
    ? Math.round(goals!.reduce((sum, goal) => sum + Number(goal.progress), 0) / totalGoals)
    : 0;

  const completionRate = totalGoals > 0
    ? Math.round((completedCount / totalGoals) * 100)
    : 0;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Averages</h1>
        <p className="text-muted-foreground">
          View your average progress and completion rates across all goals.
        </p>
      </div>

      {totalGoals === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Target className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg text-muted-foreground mb-2">No goals yet</p>
            <p className="text-sm text-muted-foreground">
              Create your first goal to start tracking your averages.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="max-w-2xl space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Average Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Overall completion across all goals
                  </span>
                  <span className="text-3xl font-bold">{averageProgress}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-500 ease-out"
                    style={{ width: `${averageProgress}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Completion Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Percentage of goals completed
                  </span>
                  <span className="text-3xl font-bold">{completionRate}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-green-600 dark:bg-green-500 h-full transition-all duration-500 ease-out"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{totalGoals}</div>
                    <div className="text-xs text-muted-foreground">Total Goals</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-600 dark:text-amber-500">
                      {inProgressCount}
                    </div>
                    <div className="text-xs text-muted-foreground">In Progress</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-500">
                      {completedCount}
                    </div>
                    <div className="text-xs text-muted-foreground">Completed</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
