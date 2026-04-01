import { Button } from '@/components/ui/Button/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card/Card';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/Sheet/Sheet';
import { Edit } from 'lucide-react';
import { FC } from 'react';
import { Input } from '@/components/ui/Input/Input';
import { Switch } from '@/components/ui/Switch/Switch';
import { useUpdateServiceSheet } from './hooks/useUpdateServiceSheet';
import { SERVICES_TYPES } from '../../consts/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select/Select';

interface Props {
  serviceId: string;
}

export const UpdateServiceSheet: FC<Props> = ({ serviceId }) => {
  const { data, handlers } = useUpdateServiceSheet(serviceId);

  return (
    <div>
      <Sheet
        open={data.isOpenSheet}
        onOpenChange={() => handlers.setIsOpenSheet((state) => !state)}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handlers.setIsOpenSheet(true)}
        >
          <Edit className="h-4 w-4" />
        </Button>

        <SheetContent
          className="w-full sm:w-3/4 lg:w-2/4 sm:max-w-none h-full overflow-auto flex flex-col gap-4"
          side={'right'}
        >
          <SheetHeader>
            <SheetTitle>Update service</SheetTitle>
          </SheetHeader>

          <div className="flex flex-col lg:flex-row gap-4 h-full w-full">
            <div className="flex flex-col flex-1 lg:h-[calc(100vh-92px)] gap-2 w-full">
              <div className="flex-1 overflow-auto flex w-full">
                <div className="flex flex-col h-full overflow-auto w-full">
                  <div className="w-full flex flex-col gap-4 flex-wrap">
                    <Card>
                      <CardHeader className="text-xl font-bold">
                        Service Info:
                      </CardHeader>
                      <CardContent className="flex flex-col gap-4">
                        <div className="w-full">
                          <div className="text-lg font-semibold mb-2">
                            Service Name:
                          </div>
                          <Input
                            placeholder="Service Name"
                            name="name"
                            value={data.formik.values.name}
                            onChange={data.formik.handleChange}
                          />
                          <div>
                            <span className="text-sm text-red-600">
                              {data.formik.errors.name}
                            </span>
                          </div>
                        </div>
                        <div className="w-full">
                          <div className="text-lg font-semibold mb-2">
                            Type:
                          </div>
                          <Select
                            onValueChange={(value) =>
                              data.formik.setFieldValue('type', value)
                            }
                            value={data.formik.values.type}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.values(SERVICES_TYPES).map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <div>
                            <span className="text-sm text-red-600">
                              {data.formik.errors.type}
                            </span>
                          </div>
                        </div>
                        <div className="w-full">
                          <div className="text-lg font-semibold mb-2">
                            Max Items:
                          </div>
                          <Input
                            type="number"
                            placeholder="Max Items"
                            name="maxItems"
                            value={data.formik.values.maxItems}
                            onChange={data.formik.handleChange}
                          />
                          <div>
                            <span className="text-sm text-red-600">
                              {data.formik.errors.maxItems}
                            </span>
                          </div>
                        </div>
                        <div className="w-full">
                          <div className="text-lg font-semibold mb-2">
                            Currency:
                          </div>
                          <Select
                            onValueChange={(value) =>
                              data.formik.setFieldValue('currency', value)
                            }
                            value={data.formik.values.currency}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                            <SelectContent>
                              {data.currencyList.map((currency) => (
                                <SelectItem key={currency} value={currency}>
                                  {currency}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <div>
                            <span className="text-sm text-red-600">
                              {data.formik.errors.currency}
                            </span>
                          </div>
                        </div>
                        <div className="w-full">
                          <div className="text-lg font-semibold mb-2">
                            Price:
                          </div>
                          <Input
                            placeholder="Price"
                            name="price"
                            value={data.formik.values.price}
                            onChange={data.formik.handleChange}
                          />
                          <div>
                            <span className="text-sm text-red-600">
                              {data.formik.errors.price}
                            </span>
                          </div>
                        </div>
                        {/* <div className="w-full">
                          <div className="text-lg font-semibold mb-2">
                            Dispatcher ID:
                          </div>
                          <Input
                            placeholder="Dispatcher ID"
                            name="dispatcherId"
                            value={data.formik.values.dispatcherId}
                            onChange={data.formik.handleChange}
                          />
                          <div>
                            <span className="text-sm text-red-600">
                              {data.formik.errors.dispatcherId}
                            </span>
                          </div>
                        </div> */}
                        <div className="w-full flex justify-between">
                          <div className="text-lg font-semibold mb-2">
                            Active:
                          </div>
                          <Switch
                            name="active"
                            checked={data.formik.values.active}
                            onCheckedChange={(value: boolean) =>
                              data.formik.setFieldValue('active', value)
                            }
                          />
                        </div>
                        <div className="w-full flex justify-between">
                          <div className="text-lg font-semibold mb-2">
                            Front Facing (shows for users):
                          </div>
                          <Switch
                            name="isFrontFacing"
                            checked={data.formik.values.isFrontFacing}
                            onCheckedChange={(value: boolean) =>
                              data.formik.setFieldValue('isFrontFacing', value)
                            }
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
              <div>
                <div className="w-full">
                  <Button
                    onClick={data.formik.submitForm}
                    loading={data.isLoading}
                  >
                    Update Service
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
