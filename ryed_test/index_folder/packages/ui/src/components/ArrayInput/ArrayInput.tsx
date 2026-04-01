import { CirclePlus, CircleX } from 'lucide-react';
import { useCallback } from 'react';
import { TRowItemBase } from './types';
import { TRowItemComponent } from './types';

export interface IArrayInputProps<TItem extends TRowItemBase> {
  value: TItem[];
  name: string;

  label?: string | React.ReactNode;
  disabled?: boolean;

  RowItemComponent: TRowItemComponent<TItem>;

  // call when user edits existing item
  onItemValueChange: (
    item: TItem,
    items: TItem[],
    changeItemId: string
  ) => void;

  // call when user removes item
  onRemove: (newValue: TItem[], removedItemId: string) => void;

  // call when user clicks on add button, should return new item
  item: () => TItem;

  // call when new item is added
  onAdd: (item: TItem, items: TItem[]) => void;
}

export function ArrayInput<TItem extends { _id: string }>({
  label,
  value,
  RowItemComponent,
  name,
  disabled,
  onItemValueChange,
  item,
  onAdd,
  onRemove,
}: IArrayInputProps<TItem>) {
  const handleAdd = useCallback(() => {
    const newItem = item();
    onAdd(newItem, [...value, newItem]);
  }, [value, item, onAdd]);

  const removeElement = useCallback(
    (id: string) => {
      const newValue = value.filter((item) => item._id !== id);
      onRemove(newValue, id);
    },
    [value, onRemove]
  );

  const handleChange = useCallback(
    (id: string, updatedItem: TItem) => {
      const newItems = value.map((item) => {
        if (item._id === id) {
          return updatedItem;
        }
        return item;
      });

      onItemValueChange(updatedItem, newItems, id);
    },
    [value, onItemValueChange]
  );

  return (
    <div className="flex flex-col gap-4">
      <div
        className={`flex flex-row ${
          label ? 'justify-start' : 'justify-end'
        } items-center`}
      >
        {label && (
          <div className={`font-bold mr-4 ${disabled ? 'opacity-50' : ''}`}>
            {label}
          </div>
        )}
        <div title="Add item">
          <CirclePlus
            onClick={handleAdd}
            size={26}
            className={`cursor-pointer hover:opacity-70 ${
              disabled ? 'opacity-50 pointer-events-none' : ''
            }`}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {value.map((item, index) => (
          <RowItemComponent
            key={item._id}
            id={item._id}
            index={index}
            item={item}
            inputName={name}
            removeButton={
              <CircleX
                size={20}
                className="cursor-pointer"
                onClick={() => removeElement(item._id)}
              />
            }
            remove={() => removeElement(item._id)}
            onValueChange={(item) => handleChange(item._id, item)}
          />
        ))}
      </div>
    </div>
  );
}
