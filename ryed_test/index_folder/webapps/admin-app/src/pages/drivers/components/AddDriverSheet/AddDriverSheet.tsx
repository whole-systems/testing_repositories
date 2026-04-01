import { Button } from '@/components/ui/Button/Button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/Sheet/Sheet';

import React from 'react';

import { Input } from '@/components/ui/Input/Input';
import { Plus } from 'lucide-react';
import { inputs } from './consts';
import { useAddDriverSheet } from './hooks/useAddDriverSheet';
import { PhoneInputField } from '@/components/PhoneInputField/PhoneInputField';

export const AddDriverSheet: React.FC = () => {
  const { data, handlers, isCreatingDriver } = useAddDriverSheet();

  return (
    <Sheet open={data.isDrawerOpen} onOpenChange={handlers.toggleDrawer}>
      <Button onClick={() => handlers.toggleDrawer(true)}>
        <div className="flex">
          <span className="mr-2">DRIVER</span>
          <Plus size={20} />
        </div>
      </Button>

      <SheetContent
        className="w-full sm:w-1/2 sm:max-w-none h-full overflow-auto"
        side={'right'}
      >
        <SheetHeader>
          <SheetTitle>New Driver</SheetTitle>
        </SheetHeader>

        <div className="mt-8 flex flex-wrap">
          {inputs.map((item) => {
            const error =
              data.formik.errors[item.name] &&
              data.formik.values[item.name] &&
              data.formik.values[item.name].length
                ? data.formik.errors[item.name]
                : '';

            return (
              <React.Fragment key={item.name}>
                <div className="my-4 px-4 w-full lg:w-1/2">
                  <div className="text-lg font-semibold mb-2">
                    {item.placeholder}:
                  </div>
                  {item.name === 'phoneNumber' ? (
                    <PhoneInputField
                      onChange={(value: string) =>
                        data.formik.setFieldValue(item.name, value)
                      }
                      value={data.formik.values[item.name]}
                      placeholder={item.placeholder}
                      name={item.name}
                    />
                  ) : (
                    <Input
                      placeholder={item.placeholder}
                      onChange={data.formik.handleChange}
                      value={data.formik.values[item.name]}
                      name={item.name}
                    />
                  )}
                  <div>
                    <span className="text-sm text-red-600">{error}</span>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
          <div className="my-10 w-full">
            <Button
              disabled={data.disabledFormBtn}
              onClick={handlers.createDriver}
              loading={isCreatingDriver}
            >
              Add Driver
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
