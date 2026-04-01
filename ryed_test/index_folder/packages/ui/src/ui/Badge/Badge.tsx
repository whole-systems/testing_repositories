import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { ctw } from '@ryed-ui/utils/ctw';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        pending:
          'border-transparent bg-pending-bg text-white hover:bg-pending-bg-hover',
        update:
          'border-transparent bg-yellow-700 text-yellow-100 hover:bg-yellow-800',
        'pending driver':
          'border-transparent bg-yellow-700 text-yellow-100 hover:bg-yellow-800',
        future:
          'border-transparent bg-blue-700 text-blue-100 hover:bg-blue-800',
        finished:
          'border-transparent bg-green-700 text-green-100 hover:bg-green-800',
        'in-progress':
          'border-transparent bg-purple-700 text-purple-100 hover:bg-purple-800',
        'failed-cancelled':
          'border-transparent bg-red-700 text-red-100 hover:bg-red-800',
        unfulfilled:
          'border-transparent bg-red-700 text-red-100 hover:bg-red-800',
        'cancelled by travel agent':
          'border-transparent bg-red-700 text-red-100 hover:bg-red-800',
        cancel: 'border-transparent bg-red-700 text-red-100 hover:bg-red-800',
        archived:
          'border-transparent bg-gray-700 text-gray-100 hover:bg-gray-800',
        'rejected-pending':
          'border-transparent bg-orange-500 hover:bg-orange-700 text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={ctw(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
