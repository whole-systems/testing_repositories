import { ctw } from '@/utils/ctw/ctw';

export const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={ctw('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  );
};
