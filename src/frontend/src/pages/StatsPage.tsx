import { useGetAllGoals } from '../hooks/useQueries';
import { LoadingState } from '../components/state/LoadingState';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Target, TrendingUp, CheckCircle2, Clock } from 'lucide-react';
import { GoalStatus } from '../backend';
import { getStatusLabel } from '../lib/goals/types';

export function StatsPage() {
  const { data: goals, isLoading, error } = useGetAllGoals();

  if (isLoading) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Statistics</h1>
        <LoadingState />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Statistics</h1>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load statistics. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const totalGoals = goals?.length || 0;
  const notStartedCount = goals?.filter((g) => g.status === GoalStatus.notStarted).length || 0;
  const inProgressCount = goals?.filter((g) => g.status === GoalStatus.inProgress).length || 0;
  const completedCount = goals?.filter((g) => g.status === GoalStatus.completed).length || 0;

  const averageProgress = totalGoals > 0
    ? Math.round(goals!.reduce((sum, goal) => sum + Number(goal.progress), 0) / totalGoals)
    : 0;

  const stats = [
    {
      title: 'Total Goals',
      value: totalGoals,
      icon: Target,
      description: 'All your goals',
      color: 'text-primary',
    },
    {
      title: getStatusLabel(GoalStatus.notStarted),
      value: notStartedCount,
      icon: Clock,
      description: 'Goals not yet started',
      color: 'text-muted-foreground',
    },
    {
      title: getStatusLabel(GoalStatus.inProgress),
      value: inProgressCount,
      icon: TrendingUp,
      description: 'Goals in progress',
      color: 'text-amber-600 dark:text-amber-500',
    },
    {
      title: getStatusLabel(GoalStatus.completed),
      value: completedCount,
      icon: CheckCircle2,
      description: 'Goals completed',
      color: 'text-green-600 dark:text-green-500',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Statistics</h1>
        <p className="text-muted-foreground">
          Track your progress and see how you're doing with your goals.
        </p>
      </div>

      {totalGoals === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Target className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg text-muted-foreground mb-2">No goals yet</p>
            <p className="text-sm text-muted-foreground">
              Create your first goal to start tracking your progress.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Average Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Overall completion across all goals
                  </span>
                  <span className="text-2xl font-bold">{averageProgress}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-500 ease-out"
                    style={{ width: `${averageProgress}%` }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-muted-foreground">
                      {notStartedCount}
                    </div>
                    <div className="text-xs text-muted-foreground">Not Started</div>
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
        </>
      )}
    </div>
  );
}
