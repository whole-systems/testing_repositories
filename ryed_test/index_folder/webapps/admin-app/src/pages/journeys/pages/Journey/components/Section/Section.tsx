import { FC } from 'react';

export const Section: FC<{
  title: string;
  children: React.ReactNode;
  className?: string;
}> = ({ title, children, className }) => (
  <div className={`space-y-2 ${className}`}>
    <h3 className="text-lg font-semibold">{title}</h3>
    {children}
  </div>
);
