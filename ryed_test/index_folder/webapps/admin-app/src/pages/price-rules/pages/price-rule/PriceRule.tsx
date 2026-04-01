import { Button, Card, CardContent, CardHeader, CardTitle } from '@ryed/ui';
import { usePriceRule } from './hooks/usePriceRule';
import { format } from 'date-fns';
import { ERuleType } from '@/models/price-rules';
import { DeleteModal } from './components/DeleteModal/DeleteModal';
import { EditPriceRuleModal } from './components/EditPriceRuleModal/EditPriceRuleModal';

interface PriceRuleProps {
  isBatched?: boolean;
}

export const PriceRule = ({ isBatched = false }: PriceRuleProps) => {
  const { data, handlers } = usePriceRule(isBatched);

  if (data.isLoadingPriceRule) {
    return <div>Loading...</div>;
  }
  if (!data.priceRule) {
    return <div>No price rule found</div>;
  }

  return (
    <div className="flex flex-col flex-1 gap-2 p-10">
      <DeleteModal
        isOpen={data.isDeleteModalOpen}
        onDelete={handlers.handleDelete}
        isLoading={data.isDeletingPriceRule}
        onClose={() => handlers.setIsDeleteModalOpen(false)}
      />
      <div className="flex flex-row gap-2 justify-end">
        <EditPriceRuleModal priceRule={data.priceRule} />

        <Button
          variant="destructive"
          onClick={() => handlers.setIsDeleteModalOpen(true)}
        >
          Delete
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{data.priceRule?.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Card>
              <CardHeader>
                <CardTitle>Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row gap-2">
                    <p>{data.priceRule?.entityType}:</p>
                    <p>
                      {data.priceRule?.user
                        ? 'companyName' in data.priceRule.user
                          ? data.priceRule.user.companyName
                          : data.priceRule.user.name
                        : 'No user'}
                    </p>
                  </div>
                  <div className="flex flex-row gap-2">
                    <p>Priority:</p>
                    <p>{data.priceRule?.priority}</p>
                  </div>
                  {!data.priceRule.batchId && (
                    <div className="flex flex-row gap-2">
                      <p>Adjustment Type:</p>
                      <p>{data.priceRule?.adjustmentType}</p>
                    </div>
                  )}
                  {!data.priceRule.batchId && (
                    <div className="flex flex-row gap-2">
                      <p>Price Adjustment:</p>
                      <p>{data.priceRule?.priceAdjustment}</p>
                    </div>
                  )}
                  {data.priceRule?.activeFrom && (
                    <div className="flex flex-row gap-2">
                      <p>Active From:</p>
                      <p>
                        {format(
                          data.priceRule?.activeFrom as string,
                          'HH:mm dd/MM/yyyy'
                        )}
                      </p>
                    </div>
                  )}
                  {data.priceRule?.activeUntil && (
                    <div className="flex flex-row gap-2">
                      <p>Active To:</p>
                      <p>
                        {format(
                          data.priceRule?.activeUntil as string,
                          'HH:mm dd/MM/yyyy'
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {data.priceRule?.ruleLogic?.map((rule, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle>Rule #{index + 1}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>type of rule: {rule.type}</p>
                        {rule.type === ERuleType.DAY_OF_WEEK && (
                          <p>day of week: {rule.daysOfWeek}</p>
                        )}
                        {rule.type === ERuleType.HOURS_OF_DAYS && (
                          <p>
                            hours of days:{' '}
                            {rule.startHourOfDays && rule.startHourOfDays} -{' '}
                            {rule.stopHourOfDays && rule.stopHourOfDays}
                          </p>
                        )}
                        {rule.type === ERuleType.VEHICLE_TYPE ||
                          (rule.type === ERuleType.NUMBER_OF_PASSENGERS && (
                            <p>vehicle type: {rule.vehicleType}</p>
                          ))}
                        {rule.type === ERuleType.NUMBER_OF_PASSENGERS && (
                          <div>
                            <p>
                              number of passengers type: {rule.passengersAmount}
                            </p>
                            <p>Adjustment Type: {rule.adjustmentType}</p>
                            <p>Price Adjustment: {rule.priceAdjustment}</p>
                          </div>
                        )}
                        {rule.type === ERuleType.FROM_SOURCE_COUNTRY && (
                          <p>from source country: {rule.name}</p>
                        )}
                        {rule.type === ERuleType.BETWEEN_REGION && (
                          <p>
                            between region to region:{' '}
                            {rule.fromSupportedRegion?.name} to{' '}
                            {rule.toSupportedRegion?.name}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
