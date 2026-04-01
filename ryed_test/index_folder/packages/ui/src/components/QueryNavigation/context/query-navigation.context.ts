import { createContext } from 'react';
import { IQueryNavigationContext } from '../types';

export const QueryNavigationContext = createContext<IQueryNavigationContext>({
  activePage: '',
  redirect: () => {},
});
