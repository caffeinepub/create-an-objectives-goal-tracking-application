import { useNavigate } from '@tanstack/react-router';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AddGoalButton() {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate({ to: '/create' })}
      size="icon"
      className="fixed bottom-20 right-4 md:bottom-6 h-14 w-14 rounded-full shadow-lg z-30"
      aria-label="Add new goal"
    >
      <Plus className="h-6 w-6" />
    </Button>
  );
}
