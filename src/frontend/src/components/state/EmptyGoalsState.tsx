import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export function EmptyGoalsState() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <img
        src="/assets/generated/goals-empty-state.dim_1200x800.png"
        alt="No goals yet"
        className="max-w-md w-full mb-8 rounded-lg"
      />
      <h2 className="text-2xl font-bold mb-2 text-foreground">No goals yet</h2>
      <p className="text-muted-foreground mb-6 text-center max-w-md">
        Start your journey by creating your first goal. Track your progress and achieve your dreams!
      </p>
      <Button onClick={() => navigate({ to: '/create' })} className="gap-2">
        <Plus className="h-4 w-4" />
        Create Your First Goal
      </Button>
    </div>
  );
}
