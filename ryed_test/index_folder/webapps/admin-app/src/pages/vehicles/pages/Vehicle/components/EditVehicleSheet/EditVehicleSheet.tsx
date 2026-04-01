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
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';
import { Input } from '@/components/ui/Input/Input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/Sheet/Sheet';
import { Camera, Pencil } from 'lucide-react';
import React from 'react';
import { imageInputs, inputs } from './consts';
import { useEditVehicle } from './hooks/useEditVehicle';

export const EditVehicleSheet: React.FC = () => {
  const { data, handlers, isUpdating } = useEditVehicle();

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
          <SheetTitle>Edit vehicle</SheetTitle>
        </SheetHeader>

        <div className="mt-8 flex flex-col justify-between">
          <div className="flex flex-wrap">
            {inputs.map((item) => (
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
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex flex-wrap">
              {imageInputs.map((item) => (
                <div className="my-4 px-4 w-full lg:w-1/3" key={item.name}>
                  <div className="font-medium mb-1 pl-8">
                    {item.label}
                  </div>
                  <Card className="w-40 h-40 relative overflow-hidden">
                    <input
                      type="file"
                      accept="image/*"
                      id={item.name}
                      className="hidden"
                      onChange={(e) => {
                        handlers.handleImageChange(e, item.name);
                      }}
                    />
                    <label
                      className="flex w-full h-full cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out"
                      htmlFor={item.name}
                    >
                      <div className="flex w-full flex-col h-full justify-center items-center">
                        {data.images[item.name] ? (
                          <div className="w-full h-full rounded p-2">
                            <img
                              src={data.images[item.name] as string}
                              alt={item.name}
                              className="w-full h-full rounded"
                            />
                          </div>
                        ) : (
                          <>
                            <Camera size={56} />
                          </>
                        )}
                      </div>
                    </label>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <div className="my-10 w-full">
            <Button
              className="mr-4"
              disabled={!!Object.keys(data.formik.errors).length || isUpdating}
              onClick={handlers.editVehicle}
            >
              Edit Vehicle
            </Button>

            <AlertDialog
              open={data.openDeleteModal}
              onOpenChange={handlers.setOpenDeleteModal}
            >
              <AlertDialogTrigger asChild>
                <Button variant={'destructive'}>Delete Vehicle</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this vehicle and remove the vehicle's data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>

                  <Button
                    variant={'destructive'}
                    onClick={handlers.deleteVehicle}
                  >
                    Delete Vehicle
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
