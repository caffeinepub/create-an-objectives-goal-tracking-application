// Convert backend Time (nanoseconds since epoch) to Date
export function timeToDate(time: bigint): Date {
  return new Date(Number(time / BigInt(1_000_000)));
}

// Convert Date to backend Time (nanoseconds since epoch)
export function dateToTime(dateString: string): bigint {
  const date = new Date(dateString);
  return BigInt(date.getTime()) * BigInt(1_000_000);
}

// Format Time for display
export function formatDate(time: bigint): string {
  const date = timeToDate(time);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// Format Time for datetime-local input
export function timeToDateString(time: bigint): string {
  const date = timeToDate(time);
  return date.toISOString().split('T')[0];
}

// Format relative time (e.g., "2 days ago")
export function formatRelativeTime(time: bigint): string {
  const date = timeToDate(time);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}
