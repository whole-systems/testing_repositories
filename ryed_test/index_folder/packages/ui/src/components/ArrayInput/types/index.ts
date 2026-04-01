import { FunctionComponent } from 'react';

export type TRowItemBase = { _id: string };

export type TRowItemComponentProps<TItem extends TRowItemBase> = {
  id: string;
  index: number;
  inputName: string;
  item: TItem;
  removeButton: React.ReactNode;
  remove: () => void;
  onValueChange: (value: TItem) => void;
  withPassengers?: boolean;
};

export type TRowItemComponent<TItem extends TRowItemBase, TProps = object> =
  | React.ComponentType<TRowItemComponentProps<TItem> & TProps>
  | FunctionComponent<TRowItemComponentProps<TItem> & TProps>;
