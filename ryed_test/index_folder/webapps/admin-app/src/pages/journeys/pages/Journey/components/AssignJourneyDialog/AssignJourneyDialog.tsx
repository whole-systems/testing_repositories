import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ryed/ui/ui/Dialog';

import { FC } from 'react';
import { TJourney } from '@/models/journey';
import { useAssignJourney } from './hooks/useAssignJourney';
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@ryed/ui/ui/Select';
import { Input } from '@ryed/ui/ui/Input';
import { Button } from '@/components/ui/Button/Button';

export const AssignJourneyDialog: FC<{ journeyData: TJourney }> = ({
  journeyData,
}) => {
  const { data, handlers } = useAssignJourney(journeyData);

  return (
    <Dialog open={data.openModal} onOpenChange={handlers.setOpenModal}>
      <DialogTrigger asChild>
        <Button
          onClick={() => handlers.setOpenModal((state) => !state)}
          variant="secondary"
        >
          {journeyData.vehicleDriverId ? 'Reassign Journey' : 'Assign Journey'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>
            {journeyData.vehicleDriverId ? 'Reassign' : 'Assign'} Dispatcher and
            Driver
          </DialogTitle>
          <DialogDescription>
            {journeyData.vehicleDriverId ? 'Reassign' : 'Assign'} a dispatcher
            and driver to the journey.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <div className="my-2">
            <div className="text-lg font-semibold mb-2">Dispatcher :</div>
            <div className="flex flex-row gap-2">
              <Select
                onValueChange={handlers.setSelectedDispatcher}
                value={data.selectedDispatcher ?? undefined}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a dispatcher" />
                </SelectTrigger>
                <SelectContent>
                  {data.dispatchers?.map((dispatcher) => (
                    <SelectItem key={dispatcher.id} value={dispatcher.id}>
                      {dispatcher.companyName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                loading={!!data.isAssigningJourney}
                onClick={handlers.handleAssignDispatcher}
                variant={'default'}
              >
                {journeyData.dispatcherId ? 'Reassign' : 'Assign'} dispatcher
              </Button>
            </div>
          </div>
          {(journeyData.dispatcherId || data.selectedDispatcher) && (
            <div className="flex flex-col gap-2">
              <div className="my-2">
                <div className="text-lg font-semibold mb-2">Driver :</div>
                <Select
                  onValueChange={handlers.setSelectedDriver}
                  value={data.selectedDriver ?? undefined}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a driver" />
                  </SelectTrigger>
                  <SelectContent>
                    {data.drivers?.map((driver) => (
                      <SelectItem key={driver.id} value={driver.id}>
                        {driver.firstName} {driver.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="my-2">
                <div className="text-lg font-semibold mb-2">Vehicle :</div>
                <Select
                  onValueChange={handlers.setSelectedVehicle}
                  value={data.selectedVehicle ?? undefined}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    {data.vehicles?.map((vehicle) => (
                      <SelectItem key={vehicle.id} value={vehicle.id}>
                        {vehicle.make} {vehicle.model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="my-2">
                <div className="text-lg font-semibold mb-2">Currency :</div>

                <Select
                  value={data.selectedCurrencyCode ?? 'USD'}
                  onValueChange={handlers.setSelectedCurrencyCode}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {data.currencyOptions?.map((currency) => (
                      <SelectItem key={currency.value} value={currency.value}>
                        {currency.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="my-2">
                <div className="text-lg font-semibold mb-2">Price :</div>
                <Input
                  placeholder={data.recommendedPrice?.toString() || ''}
                  onChange={(input) => {
                    handlers.setPrice(+input.currentTarget.value);
                  }}
                  onKeyDown={(e) => {
                    if (['e', 'E', '+', '-'].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  type="number"
                  value={data.price || ''}
                  name="price"
                />
                {data.price && data.localCurrencyToUsd ? (
                  <div className="mt-1 text-muted-foreground">
                    ~ {data.localCurrencyToUsd} USD
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            loading={
              !!data.isAssigningJourney ||
              !!data.isAssigningDriver ||
              !!data.isReassigningDriver
            }
            onClick={handlers.handleAssignJourney}
            variant={'default'}
            disabled={
              !data.selectedDriver ||
              !data.selectedVehicle ||
              !data.selectedCurrencyCode ||
              !data.price ||
              !data.selectedDispatcher
            }
          >
            {journeyData.vehicleDriverId ? 'Reassign' : 'Assign'} journey to
            driver
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
