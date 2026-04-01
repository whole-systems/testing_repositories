import { Section } from '../Section/Section';

import { TJourney } from '@/models/journey';
import { Card, Separator } from '@ryed/ui';
import { ReadableId } from '../ReadableId/ReadableId';

import { parseLocationName } from '@/utils/parseLocationName/parseLocationName';
import { Badge } from '@ryed-ui/ui/Badge';
import { formatDate } from '@ryed-ui/utils/format-date';
import { getTimezoneForCountryName } from '@ryed-ui/utils/parseTime';
import { capitalize } from 'lodash';
import { CalendarCheck, MapPin } from 'lucide-react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { InfoItem } from '../InfoItem/InfoItem';
import { UpdatePriceDialog } from '../UpdatePriceDialog/UpdatePriceDialog';

const pathToJourneyDetailsTranslation = 'journeys:journey.journeyDetails';

export const JourneyDetails: FC<{ journeyData: TJourney }> = ({
  journeyData,
}) => {
  const { t } = useTranslation();
  const waypoints = journeyData.metadata.routeDetails
    ? journeyData.metadata.routeDetails?.stops
    : [];

  const totalPrice =
    journeyData.currency === 'USD'
      ? `$${journeyData.tripPriceUSD?.toFixed(2)}`
      : `${journeyData.tripPrice?.toFixed(2)} ${journeyData.currency}`;
  return (
    <Card className="py-6 ">
      <div className="flex justify-between items-start px-6">
        <h2 className="text-2xl font-bold mb-6">
          {t(`${pathToJourneyDetailsTranslation}.title`)}
        </h2>
        <ReadableId id={journeyData.readableId} />
      </div>

      <div className="grid grid-cols-1 gap-6 max-h-[350px] overflow-auto">
        <div className="space-y-4 px-6">
          <Section title={t(`${pathToJourneyDetailsTranslation}.timing.title`)}>
            {journeyData.scheduledJourney?.pickupTime && (
              <InfoItem
                label={t(
                  `${pathToJourneyDetailsTranslation}.timing.scheduledPickup`
                )}
                value={formatDate(
                  new Date(journeyData.scheduledJourney?.pickupTime),
                  {
                    timezone:
                      getTimezoneForCountryName(
                        journeyData.toLatLang?.country
                      ) || 'N/A',
                  }
                )}
                icon={<CalendarCheck className="h-4 w-4 text-gray-500" />}
              />
            )}
          </Section>

          <Separator className="my-4" />

          <Section
            title={t(`${pathToJourneyDetailsTranslation}.location.title`)}
          >
            <InfoItem
              label={t(`${pathToJourneyDetailsTranslation}.location.from`)}
              value={parseLocationName(journeyData?.fromLatLang)}
              icon={<MapPin className="h-4 w-4 text-gray-500" />}
            />
            <InfoItem
              label={t(`${pathToJourneyDetailsTranslation}.location.to`)}
              value={parseLocationName(journeyData?.toLatLang)}
              icon={<MapPin className="h-4 w-4 text-gray-500" />}
            />
          </Section>
          {(journeyData.tripPriceUSD || journeyData.tripPrice) && (
            <>
              <Separator className="my-4" />
              <div className="flex items-center">
                <InfoItem
                  label={t(
                    `${pathToJourneyDetailsTranslation}.journeyMetrics.price`
                  )}
                  value={totalPrice}
                />
                <UpdatePriceDialog journey={journeyData} />
              </div>
              {journeyData.pricingSegments?.journeyPricing?.price && (
                <InfoItem
                  label={t(`Journey pricing`)}
                  value={`${journeyData.pricingSegments?.journeyPricing?.price} ${journeyData.pricingSegments?.journeyPricing?.currency}`}
                />
              )}
              {journeyData.pricingSegments?.dispatcherDynamicPricing?.price && (
                <InfoItem
                  label={t(`Dispatcher dynamic pricing`)}
                  value={`${journeyData.pricingSegments?.dispatcherDynamicPricing?.price} ${journeyData.pricingSegments?.dispatcherDynamicPricing?.currency}`}
                />
              )}
              {journeyData.pricingSegments?.effectedRulePricing &&
                journeyData.pricingSegments.effectedRulePricing.length > 0 &&
                journeyData.pricingSegments.effectedRulePricing.filter(
                  (item) =>
                    item.effectingPrice &&
                    Object.keys(item.effectingPrice).length > 0
                ).length > 0 && (
                  <div className="flex flex-col gap-2">
                    <h6 className=" font-bold mb-6">Effected rule pricing</h6>
                    {journeyData.pricingSegments.effectedRulePricing
                      .filter(
                        (item) =>
                          item.effectingPrice &&
                          Object.keys(item.effectingPrice).length > 0
                      )
                      .map((item) => (
                        <InfoItem
                          key={item.id}
                          label={`${item.name}:`}
                          value={`${item.price} ${item.currency}`}
                        />
                      ))}
                  </div>
                )}
              {journeyData.pricingSegments?.additionalServicesPricing?.length &&
                journeyData.pricingSegments?.additionalServicesPricing?.length >
                  0 && (
                  <div className="flex flex-col gap-2">
                    <h6 className=" font-bold mt-2">
                      Additional services pricing
                    </h6>
                    <div className="flex flex-col pl-2">
                      {journeyData.pricingSegments?.additionalServicesPricing?.map(
                        (item) => (
                          <InfoItem
                            label={`${item.name}:`}
                            value={`${item.quantity} x ${item.priceForEach} ${item.currency}`}
                          />
                        )
                      )}
                    </div>
                  </div>
                )}
            </>
          )}
          <Separator className="my-4" />
        </div>

        <div className="space-y-4 px-6">
          {waypoints.length > 0 && (
            <>
              <Section
                title={t(
                  `${pathToJourneyDetailsTranslation}.additionalStops.title`
                )}
              >
                <ul className="space-y-2">
                  {waypoints.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="">{parseLocationName(item)}</span>
                    </li>
                  ))}
                </ul>
              </Section>
              <Separator className="my-4" />
            </>
          )}

          {journeyData.metadata.journeyMetrics && (
            <>
              <Section
                title={t(
                  `${pathToJourneyDetailsTranslation}.journeyMetrics.title`
                )}
              >
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <InfoItem
                      label={t(
                        `${pathToJourneyDetailsTranslation}.journeyMetrics.totalJourneyTime`
                      )}
                      value={
                        journeyData.metadata.journeyMetrics.totalTimeFormatted
                      }
                    />
                  </li>
                  <li>
                    <InfoItem
                      label={t(
                        `${pathToJourneyDetailsTranslation}.journeyMetrics.rideToJourneyTime`
                      )}
                      value={`${journeyData.metadata.journeyMetrics.journeyTotalRouteKm} Km`}
                    />
                  </li>
                  {/* <li>
                    {' '}
                    <InfoItem
                      label={t(
                        `${pathToJourneyDetailsTranslation}.journeyMetrics.price`
                      )}
                      value={`$${journeyData.tripPriceUSD}`}
                    />
                  </li> */}
                </ul>
              </Section>
              <Separator className="my-6 sm:my-8" />
            </>
          )}

          {journeyData.metadata?.additionalServices?.length > 0 && (
            <>
              <Section
                title={t(
                  `${pathToJourneyDetailsTranslation}.additionalServices.title`
                )}
              >
                <ul className="space-y-2">
                  {journeyData.metadata?.additionalServices?.map((service) => (
                    <li
                      key={service.name}
                      className="flex justify-between items-center"
                    >
                      <span>{capitalize(service.name)}</span>
                      <Badge variant="secondary">x{service.quantity}</Badge>
                    </li>
                  ))}
                </ul>
              </Section>
              <Separator className="my-4" />
            </>
          )}
        </div>
        {journeyData.metadata.message && (
          <div className="px-6">
            <Section
              title={t(`${pathToJourneyDetailsTranslation}.message.title`)}
            >
              <Card className="bg-gray-100 text-gray-800 p-4 rounded-lg">
                <p className="italic">{journeyData.metadata.message}</p>
              </Card>
            </Section>
          </div>
        )}
      </div>
    </Card>
  );
};
