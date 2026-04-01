export const badgeVariants = {
  pending: 'pending',
  future: 'future',
  finished: 'finished',
  'in-progress': 'in-progress',
  failed: 'failed-cancelled',
  cancelled: 'failed-cancelled',
} as Record<
  string,
  | 'default'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'pending'
  | 'future'
  | 'finished'
  | 'in-progress'
  | 'failed-cancelled'
  | null
  | undefined
>;
