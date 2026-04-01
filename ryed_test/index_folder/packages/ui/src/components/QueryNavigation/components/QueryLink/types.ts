export interface IQueryLinkComponentProps {
  onClick: () => void;
  active: boolean;
  children?: React.ReactNode | React.ReactNode[];
  link: string;
  disabled?: boolean;
}
