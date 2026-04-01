import { MultiSelect } from '@/components/MultiSelect/MultiSelect';
import { DatePicker } from '@/components/ui/DatePicker/DatePicker';
import { Button } from '@ryed/ui/ui/Button';
import { Card, CardContent, CardHeader } from '@ryed/ui/ui/Card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ryed/ui/ui/Select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@ryed/ui/ui/Sheet';
import { endOfDay } from 'date-fns';
import { FilterIcon, X } from 'lucide-react';
import { FC } from 'react';
import { useFilterSheet } from './hooks/useFilterSheet';
import { useTranslation } from 'react-i18next';
import { Switch } from '@ryed/ui';

interface Props {
  handleConfirmFilter: (data: Record<string, string>) => void;
  searchParams: Record<string, string>;

  typeOfPage?: 'driver' | 'vehicle';
}

export const FilterSheet: FC<Props> = ({
  handleConfirmFilter,
  searchParams,
}) => {
  const { data, handlers } = useFilterSheet({
    handleConfirmFilter,
    searchParams,
  });
  const { t } = useTranslation();
  // if (searchParams.status === 'pending') return null;
  return (
    <div>
      <Sheet open={data.isDrawerOpen} onOpenChange={handlers.toggleDrawer}>
        <Button onClick={handlers.toggleDrawer}>
          <div className="flex">
            {/* <span className="mr-2">Schedule a New Journey</span> */}
            <FilterIcon size={20} />
          </div>
        </Button>

        <SheetContent
          className="w-full sm:w-3/4 md:w-2/4 sm:max-w-none h-full overflow-auto flex flex-col gap-4"
          side={'right'}
        >
          <SheetHeader>
            <SheetTitle>
              {t('journeys:journeysTableFilterSheet.mainTitle')}
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col flex-1 lg:h-[calc(100vh-92px)] gap-2 w-full">
            <div className="flex-1 overflow-auto flex w-full">
              <div className="flex flex-col h-full overflow-auto w-full">
                <div className="w-full flex flex-row gap-2 my-2 flex-wrap">
                  <span>With DEV</span>
                  <Switch
                    checked={data.filter.withDev}
                    onCheckedChange={(checked) =>
                      handlers.handleSetWithDev(checked)
                    }
                  />
                </div>
                <div className="w-full flex flex-col my-2 flex-wrap">
                  <Card>
                    <CardHeader className="text-xl font-bold">
                      <div className="w-full flex items-center justify-between">
                        <span>
                          {t('journeys:journeysTableFilterSheet.payment.title')}
                        </span>
                        <X
                          onClick={() => handlers.handleResetSelects('payment')}
                          className="h-6 w-6 cursor-pointer"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-row flex-wrap  gap-4">
                      <Select
                        value={data.paymentSelect}
                        onValueChange={(value) =>
                          handlers.handleChangeSelect('payment', value)
                        }
                        open={data.openPayment}
                        onOpenChange={(open) => handlers.setOpenPayment(open)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            defaultValue={'default'}
                            placeholder={t(
                              'journeys:journeysTableFilterSheet.payment.placeholder'
                            )}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="delayedPayment">
                              {t(
                                'journeys:journeysTableFilterSheet.payment.values.delayedPayment'
                              )}
                            </SelectItem>
                            <SelectItem value="paidByCreditCard">
                              {t(
                                'journeys:journeysTableFilterSheet.payment.values.paidByCreditCard'
                              )}
                            </SelectItem>
                            <SelectItem value="default">
                              {t(
                                'journeys:journeysTableFilterSheet.payment.values.all'
                              )}
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>
                </div>
                <div className="w-full flex flex-col my-2 flex-wrap">
                  <Card>
                    <CardHeader className="text-xl font-bold">
                      <div className="w-full flex items-center justify-between">
                        <span>
                          {t('journeys:journeysTableFilterSheet.status.title')}:
                        </span>
                        <X
                          onClick={() => handlers.handleResetSelects('status')}
                          className="h-6 w-6 cursor-pointer"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                      <MultiSelect
                        ref={data.ref.statusSelectRef}
                        data={data.mapData.status}
                        placeholder={t(
                          'journeys:journeysTableFilterSheet.status.placeholder'
                        )}
                        onChange={(values) =>
                          handlers.handleMultiSelect('status', values)
                        }
                        inputSearch={true}
                        initialSelected={data.mapData.statusInit}
                      />
                    </CardContent>
                  </Card>
                </div>
                <div className="w-full flex flex-col my-2 flex-wrap">
                  <Card>
                    <CardHeader className="text-xl font-bold">
                      <div className="w-full flex items-center justify-between">
                        <span>
                          {t('journeys:journeysTableFilterSheet.drivers.title')}
                        </span>
                        <X
                          onClick={() =>
                            handlers.handleResetSelects('driverId')
                          }
                          className="h-6 w-6 cursor-pointer"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                      <MultiSelect
                        ref={data.ref.vehicleDriverSelectRef}
                        placeholder={t(
                          'journeys:journeysTableFilterSheet.drivers.placeholder'
                        )}
                        data={data.mapData.drivers}
                        onChange={(values) =>
                          handlers.handleMultiSelect('vehicleDriverId', values)
                        }
                        inputSearch={true}
                        initialSelected={data.mapData.driversInit}
                      />
                    </CardContent>
                  </Card>
                </div>
                <div className="w-full flex flex-col my-2 flex-wrap">
                  <Card>
                    <CardHeader className="text-xl font-bold">
                      <div className="w-full flex items-center justify-between">
                        <span>
                          {t(
                            'journeys:journeysTableFilterSheet.dispatchers.title'
                          )}
                        </span>
                        <X
                          onClick={() =>
                            handlers.handleResetSelects('dispatcherIds')
                          }
                          className="h-6 w-6 cursor-pointer"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                      <MultiSelect
                        ref={data.ref.dispatcherSelectRef}
                        placeholder={t(
                          'journeys:journeysTableFilterSheet.dispatchers.placeholder'
                        )}
                        data={data.mapData.dispatchers}
                        onChange={(values) =>
                          handlers.handleMultiSelect('dispatcherIds', values)
                        }
                        inputSearch={true}
                        initialSelected={data.mapData.dispatchersInit}
                      />
                    </CardContent>
                  </Card>
                </div>
                <div className="w-full flex flex-col my-2 flex-wrap">
                  <Card>
                    <CardHeader className="text-xl font-bold">
                      <div className="w-full flex items-center justify-between">
                        <span>
                          {t(
                            'journeys:journeysTableFilterSheet.travelAgencies.title'
                          )}
                        </span>
                        <X
                          onClick={() =>
                            handlers.handleResetSelects('travelAgencyIds')
                          }
                          className="h-6 w-6 cursor-pointer"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                      <MultiSelect
                        ref={data.ref.travelAgencySelectRef}
                        placeholder={t(
                          'journeys:journeysTableFilterSheet.travelAgencies.placeholder'
                        )}
                        data={data.mapData.travelAgencies}
                        onChange={(values) =>
                          handlers.handleMultiSelect('travelAgencyIds', values)
                        }
                        inputSearch={true}
                        initialSelected={data.mapData.travelAgenciesInit}
                      />
                    </CardContent>
                  </Card>
                </div>
                <div className="w-full flex flex-col my-2 flex-wrap">
                  <Card>
                    <CardHeader className="text-xl font-bold">
                      <div className="w-full flex items-center justify-between">
                        <span>
                          {t(
                            'journeys:journeysTableFilterSheet.pickupTime.title'
                          )}
                        </span>
                        <X
                          onClick={() => handlers.handleResetCalendar('pickup')}
                          className="h-6 w-6 cursor-pointer"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-row flex-wrap  gap-4">
                      <Select
                        value={data.pickupSelect}
                        onValueChange={(value) =>
                          handlers.handleChangeSelect('pickup', value)
                        }
                        open={data.openPickup}
                        onOpenChange={(open) => handlers.setOpenPickup(open)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            defaultValue={'default'}
                            placeholder={t(
                              'journeys:journeysTableFilterSheet.pickupTime.placeholder'
                            )}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="default">
                              {t(
                                'journeys:journeysTableFilterSheet.pickupTime.values.selectTime'
                              )}
                            </SelectItem>
                            <SelectItem value="0">
                              {t(
                                'journeys:journeysTableFilterSheet.pickupTime.values.today'
                              )}
                            </SelectItem>
                            <SelectItem value="1">
                              {t(
                                'journeys:journeysTableFilterSheet.pickupTime.values.tomorrow'
                              )}
                            </SelectItem>
                            <SelectItem value="7">
                              {t(
                                'journeys:journeysTableFilterSheet.pickupTime.values.thisWeek'
                              )}
                            </SelectItem>
                            <SelectItem value="30">
                              {t(
                                'journeys:journeysTableFilterSheet.pickupTime.values.thisMonth'
                              )}
                            </SelectItem>
                            <SelectItem value="custom">
                              {t(
                                'journeys:journeysTableFilterSheet.pickupTime.values.customTime'
                              )}
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {data.pickupSelect === 'custom' && (
                        <div className="grid grid-cols-2 w-full gap-4">
                          <div>
                            <span>
                              {t(
                                'journeys:journeysTableFilterSheet.pickupTime.from'
                              )}
                            </span>
                            <DatePicker
                              value={new Date(data.filter.pickupTimeFrom!)}
                              onDateChange={(date) => {
                                handlers.handleChangeCalendar('pickupTime', {
                                  from: date,
                                  to:
                                    date > new Date(data.filter.pickupTimeTo!)
                                      ? endOfDay(date)
                                      : new Date(data.filter.pickupTimeTo!),
                                });
                              }}
                              // isPast={false}
                            />
                          </div>
                          <div>
                            <span>
                              {t(
                                'journeys:journeysTableFilterSheet.pickupTime.to'
                              )}
                            </span>
                            <DatePicker
                              value={new Date(data.filter.pickupTimeTo!)}
                              onDateChange={(date) =>
                                handlers.handleChangeCalendar('pickupTime', {
                                  from: new Date(data.filter.pickupTimeFrom!),
                                  to: date,
                                })
                              }
                              // isPast={false}
                              disabledDays={
                                new Date(data.filter.pickupTimeFrom!)
                              }
                            />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
                <div className="w-full flex flex-col my-2 flex-wrap">
                  <Card>
                    <CardHeader className="text-xl font-bold">
                      <div className="w-full flex items-center justify-between">
                        <span>
                          {t(
                            'journeys:journeysTableFilterSheet.createdTime.title'
                          )}
                        </span>
                        <X
                          onClick={() =>
                            handlers.handleResetCalendar('createAt')
                          }
                          className="h-6 w-6 cursor-pointer"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-row flex-wrap  gap-4">
                      <Select
                        value={data.createAtSelect}
                        onValueChange={(value) =>
                          handlers.handleChangeSelect('createAt', value)
                        }
                        open={data.openCreateAt}
                        onOpenChange={(open) => handlers.setOpenCreateAt(open)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            defaultValue={'default'}
                            placeholder={t(
                              'journeys:journeysTableFilterSheet.createdTime.placeholder'
                            )}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="default">
                              {t(
                                'journeys:journeysTableFilterSheet.createdTime.values.selectTime'
                              )}
                            </SelectItem>
                            <SelectItem value="0">
                              {t(
                                'journeys:journeysTableFilterSheet.createdTime.values.today'
                              )}
                            </SelectItem>
                            <SelectItem value="1">
                              {t(
                                'journeys:journeysTableFilterSheet.createdTime.values.yesterday'
                              )}
                            </SelectItem>
                            <SelectItem value="7">
                              {t(
                                'journeys:journeysTableFilterSheet.createdTime.values.thisWeek'
                              )}
                            </SelectItem>
                            <SelectItem value="30">
                              {t(
                                'journeys:journeysTableFilterSheet.createdTime.values.thisMonth'
                              )}
                            </SelectItem>
                            <SelectItem value="custom">
                              {t(
                                'journeys:journeysTableFilterSheet.createdTime.values.customTime'
                              )}
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {data.createAtSelect === 'custom' && (
                        <div className="grid grid-cols-2 w-full gap-4">
                          <div>
                            <span>
                              {t(
                                'journeys:journeysTableFilterSheet.createdTime.from'
                              )}
                              :
                            </span>
                            <DatePicker
                              value={new Date(data.filter.createdAtFrom!)}
                              onDateChange={(date) => {
                                handlers.handleChangeCalendar('createTime', {
                                  from: date,
                                  to:
                                    date > new Date(data.filter.createdAtTo!)
                                      ? endOfDay(date)
                                      : new Date(data.filter.createdAtTo!),
                                });
                              }}
                            />
                          </div>
                          <div>
                            <span>
                              {t(
                                'journeys:journeysTableFilterSheet.createdTime.to'
                              )}
                              :
                            </span>
                            <DatePicker
                              value={new Date(data.filter.createdAtTo!)}
                              onDateChange={(date) =>
                                handlers.handleChangeCalendar('createTime', {
                                  from: new Date(data.filter.createdAtFrom!),
                                  to: date,
                                })
                              }
                              disabledDays={
                                new Date(data.filter.createdAtFrom!)
                              }
                            />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
                <div className="w-full flex flex-col my-2 flex-wrap">
                  <Card>
                    <CardHeader className="text-xl font-bold">
                      <div className="w-full flex items-center justify-between">
                        <span>
                          {t(
                            'journeys:journeysTableFilterSheet.finishedTime.title'
                          )}
                        </span>
                        <X
                          onClick={() =>
                            handlers.handleResetCalendar('finished')
                          }
                          className="h-6 w-6 cursor-pointer"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-row flex-wrap  gap-4">
                      <Select
                        value={data.finishedSelect}
                        onValueChange={(value) =>
                          handlers.handleChangeSelect('finished', value)
                        }
                        open={data.openFinished}
                        onOpenChange={(open) => handlers.setOpenFinished(open)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            defaultValue={'default'}
                            placeholder={t(
                              'journeys:journeysTableFilterSheet.finishedTime.values.selectTime'
                            )}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="default">
                              {t(
                                'journeys:journeysTableFilterSheet.finishedTime.values.selectTime'
                              )}
                            </SelectItem>
                            <SelectItem value="0">
                              {t(
                                'journeys:journeysTableFilterSheet.finishedTime.values.today'
                              )}
                            </SelectItem>
                            <SelectItem value="1">
                              {t(
                                'journeys:journeysTableFilterSheet.finishedTime.values.yesterday'
                              )}
                            </SelectItem>
                            <SelectItem value="7">
                              {t(
                                'journeys:journeysTableFilterSheet.finishedTime.values.thisWeek'
                              )}
                            </SelectItem>
                            <SelectItem value="30">
                              {t(
                                'journeys:journeysTableFilterSheet.finishedTime.values.thisMonth'
                              )}
                            </SelectItem>
                            <SelectItem value="custom">
                              {t(
                                'journeys:journeysTableFilterSheet.finishedTime.values.customTime'
                              )}
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {data.finishedSelect === 'custom' && (
                        <div className="grid grid-cols-2 w-full gap-4">
                          <div>
                            <span>
                              {t(
                                'journeys:journeysTableFilterSheet.finishedTime.from'
                              )}
                              :
                            </span>
                            <DatePicker
                              value={new Date(data.filter.finishedTimeFrom!)}
                              onDateChange={(date) => {
                                handlers.handleChangeCalendar('finishedTime', {
                                  from: date,
                                  to:
                                    date > new Date(data.filter.finishedTimeTo!)
                                      ? endOfDay(date)
                                      : new Date(data.filter.finishedTimeTo!),
                                });
                              }}
                              isPast={true}
                            />
                          </div>
                          <div>
                            <span>
                              {t(
                                'journeys:journeysTableFilterSheet.finishedTime.to'
                              )}
                              :
                            </span>
                            <DatePicker
                              value={new Date(data.filter.finishedTimeTo!)}
                              onDateChange={(date) =>
                                handlers.handleChangeCalendar('finishedTime', {
                                  from:
                                    date <
                                    new Date(data.filter.finishedTimeFrom!)
                                      ? date
                                      : new Date(data.filter.finishedTimeFrom!),
                                  to: date,
                                })
                              }
                              disabledDays={new Date()}
                              isPast={true}
                            />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="mr-4">
                <Button variant={'destructive'} onClick={handlers.resetFilter}>
                  {t('journeys:journeysTableFilterSheet.buttons.resetFilter')}
                </Button>
              </div>
              <div>
                <Button onClick={handlers.parseDataAndConfirm}>
                  {t('journeys:journeysTableFilterSheet.buttons.confirmFilter')}
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
