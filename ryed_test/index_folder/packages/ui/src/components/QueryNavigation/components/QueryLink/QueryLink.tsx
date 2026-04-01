import React, { forwardRef } from 'react';
import { useQueryNavigation } from '../../hooks/useQueryNavigation';
import { IQueryLinkComponentProps } from './types';

interface IQueryLinkProps<
  TControlComponentProps extends IQueryLinkComponentProps
> {
  link: string;
  children: React.ReactNode;
  disabled?: boolean;
  ControlComponent?:
    | React.ComponentType<TControlComponentProps>
    | React.ForwardRefExoticComponent<
        TControlComponentProps & React.RefAttributes<unknown>
      >;
}

function QueryLinkComponent<
  TControlComponentProps extends IQueryLinkComponentProps
>(
  {
    link,
    children,
    // @ts-expect-error Fix type
    ControlComponent = BreadcrumbControlComponent,
    ...restProps
  }: IQueryLinkProps<TControlComponentProps> &
    Omit<TControlComponentProps, keyof IQueryLinkComponentProps>,
  ref: React.Ref<unknown>
) {
  const { redirect, activePage } = useQueryNavigation();

  const isActive = activePage === link;

  return (
    // @ts-expect-error Fix type
    <ControlComponent
      onClick={() => redirect(link)}
      active={isActive}
      ref={ref}
      link={link}
      {...restProps}
    >
      {children}
    </ControlComponent>
  );
}

export const QueryLink = forwardRef(QueryLinkComponent) as <
  TControlComponentProps extends IQueryLinkComponentProps
>(
  props: IQueryLinkProps<TControlComponentProps> &
    Omit<TControlComponentProps, keyof IQueryLinkComponentProps> & {
      ref?: React.Ref<unknown>;
    }
) => React.ReactElement;
