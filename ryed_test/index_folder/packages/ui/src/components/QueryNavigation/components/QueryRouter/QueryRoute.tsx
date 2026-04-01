import { FunctionComponent, ReactNode } from 'react';

interface IBreadcrumbsQueryRouteProps {
  pageKey: string;
  component?: FunctionComponent<unknown>;
  children?: ReactNode;
}

export const QueryRoute = ({
  component: Component,
  children,
}: IBreadcrumbsQueryRouteProps) => {
  if (children) return children;

  if (!Component)
    throw new Error('Component is required when children are not provided.');

  return <Component />;
};
