import { Button } from '@/components/ui/Button/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card/Card';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/Sheet/Sheet';
import { Camera, PlusIcon } from 'lucide-react';
import { FC } from 'react';

import { Input } from '@/components/ui/Input/Input';
import { PhoneInputField } from '@/components/PhoneInputField/PhoneInputField';
import { MultiSelect } from '@/components/MultiSelect/MultiSelect';
import { SUPPORTED_COUNTRIES } from '@/utils/shared/countries';
import { useCreateTravelAgentSheet } from './hooks/useCreateTravelAgentSheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select/Select';
import { Switch } from '@/components/ui/Switch/Switch';

export const CreateTravelAgentSheet: FC = () => {
  const { data, handlers } = useCreateTravelAgentSheet();

  return (
    <Sheet
      open={data.isOpenSheet}
      onOpenChange={() => handlers.setIsOpenSheet((state) => !state)}
    >
      <Button onClick={() => handlers.setIsOpenSheet((state) => !state)}>
        <div className="flex">
          <span>Create</span>
          <PlusIcon size={20} />
        </div>
      </Button>

      <SheetContent
        className="w-full sm:w-3/4 lg:w-2/4 sm:max-w-none h-full overflow-auto flex flex-col gap-4"
        side={'right'}
      >
        <SheetHeader>
          <SheetTitle>Create New Travel Agent</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col lg:flex-row gap-4 h-full w-full">
          <div className="flex flex-col flex-1 lg:h-[calc(100vh-92px)] gap-2 w-full">
            <div className="flex-1 overflow-auto flex w-full">
              <div className="flex flex-col flex-1 h-full overflow-auto w-full">
                <div className="w-full flex flex-col gap-4 flex-wrap">
                  <Card className="h-48 w-48">
                    <CardContent className="flex p-0 h-full flex-col justify-center">
                      <div className=" flex flex-col h-full  justify-center items-center">
                        {/* <div className="font-medium mb-1 flex justify-center">
                            Logo of company
                          </div> */}

                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            handlers.handleLogoChange(e);
                            setTimeout(() => {
                              data.formik.validateField('logo');
                            }, 0);
                          }}
                          id="logo"
                        />
                        <label
                          className="flex h-full cursor-pointer"
                          htmlFor={'logo'}
                        >
                          <div className="flex w-full h-full flex-col justify-center items-center">
                            {data.logoPreview ? (
                              <div className="w-full h-full rounded p-2">
                                <img
                                  src={data.logoPreview as string}
                                  alt={'logo'}
                                  className="h-full w-full rounded  object-fit"
                                />
                              </div>
                            ) : (
                              <>
                                <Camera size={56} />
                              </>
                            )}
                          </div>
                        </label>
                        <div className="flex">
                          <span className="text-sm text-red-600">
                            {data.formik.errors.logo}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="text-xl font-bold">
                      Travel Agent info:
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                      <div className="w-full">
                        <div className="">
                          <div>
                            <div className="text-lg font-semibold mb-2">
                              First Name:
                            </div>

                            <Input
                              placeholder="First name"
                              name="firstName"
                              value={data.formik.values.firstName}
                              onChange={data.formik.handleChange}
                            />

                            <div>
                              <span className="text-sm text-red-600">
                                {data.formik.errors.firstName}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="">
                          <div>
                            <div className="text-lg font-semibold mb-2">
                              Last Name:
                            </div>

                            <Input
                              placeholder="Last name"
                              name="lastName"
                              value={data.formik.values.lastName}
                              onChange={data.formik.handleChange}
                            />

                            <div>
                              <span className="text-sm text-red-600">
                                {data.formik.errors.lastName}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="">
                          <div>
                            <div className="text-lg font-semibold mb-2">
                              Phone number:
                            </div>

                            <PhoneInputField
                              onChange={(value: string) =>
                                data.formik.setFieldValue('phoneNumber', value)
                              }
                              value={data.formik.values.phoneNumber}
                              placeholder="Phone Number"
                              name="phoneNumberr"
                            />

                            <div>
                              <span className="text-sm text-red-600">
                                {data.formik.errors.phoneNumber}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="">
                          <div>
                            <div className="text-lg font-semibold mb-2">
                              Email:
                            </div>
                            <Input
                              placeholder="Email"
                              name="email"
                              type="email"
                              value={data.formik.values.email}
                              onChange={data.formik.handleChange}
                            />

                            <div>
                              <span className="text-sm text-red-600">
                                {data.formik.errors.email}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="">
                          <div>
                            <div className="text-lg font-semibold mb-2">
                              Role:
                            </div>
                            <Select
                              value={data.formik.values.role}
                              onValueChange={(value) =>
                                data.formik.setFieldValue('role', value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="agent">Agent</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <div className="w-full">
                        <div className="text-lg font-semibold mb-2 w-full flex items-center justify-between">
                          <span>Supported country:</span>
                        </div>
                        <MultiSelect
                          onChange={(selected) =>
                            data.formik.setFieldValue(
                              'supportedCountries',
                              selected.map((item) => item.value)
                            )
                          }
                          data={SUPPORTED_COUNTRIES.map((item) => ({
                            label: item,
                            value: item,
                          }))}
                          // initialSelected={
                          //   data.formik.values.supportedCountries.map(
                          //     (value) => ({
                          //       label: value,
                          //       value,
                          //     })
                          //   ) as {
                          //     label: string;
                          //     value: string;
                          //   }[]
                          // }
                        />
                        {data.formik.errors.supportedCountries && (
                          <div>
                            <span className="text-sm text-red-600">
                              {data.formik.errors.supportedCountries}
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="text-xl font-bold">
                      Commission Settings:
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                      <div className="w-full">
                        <div className="text-lg font-semibold mb-2">
                          Commission Amount:
                        </div>
                        <Input
                          placeholder="Commission Amount"
                          name="commissionAmount"
                          type="number"
                          step="0.01"
                          min="0"
                          value={data.formik.values.commissionAmount}
                          onChange={data.formik.handleChange}
                        />
                        <div>
                          <span className="text-sm text-red-600">
                            {data.formik.errors.commissionAmount}
                          </span>
                        </div>
                      </div>

                      <div className="w-full">
                        <div className="text-lg font-semibold mb-2">
                          Commission Type:
                        </div>
                        <Select
                          value={data.formik.values.commissionType}
                          onValueChange={(value) =>
                            data.formik.setFieldValue('commissionType', value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select commission type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                            <SelectItem value="FIXED">Fixed Amount</SelectItem>
                          </SelectContent>
                        </Select>
                        <div>
                          <span className="text-sm text-red-600">
                            {data.formik.errors.commissionType}
                          </span>
                        </div>
                      </div>

                      <div className="w-full flex justify-between items-center">
                        <div className="text-lg font-semibold">
                          Commission Included in Price:
                        </div>
                        <Switch
                          checked={data.formik.values.commissionIncludedInPrice}
                          onCheckedChange={(value) =>
                            data.formik.setFieldValue('commissionIncludedInPrice', value)
                          }
                        />
                        <div>
                          <span className="text-sm text-red-600">
                            {data.formik.errors.commissionIncludedInPrice}
                          </span>
                        </div>
                      </div>

                      <div className="w-full flex justify-between items-center">
                        <div className="text-lg font-semibold">
                          Development Account:
                        </div>
                        <Switch
                          checked={data.formik.values.isDev}
                          onCheckedChange={(value) =>
                            data.formik.setFieldValue('isDev', value)
                          }
                        />
                        <div>
                          <span className="text-sm text-red-600">
                            {data.formik.errors.isDev}
                          </span>
                        </div>
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
                  Create New Travel Agent
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
