import { useState } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useGetGoal, useUpdateGoal, useDeleteGoal } from '../hooks/useQueries';
import { GoalForm, GoalFormData } from '../components/goals/GoalForm';
import { DetailLoadingState } from '../components/state/LoadingState';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Trash2, AlertCircle } from 'lucide-react';

export function GoalDetailPage() {
  const navigate = useNavigate();
  const { goalId } = useParams({ strict: false }) as { goalId: string };
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { data: goal, isLoading, error } = useGetGoal(BigInt(goalId));
  const updateGoal = useUpdateGoal();
  const deleteGoal = useDeleteGoal();

  const handleUpdate = async (data: GoalFormData) => {
    await updateGoal.mutateAsync({
      goalId: BigInt(goalId),
      title: data.title,
      description: data.description || null,
      status: data.status,
      targetDate: data.targetDate,
      progress: data.progress,
    });
  };

  const handleDelete = async () => {
    await deleteGoal.mutateAsync(BigInt(goalId));
    navigate({ to: '/' });
  };

  if (isLoading) {
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
        <DetailLoadingState />
      </div>
    );
  }

  if (error || !goal) {
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
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load goal. It may have been deleted or you don't have permission to view it.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate({ to: '/' })}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Goals
        </Button>

        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm" className="gap-2">
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Goal?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your goal and all its data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <h1 className="text-3xl font-bold mb-6">Edit Goal</h1>

      <Card>
        <CardHeader>
          <CardTitle>Goal Details</CardTitle>
        </CardHeader>
        <CardContent>
          <GoalForm
            goal={goal}
            onSubmit={handleUpdate}
            submitLabel="Save Changes"
            isSubmitting={updateGoal.isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
}
