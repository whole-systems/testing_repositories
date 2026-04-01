import { Button } from '@/components/ui/Button/Button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/Sheet/Sheet';
import { Plus } from 'lucide-react';
import { FC } from 'react';
import { useAddCarModelSheet } from './hooks/useAddCarModelSheet';
import { comboboxes } from './consts';
import { Combobox } from '@/components/ui/Combobox/Combobox';
import { FindAndAddList } from '@/components/FindAndAddList/FindAndAddList';

export const AddCarModelSheet: FC = () => {
  const { data, handlers } = useAddCarModelSheet();
  return (
    <Sheet open={data.isDrawerOpen} onOpenChange={handlers.toggleDrawer}>
      <Button onClick={() => handlers.toggleDrawer(true)}>
        <div className="flex">
          <span className="mr-2">ADD CAR MODEL</span>
          <Plus size={20} />
        </div>
      </Button>

      <SheetContent
        className="w-full sm:w-1/2 sm:max-w-none h-full overflow-auto"
        side={'right'}
      >
        <SheetHeader>
          <SheetTitle>New Car Model</SheetTitle>
        </SheetHeader>

        <div className="mt-8 flex flex-wrap">
          {comboboxes.map((item) => {
            const options = item.options.length
              ? item.options
              : data.carData[item.name];
            const disabled = data.disabledComboboxes(item.name);
            const isLoading = data.comboboxesIsLoading[item.name];
            return (
              <div className="my-4 px-4 w-full lg:w-1/2" key={item.name}>
                <div className="text-lg font-semibold mb-2">
                  {item.placeholder}:
                </div>
                <Combobox
                  open={data.openComboboxes[item.name]}
                  setOpen={handlers.setOpenComboboxes[item.name]}
                  value={data.formik.values[item.name] as string}
                  setValue={(value) =>
                    data.formik.setFieldValue(item.name, value)
                  }
                  options={options ?? []}
                  disabled={disabled}
                  isLoading={isLoading}
                />
                <div>
                  <span className="text-rose-600">
                    {data.formik.errors[item.name] ?? ''}
                  </span>
                </div>
              </div>
            );
          })}
          <div className="my-4 px-4 w-full lg:w-1/2">
            <div className="text-lg font-semibold mb-2">Model:</div>
            <FindAndAddList
              isOpen={data.openModelsBox}
              setIsOpen={handlers.openAndGetModelsData}
              options={data.models}
              setValue={(value) => data.formik.setFieldValue('model', value)}
              value={data.formik.values.model}
              disabled={data.disabledComboboxes('model')}
              isLoading={data.modelsCarIsLoading}
            />
            <div>
              <span className="text-rose-600">
                {data.formik.errors.model ?? ''}
              </span>
            </div>
          </div>
          <div className="my-10 w-full">
            <Button loading={data.isLoading} onClick={data.formik.submitForm}>
              Add Car Model
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
