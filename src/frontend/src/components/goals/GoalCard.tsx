import { useState, useRef, useEffect } from 'react';
import { Goal, GoalStatus } from '../../backend';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { formatDate } from '../../lib/time';
import { getStatusColor, getStatusLabel } from '../../lib/goals/types';
import { Calendar, TrendingUp } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { useToggleGoalCompletion } from '../../hooks/useQueries';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface GoalCardProps {
  goal: Goal;
}

export function GoalCard({ goal }: GoalCardProps) {
  const navigate = useNavigate();
  const toggleCompletion = useToggleGoalCompletion();
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const isCompleted = goal.status === GoalStatus.completed;
  const minSwipeDistance = 50;

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking checkbox or during swipe
    if (swipeOffset !== 0) return;
    navigate({ to: '/goal/$goalId', params: { goalId: goal.id.toString() } });
  };

  const handleCheckboxChange = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleCompletion.mutate(
      { goalId: goal.id, isCompleted },
      {
        onError: (error) => {
          toast.error('Failed to update goal status. Please try again.');
          console.error('Toggle completion error:', error);
        },
      }
    );
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const currentTouch = e.targetTouches[0].clientX;
    const diff = currentTouch - touchStart;
    
    // Only allow horizontal swipe (left or right)
    if (Math.abs(diff) > 10) {
      setSwipeOffset(diff);
    }
    setTouchEnd(currentTouch);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setSwipeOffset(0);
      return;
    }
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe || isRightSwipe) {
      // Trigger completion toggle on swipe
      toggleCompletion.mutate(
        { goalId: goal.id, isCompleted },
        {
          onError: (error) => {
            toast.error('Failed to update goal status. Please try again.');
            console.error('Toggle completion error:', error);
          },
        }
      );
    }
    
    // Reset swipe state
    setSwipeOffset(0);
    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    // Reset swipe offset when goal status changes
    setSwipeOffset(0);
  }, [goal.status]);

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <Card
        className={cn(
          'cursor-pointer hover:shadow-md transition-all hover:border-primary/50',
          swipeOffset !== 0 && 'transition-none'
        )}
        style={{
          transform: swipeOffset !== 0 ? `translateX(${swipeOffset}px)` : undefined,
        }}
        onClick={handleCardClick}
      >
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div
                onClick={handleCheckboxChange}
                className="pt-0.5 shrink-0"
              >
                <Checkbox
                  checked={isCompleted}
                  disabled={toggleCompletion.isPending}
                  className="h-5 w-5"
                />
              </div>
              <CardTitle className="text-lg font-semibold line-clamp-2 flex-1">
                {goal.title}
              </CardTitle>
            </div>
            <Badge variant={getStatusColor(goal.status)} className="shrink-0">
              {getStatusLabel(goal.status)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {goal.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">{goal.description}</p>
          )}

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5" />
                Progress
              </span>
              <span className="font-medium">{Number(goal.progress)}%</span>
            </div>
            <Progress value={Number(goal.progress)} className="h-2" />
          </div>

          {goal.targetDate && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>Target: {formatDate(goal.targetDate)}</span>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Swipe indicator background */}
      {swipeOffset !== 0 && (
        <div
          className={cn(
            'absolute inset-y-0 flex items-center justify-center px-6 text-white font-semibold',
            swipeOffset > 0 ? 'left-0 bg-green-500' : 'right-0 bg-blue-500'
          )}
          style={{
            width: Math.abs(swipeOffset),
          }}
        >
          {Math.abs(swipeOffset) > minSwipeDistance && (
            <span className="text-sm">
              {isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
