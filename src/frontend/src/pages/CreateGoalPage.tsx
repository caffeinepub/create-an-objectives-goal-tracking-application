import { useNavigate } from '@tanstack/react-router';
import { useCreateGoal } from '../hooks/useQueries';
import { GoalForm, GoalFormData } from '../components/goals/GoalForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CreateGoalPage() {
  const navigate = useNavigate();
  const createGoal = useCreateGoal();

  const handleSubmit = async (data: GoalFormData) => {
    await createGoal.mutateAsync({
      title: data.title,
      description: data.description || null,
      targetDate: data.targetDate,
    });
    navigate({ to: '/' });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate({ to: '/' })}
        className="mb-4 gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Goals
      </Button>

      <h1 className="text-3xl font-bold mb-6">Create New Goal</h1>

      <Card>
        <CardHeader>
          <CardTitle>Goal Details</CardTitle>
        </CardHeader>
        <CardContent>
          <GoalForm
            onSubmit={handleSubmit}
            submitLabel="Create Goal"
            isSubmitting={createGoal.isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
}
