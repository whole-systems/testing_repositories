export interface IInternalQueryNavigationContextState {
  activePage: string;
}

export interface IInternalQueryNavigationContextParams {
  queryKey: string;
  initialPageKey: string;
  clearOnUnmount?: boolean;
  disabledPages?: string[];
  fallbackToWhenDisabled?: string;
  replaceOnRedirect?: boolean;

  onPageChange?: (prevPage: string | null, currentPage: string) => void;
  onInitialPageOverrideByUrl?: (pageKey: string) => void;
}
