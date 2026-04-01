import { Button } from '@/components/ui/Button/Button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/Sheet/Sheet';

import { Combobox } from '@/components/ui/Combobox/Combobox';
import { Input } from '@/components/ui/Input/Input';
import { Plus } from 'lucide-react';
import React from 'react';
import { comboboxes, inputs } from './consts';
import { useAddVehicleSheet } from './hooks/useAddVehicleSheet';

export const AddVehicleSheet: React.FC = () => {
  const { data, handlers, isCreatingVehicle } = useAddVehicleSheet();
  return (
    <Sheet open={data.isDrawerOpen} onOpenChange={handlers.toggleDrawer}>
      <Button onClick={() => handlers.toggleDrawer(true)}>
        <div className="flex">
          <span>VEHICLE</span>
          <Plus size={20} />
        </div>
      </Button>

      <SheetContent
        className="w-full sm:w-1/2 sm:max-w-none h-full overflow-auto"
        side={'right'}
      >
        <SheetHeader>
          <SheetTitle>New vehicle</SheetTitle>
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
                  value={data.formik.values[item.name]}
                  setValue={(value) =>
                    data.formik.setFieldValue(item.name, value)
                  }
                  options={options ?? []}
                  disabled={disabled}
                  isLoading={isLoading}
                />
              </div>
            );
          })}

          {inputs.map((item) => (
            <React.Fragment key={item.name}>
              <div className="my-3 px-4 w-full lg:w-1/2">
                <div className="text-lg font-semibold mb-2">
                  {item.placeholder}:
                </div>
                <Input
                  placeholder={item.placeholder}
                  onChange={data.formik.handleChange}
                  value={data.formik.values[item.name]}
                  name={item.name}
                />
                <div className="mt-1">
                  <span className="text-rose-600">
                    {data.formik.errors[item.name] ?? ''}
                  </span>
                </div>
              </div>
            </React.Fragment>
          ))}
          <div className="my-10 w-full">
            <Button
              onClick={handlers.createVehicle}
              disabled={data.disabledFormBtn}
              loading={isCreatingVehicle}
            >
              Add Vehicle
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
