import { useState, useEffect } from 'react';
import { Goal, GoalStatus } from '../../backend';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { validateTitle, validateProgress } from '../../lib/goals/validation';
import { dateToTime, timeToDateString } from '../../lib/time';
import { Loader2 } from 'lucide-react';

interface GoalFormProps {
  goal?: Goal;
  onSubmit: (data: GoalFormData) => Promise<void>;
  submitLabel: string;
  isSubmitting?: boolean;
}

export interface GoalFormData {
  title: string;
  description: string;
  status: GoalStatus;
  targetDate: bigint | null;
  progress: bigint;
}

export function GoalForm({ goal, onSubmit, submitLabel, isSubmitting }: GoalFormProps) {
  const [title, setTitle] = useState(goal?.title || '');
  const [description, setDescription] = useState(goal?.description || '');
  const [status, setStatus] = useState<GoalStatus>(goal?.status || GoalStatus.notStarted);
  const [targetDate, setTargetDate] = useState(goal?.targetDate ? timeToDateString(goal.targetDate) : '');
  const [progress, setProgress] = useState(goal?.progress ? Number(goal.progress).toString() : '0');

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (goal) {
      setTitle(goal.title);
      setDescription(goal.description || '');
      setStatus(goal.status);
      setTargetDate(goal.targetDate ? timeToDateString(goal.targetDate) : '');
      setProgress(Number(goal.progress).toString());
    }
  }, [goal]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    const titleError = validateTitle(title);
    if (titleError) newErrors.title = titleError;

    const progressError = validateProgress(Number(progress));
    if (progressError) newErrors.progress = progressError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const formData: GoalFormData = {
      title: title.trim(),
      description: description.trim(),
      status,
      targetDate: targetDate ? dateToTime(targetDate) : null,
      progress: BigInt(progress),
    };

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">
          Title <span className="text-destructive">*</span>
        </Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter goal title"
          disabled={isSubmitting}
        />
        {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add details about your goal (optional)"
          rows={4}
          disabled={isSubmitting}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={status} onValueChange={(value) => setStatus(value as GoalStatus)} disabled={isSubmitting}>
            <SelectTrigger id="status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={GoalStatus.notStarted}>Not Started</SelectItem>
              <SelectItem value={GoalStatus.inProgress}>In Progress</SelectItem>
              <SelectItem value={GoalStatus.completed}>Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="targetDate">Target Date</Label>
          <Input
            id="targetDate"
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="progress">Progress (%)</Label>
        <Input
          id="progress"
          type="number"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
          disabled={isSubmitting}
        />
        {errors.progress && <p className="text-sm text-destructive">{errors.progress}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          submitLabel
        )}
      </Button>
    </form>
  );
}
