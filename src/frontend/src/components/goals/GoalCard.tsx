import { Goal } from '../../backend';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { formatDate } from '../../lib/time';
import { getStatusColor, getStatusLabel } from '../../lib/goals/types';
import { Calendar, TrendingUp } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

interface GoalCardProps {
  goal: Goal;
}

export function GoalCard({ goal }: GoalCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({ to: '/goal/$goalId', params: { goalId: goal.id.toString() } });
  };

  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-all hover:border-primary/50"
      onClick={handleClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-lg font-semibold line-clamp-2">{goal.title}</CardTitle>
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
  );
}
