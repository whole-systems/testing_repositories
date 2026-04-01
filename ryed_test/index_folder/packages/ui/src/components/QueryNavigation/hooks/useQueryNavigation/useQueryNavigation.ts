import { useContext } from 'react';
import { QueryNavigationContext } from '../../context/query-navigation.context';

export const useQueryNavigation = () => useContext(QueryNavigationContext);
