import { BreadcrumbLink } from '@ryed-ui/ui/Breadcrumbs';
import { ctw } from '@ryed-ui/utils/ctw';
import { FunctionComponent } from 'react';
import { IQueryLinkComponentProps } from '../types';

export const BreadcrumbControlComponent: FunctionComponent<
  IQueryLinkComponentProps
> = ({ onClick, active, children }) => (
  <BreadcrumbLink
    onClick={onClick}
    className={ctw(active && 'font-bold text-primary')}
  >
    {children}
  </BreadcrumbLink>
);
