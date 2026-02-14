import { GoalStatus } from '../../backend';

export function getStatusLabel(status: GoalStatus): string {
  switch (status) {
    case GoalStatus.notStarted:
      return 'Not Started';
    case GoalStatus.inProgress:
      return 'In Progress';
    case GoalStatus.completed:
      return 'Completed';
    default:
      return 'Unknown';
  }
}

export function getStatusColor(status: GoalStatus): 'default' | 'secondary' | 'outline' {
  switch (status) {
    case GoalStatus.notStarted:
      return 'secondary';
    case GoalStatus.inProgress:
      return 'default';
    case GoalStatus.completed:
      return 'outline';
    default:
      return 'default';
  }
}

export const ALL_STATUSES = [
  GoalStatus.notStarted,
  GoalStatus.inProgress,
  GoalStatus.completed,
] as const;
