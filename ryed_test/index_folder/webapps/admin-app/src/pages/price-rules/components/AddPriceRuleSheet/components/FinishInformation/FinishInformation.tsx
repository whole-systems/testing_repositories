import { FC } from 'react';
import { usePriceRulesContext } from '../../context/PriceRules/hooks/usePriceRulesContext';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@ryed/ui';
import { Dispatcher } from '@/models/dispatchers';
import { TravelAgency } from '@/models/travel-agencies';
import { TravelAgent } from '@/models/travel-agents';
import { format } from 'date-fns';
import { ERuleType, EAdjustmentType } from '@/models/price-rules';

export const FinishInformation: FC = () => {
  const { data, handlers } = usePriceRulesContext();
  const formData = data.priceRulesData;

  return (
    <div className="flex-1 overflow-y-auto justify-between flex flex-col">
      <div className="flex flex-col gap-2">
        <Card>
          <CardHeader>
            <CardTitle>Finish Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Common Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <div className="flex flex-row gap-2">
                        <p>Name: {formData.commonInformation?.name}</p>
                      </div>
                      <div className="flex flex-row gap-2">
                        <p>Priority: {formData.commonInformation?.priority}</p>
                      </div>
                      <div className="flex flex-row gap-2">
                        <p>
                          Type of Journey:{' '}
                          {formData.commonInformation?.typeOfJourney}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Type of Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      {formData.typeOfUsers?.typeOfUsers}:{' '}
                      {formData.typeOfUsers?.typeOfUsers === 'dispatcher' &&
                        (formData.typeOfUsers.user as Dispatcher).companyName}
                      {formData.typeOfUsers?.typeOfUsers === 'travel-agency' &&
                        (formData.typeOfUsers.user as TravelAgency).name}
                      {formData.typeOfUsers?.typeOfUsers === 'agent' &&
                        (formData.typeOfUsers.user as TravelAgent).firstName}
                    </p>
                  </CardContent>
                </Card>
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Effects </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {formData.effectsInformation?.effectsFrom && (
                      <p>
                        from:{' '}
                        {format(
                          formData.effectsInformation?.effectsFrom ||
                            new Date(),
                          'HH:mm/dd/MM/yyyy'
                        )}
                      </p>
                    )}
                    {formData.effectsInformation?.effectsTo && (
                      <p>
                        to:{' '}
                        {format(
                          formData.effectsInformation?.effectsTo || new Date(),
                          'HH:mm/dd/MM/yyyy'
                        )}
                      </p>
                    )}
                    {formData.ruleSpecifications?.some(
                      (rule) => rule.ruleType !== ERuleType.NUMBER_OF_PASSENGERS
                    ) && (
                      <p>
                        {formData.effectsInformation?.typeOfPrice}:{' '}
                        {formData.effectsInformation?.typeOfPrice ===
                        EAdjustmentType.PERCENTAGE
                          ? `${formData.effectsInformation?.valueOfPrice}%`
                          : `${formData.effectsInformation?.valueOfPrice} USD`}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
              <div className="flex flex-row flex-wrap gap-2">
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Rules</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                      {formData.ruleSpecifications?.map((rule, index) => (
                        <Card key={index}>
                          <CardHeader>
                            <CardTitle>Rule #{index + 1}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p>type of rule: {rule.ruleType}</p>
                            {rule.ruleType === ERuleType.DAY_OF_WEEK && (
                              <p>day of week: {rule.daysOfWeek?.join(', ')}</p>
                            )}
                            {rule.ruleType === ERuleType.HOURS_OF_DAYS && (
                              <p>
                                hours of days:{' '}
                                {rule.hoursOfDays?.startHourOfDays &&
                                  format(
                                    rule.hoursOfDays?.startHourOfDays ||
                                      new Date(),
                                    'HH:mm'
                                  )}{' '}
                                -{' '}
                                {rule.hoursOfDays?.stopHourOfDays &&
                                  format(
                                    rule.hoursOfDays?.stopHourOfDays ||
                                      new Date(),
                                    'HH:mm'
                                  )}
                              </p>
                            )}
                            {rule.ruleType === ERuleType.VEHICLE_TYPE ||
                              rule.ruleType ===
                                ERuleType.NUMBER_OF_PASSENGERS && (
                                <p>
                                  vehicle type: {rule.vehicleType?.join(', ')}
                                </p>
                              )}
                            {rule.ruleType ===
                              ERuleType.NUMBER_OF_PASSENGERS && (
                              <div>
                                <p>
                                  number of passengers: {rule.passengersAmount}
                                </p>
                                <p>adjustment type: {rule.adjustmentType}</p>
                                <p>price adjustment: {rule.priceAdjustment}</p>
                              </div>
                            )}
                            {rule.ruleType ===
                              ERuleType.FROM_SOURCE_COUNTRY && (
                              <p>from source country: {rule.country?.name}</p>
                            )}
                            {rule.ruleType === ERuleType.BETWEEN_REGION && (
                              <p>
                                between region to region:{' '}
                                {rule.regions?.fromRegion?.name} to{' '}
                                {rule.regions?.toRegion?.name}
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-row justify-end gap-2 my-4">
        <Button variant="outline" onClick={handlers.handlePreviousStep}>
          Back
        </Button>
        <Button
          disabled={data.isCreatePriceRuleLoading}
          onClick={handlers.handleCreatePriceRule}
        >
          {data.isCreatePriceRuleLoading ? 'Creating...' : 'Create'}
        </Button>
      </div>
    </div>
  );
};
