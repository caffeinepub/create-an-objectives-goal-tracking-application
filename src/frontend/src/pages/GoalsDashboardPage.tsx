import { useState } from 'react';
import { useGetAllGoals } from '../hooks/useQueries';
import { GoalCard } from '../components/goals/GoalCard';
import { LoadingState } from '../components/state/LoadingState';
import { EmptyGoalsState } from '../components/state/EmptyGoalsState';
import { AddGoalButton } from '../components/goals/AddGoalButton';
import { GoalStatus } from '../backend';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

type FilterStatus = 'all' | GoalStatus;

export function GoalsDashboardPage() {
  const { data: goals, isLoading, error } = useGetAllGoals();
  const [filter, setFilter] = useState<FilterStatus>('all');

  if (isLoading) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">My Goals</h1>
        <LoadingState />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">My Goals</h1>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load goals. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const filteredGoals = goals?.filter((goal) => {
    if (filter === 'all') return true;
    return goal.status === filter;
  }) || [];

  const filterButtons: { label: string; value: FilterStatus }[] = [
    { label: 'All', value: 'all' },
    { label: 'Not Started', value: GoalStatus.notStarted },
    { label: 'In Progress', value: GoalStatus.inProgress },
    { label: 'Completed', value: GoalStatus.completed },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">My Goals</h1>
        <div className="flex flex-wrap gap-2">
          {filterButtons.map((btn) => (
            <Button
              key={btn.value}
              variant={filter === btn.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(btn.value)}
            >
              {btn.label}
            </Button>
          ))}
        </div>
      </div>

      {!goals || goals.length === 0 ? (
        <EmptyGoalsState />
      ) : filteredGoals.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No goals match the selected filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGoals.map((goal) => (
            <GoalCard key={goal.id.toString()} goal={goal} />
          ))}
        </div>
      )}

      <AddGoalButton />
    </div>
  );
}
