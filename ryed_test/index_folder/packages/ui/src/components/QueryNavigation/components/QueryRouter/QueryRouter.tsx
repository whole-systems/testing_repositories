import {
  Children,
  cloneElement,
  FunctionComponent,
  isValidElement,
  ReactNode,
} from 'react';
import { useQueryNavigation } from '../../hooks/useQueryNavigation';

interface IBreadcrumbsQueryRouterProps {
  children: ReactNode[] | ReactNode;
}

export const QueryRouter: FunctionComponent<IBreadcrumbsQueryRouterProps> = ({
  children,
}) => {
  const { activePage } = useQueryNavigation();

  return Children.map(children, (child) => {
    if (
      isValidElement<{ pageKey: string }>(child) &&
      child.props.pageKey === activePage
    ) {
      return cloneElement(child, child.props);
    }
    return null;
  });
};
