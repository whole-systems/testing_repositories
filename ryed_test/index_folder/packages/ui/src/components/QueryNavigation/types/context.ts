export interface IQueryNavigationContext {
  activePage: string;
  redirect: (pageKey: string) => void;
}
