export function validateTitle(title: string): string | null {
  const trimmed = title.trim();
  if (!trimmed) {
    return 'Title is required';
  }
  if (trimmed.length > 200) {
    return 'Title must be 200 characters or less';
  }
  return null;
}

export function validateProgress(progress: number): string | null {
  if (isNaN(progress)) {
    return 'Progress must be a number';
  }
  if (progress < 0 || progress > 100) {
    return 'Progress must be between 0 and 100';
  }
  return null;
}
