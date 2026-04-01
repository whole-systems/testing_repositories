import { Button } from '@/components/ui/Button/Button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/Sheet/Sheet';
import { Pencil } from 'lucide-react';
import React, { useCallback } from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/AlertDialog/AlertDialog';
import { useEditDriverSheet } from './hooks/useEditDriverSheet';
import { inputs } from './consts';
import { Input } from '@/components/ui/Input/Input';
import { Combobox } from '@/components/ui/Combobox/Combobox';

export const EditDriverSheet: React.FC = () => {
  const { data, handlers } = useEditDriverSheet();

  const renderCombobox = useCallback(() => {
    const options = data.vehicleData?.map((item) => ({
      value: item.id,
      label: `${item.make} ${item.model}`,
    }));
    return (
      <Combobox
        value={data.valueVehicleCombobox}
        setValue={handlers.setValueVehcileCombobox}
        open={data.openVehicleCombobox}
        setOpen={handlers.setOpenVehicleOpenCombobox}
        options={options}
      />
    );
  }, [
    data.vehicleData,
    data.openVehicleCombobox,
    data.valueVehicleCombobox,
    handlers.setValueVehcileCombobox,
    handlers.setOpenVehicleOpenCombobox,
  ]);
  return (
    <Sheet open={data.isDrawerOpen} onOpenChange={handlers.toggleDrawer}>
      <Button onClick={() => handlers.toggleDrawer(true)}>
        <div className="flex">
          <span className="mr-2">EDIT</span>
          <Pencil size={20} />
        </div>
      </Button>

      <SheetContent
        className="w-full sm:w-1/2 sm:max-w-none h-full overflow-auto"
        side={'right'}
      >
        <SheetHeader>
          <SheetTitle>Edit driver</SheetTitle>
        </SheetHeader>

        <div className="mt-8 flex flex-col justify-between">
          <div className="flex flex-wrap">
            {inputs.map((item) => {
              const error =
                data.formik.errors[item.name] &&
                data.formik.values[item.name].length
                  ? data.formik.errors[item.name]
                  : '';
              return (
                <React.Fragment key={item.name}>
                  <div className="my-4 px-4 w-full lg:w-1/2">
                    <div className="text-lg font-semibold mb-2">
                      {item.placeholder}:
                    </div>
                    <Input
                      placeholder={item.placeholder}
                      onChange={data.formik.handleChange}
                      value={data.formik.values[item.name]}
                      name={item.name}
                    />
                    <div>
                      <span className="text-sm text-red-600">{error}</span>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>

          <div className="my-10 w-full">
            <Button
              className="mr-4"
              disabled={!!Object.keys(data.formik.errors).length}
              onClick={handlers.updateDriver}
            >
              Edit Driver
            </Button>

            <AlertDialog
              open={data.openDeleteModal}
              onOpenChange={handlers.setOpenDeleteModal}
            >
              <AlertDialogTrigger asChild>
                <Button variant={'destructive'}>Delete Driver</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this vehicle and remove vehicle's data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>

                  <Button
                    variant={'destructive'}
                    onClick={handlers.deleteVehicle}
                  >
                    Delete Driver
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className="flex flex-wrap mt-8 px-4">{renderCombobox()}</div>
          <div className="mt-8">
            <Button
              className="mr-4"
              // disabled={!!Object.keys(data.formik.errors).length}
              onClick={handlers.assignVehicle}
            >
              Assign Vehicle
            </Button>
            <Button
              variant={'destructive'}
              disabled={data.driverData?.vehicle ? false : true}
              onClick={handlers.unAssignVehicle}
            >
              Unassign Vehicle
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
