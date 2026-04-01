import { TJourney } from '@/models/journey';
import { Tabs, TabsList, TabsTrigger } from '@ryed/ui/ui/Tabs';
import { FC, useState, useCallback, useMemo } from 'react';
import { TabsContent } from '@ryed/ui/ui/Tabs';
import { useNavigate } from 'react-router-dom';
import { PersonCard } from '../PersonalCard/PersonalCard';
import { Card, CardTitle, CardHeader, CardContent } from '@ryed/ui/ui/Card';
import { InfoItem } from '../InfoItem/InfoItem';
import { journeyStatusToReadable } from '@/utils/journey-status-to-readable/journey-status-to-readable';
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from '@ryed/ui/ui/Table';
import { PlaneLanding, PlaneTakeoff } from 'lucide-react';
import { valueOrNa } from '@/utils/value-or-na/value-or-na';
import { formatDate } from '@ryed-ui/utils/format-date';
import { ImageCarousel } from '@/components/ImageCarousel/ImageCarousel';
import { useTranslation } from 'react-i18next';
import { ImageModal } from '@/components/ImageModal/ImageModal';
import { NotificationsTable } from './components/NotificationsTable/NotificationsTable';
import { Notification } from '@/models/notification';
import { Button } from '@ryed/ui';

const pathToTabsTranslation = 'journeys:journey.tabs';

export const JourneyTabs: FC<{
  journeyData: TJourney;
  notifications: Notification[];
  isLoadingNotifications: boolean;
}> = ({ journeyData, notifications, isLoadingNotifications }) => {
  console.log('journeyData', journeyData.journeyPayment);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const _flightDetails = journeyData.scheduledJourney?.fullFlightInformation;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const handleImageClick = useCallback((imageUrl: string) => {
    setSelectedImage(imageUrl);
  }, []);
  const closeModal = useCallback(() => {
    setSelectedImage(null);
  }, []);
  const userInformation = useMemo(() => {
    const metadataUser = journeyData.metadata.userInformation;
    if (metadataUser) {
      return {
        firstName: metadataUser.firstName,
        lastName: metadataUser.lastName,
        phoneNumber: metadataUser.phoneNumber,
        profilePictureURL: undefined,
      };
    }
    return {
      firstName: journeyData.user?.firstName,
      lastName: journeyData.user?.lastName,
      phoneNumber: journeyData.user?.phoneNumber,
      profilePictureURL: journeyData.user?.profilePictureURL,
    };
  }, [journeyData.metadata.userInformation, journeyData.user]);

  return (
    <>
      <ImageModal
        isOpen={!!selectedImage}
        imageUrl={selectedImage}
        onClose={closeModal}
      />
      <Tabs defaultValue="people" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="people">
            {t(`${pathToTabsTranslation}.tabLabels.people`)}
          </TabsTrigger>
          <TabsTrigger value="vehicle">
            {t(`${pathToTabsTranslation}.tabLabels.vehicle`)}
          </TabsTrigger>
          <TabsTrigger value="flightInfo">
            {t(`${pathToTabsTranslation}.tabLabels.flightInfo`)}
          </TabsTrigger>
          <TabsTrigger value="timeline">
            {t(`${pathToTabsTranslation}.tabLabels.timeline`)}
          </TabsTrigger>
          <TabsTrigger value="notifications">
            {t(`${pathToTabsTranslation}.tabLabels.notifications`)}
          </TabsTrigger>
          <TabsTrigger value="payment">
            {t(`${pathToTabsTranslation}.tabLabels.payment`)}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="people">
          <div className="grid md:grid-cols-3 gap-6">
            <PersonCard
              title={t(`${pathToTabsTranslation}.peopleTab.userInfoCard.title`)}
              name={`${userInformation?.firstName} ${userInformation?.lastName}`}
              phone={userInformation?.phoneNumber || ''}
              avatar={userInformation?.profilePictureURL}
            />
            {journeyData.metadata.orderrerInformation &&
            journeyData.metadata.orderrerInformation.displayInfo.name ? (
              <PersonCard
                title={t(
                  `${pathToTabsTranslation}.peopleTab.ordererInfoCard.title`
                )}
                name={journeyData.metadata.orderrerInformation.displayInfo.name}
                phone={
                  journeyData.metadata.orderrerInformation.displayInfo
                    .phoneNumber
                }
                company={
                  journeyData.metadata.orderrerInformation.displayInfo
                    ?.companyName
                }
                avatar={
                  journeyData.metadata.orderrerInformation.displayInfo.logoUrl
                }
                type={journeyData.metadata.orderrerInformation.displayInfo.type}
              />
            ) : null}
            {journeyData.vehicleDriver ? (
              <PersonCard
                title={t(
                  `${pathToTabsTranslation}.peopleTab.driverInfoCard.title`
                )}
                name={`${journeyData.vehicleDriver?.firstName} ${journeyData.vehicleDriver?.lastName}`}
                phone={journeyData.vehicleDriver?.phoneNumber || ''}
                avatar={journeyData.vehicleDriver?.profileImageUrl}
                onClick={() => {
                  if (journeyData.vehicleDriver?.id) {
                    navigate(`/drivers/${journeyData.vehicleDriver?.id}`);
                  }
                }}
              />
            ) : (
              <Card className="p-4 flex flex-col justify-center items-center">
                <p className="text-gray-500">
                  {t(
                    `${pathToTabsTranslation}.peopleTab.driverInfoCard.noAssigned`
                  )}
                </p>
              </Card>
            )}
          </div>
        </TabsContent>
        <TabsContent value="vehicle">
          {journeyData.vehicle ? (
            <Card className="p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {journeyData.vehicle?.galleryImages ? (
                  <div className="flex justify-center items-center ">
                    <div className="w-4/5 flex justify-center items-center">
                      <ImageCarousel
                        items={Object.keys(
                          journeyData.vehicle?.galleryImages || {}
                        )
                          .map((key) => ({
                            labelText: key,
                            imageUrl:
                              journeyData.vehicle?.galleryImages[key] || '',
                          }))
                          .filter((item) => item.imageUrl)}
                        onItemSelect={(item) => handleImageClick(item.imageUrl)}
                      />
                    </div>
                  </div>
                ) : null}
                <Card className="p-4">
                  <h3 className="text-xl font-bold mb-4">
                    {t(`${pathToTabsTranslation}.vehicleTab.title`)}
                  </h3>
                  <div
                    className="space-y-3 cursor-pointer"
                    onClick={() => {
                      if (journeyData.vehicle?.id) {
                        navigate(`/vehicles/${journeyData.vehicle?.id}`);
                      }
                    }}
                  >
                    <InfoItem
                      label={t(`${pathToTabsTranslation}.vehicleTab.make`)}
                      value={journeyData.vehicle?.make}
                    />
                    <InfoItem
                      label={t(`${pathToTabsTranslation}.vehicleTab.model`)}
                      value={journeyData.vehicle?.model}
                    />
                    <InfoItem
                      label={t(`${pathToTabsTranslation}.vehicleTab.year`)}
                      value={journeyData.vehicle?.year.toString()}
                    />
                    <InfoItem
                      label={t(`${pathToTabsTranslation}.vehicleTab.color`)}
                      value={journeyData.vehicle?.color}
                    />
                    <InfoItem
                      label={t(
                        `${pathToTabsTranslation}.vehicleTab.registrationNumber`
                      )}
                      value={journeyData.vehicle?.registeredNumber}
                    />
                    <InfoItem
                      label={t(
                        `${pathToTabsTranslation}.vehicleTab.numberOfSeats`
                      )}
                      value={journeyData.vehicle?.numberOfSits.toString()}
                    />
                  </div>
                </Card>
              </div>
            </Card>
          ) : (
            <Card className="p-6 flex justify-center items-center">
              <p className="text-gray-500">
                {t(`${pathToTabsTranslation}.vehicleTab.noInformation`)}
              </p>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="timeline">
          <Card className="p-4 sm:p-6">
            <h3 className="text-xl font-bold mb-4">Events Timeline</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {journeyData.events?.map((event, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {event.label || journeyStatusToReadable(event.status)}
                      </TableCell>
                      <TableCell>
                        {formatDate(new Date(event.timestamp))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="flightInfo">
          {_flightDetails ? (
            <Card className="p-4 sm:p-6">
              <div className="flex items-center  justify-between mb-4">
                <h3 className="text-xl font-bold ">
                  {t(`${pathToTabsTranslation}.flightInfoTab.title`)}
                </h3>
                {_flightDetails?.isMonitoring && (
                  <div className="flex items-center">
                    <span className="text-sm flex cursor-default">
                      Monitoring
                    </span>
                    <div
                      className="ml-4 w-4 h-4 rounded-full animate-pulse bg-green-500"
                      title="Tracking flight"
                    />
                  </div>
                )}
              </div>

              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 p-0">
                <>
                  <Card className="px-4">
                    <CardHeader className="flex-1 px-0">
                      <CardTitle className="flex items-center gap-2 text-md">
                        <span className="flex items-center gap-2">
                          {t(
                            `${pathToTabsTranslation}.flightInfoTab.departureCard.title`
                          )}
                          <PlaneTakeoff className="h-5 w-5" />
                        </span>
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="pt-4 px-0 space-y-4">
                      <div className="w-full">
                        <div className="font-bold mb-1">
                          {t(
                            `${pathToTabsTranslation}.flightInfoTab.departureCard.airline`
                          )}
                        </div>
                        <span className="text-sm">
                          {valueOrNa(_flightDetails?.airline?.name)}
                        </span>
                      </div>

                      <div className="w-full">
                        <div className="font-bold mb-1">
                          {t(
                            `${pathToTabsTranslation}.flightInfoTab.departureCard.airport`
                          )}
                        </div>
                        <span className="text-sm">
                          {valueOrNa(_flightDetails?.departure.airport)}
                        </span>
                      </div>

                      {_flightDetails?.departure.terminal && (
                        <div className="w-full">
                          <div className="font-bold mb-1">
                            {t(
                              `${pathToTabsTranslation}.flightInfoTab.departureCard.terminal`
                            )}
                          </div>
                          <span className="text-sm">
                            {_flightDetails.departure.terminal}
                          </span>
                        </div>
                      )}

                      {_flightDetails.isMonitoring && (
                        <div className="w-full">
                          <div className="font-bold mb-1">
                            {t(
                              `${pathToTabsTranslation}.flightInfoTab.departureCard.scheduled`
                            )}
                            ({_flightDetails.departure.timezone})
                          </div>
                          <span className="text-sm">
                            {_flightDetails.departure.scheduled
                              ? formatDate(
                                  new Date(_flightDetails.departure.scheduled),
                                  {
                                    useExistingTimezone: true,
                                  }
                                )
                              : 'N/A'}
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="px-4">
                    <CardHeader className="flex-1 px-0">
                      <CardTitle className="flex items-center gap-2 text-md">
                        <span className="flex items-center gap-2">
                          {t(
                            `${pathToTabsTranslation}.flightInfoTab.arrivalCard.title`
                          )}
                          <PlaneLanding className="h-5 w-5" />
                        </span>
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="pt-4 px-0 space-y-4">
                      <div className="w-full">
                        <div className="font-bold mb-1">
                          {t(
                            `${pathToTabsTranslation}.flightInfoTab.arrivalCard.airport`
                          )}
                        </div>
                        <span className="text-sm">
                          {valueOrNa(_flightDetails.arrival.airport)}
                        </span>
                      </div>

                      {_flightDetails.arrival.terminal && (
                        <div className="w-full">
                          <div className="font-bold mb-1">
                            {t(
                              `${pathToTabsTranslation}.flightInfoTab.arrivalCard.terminal`
                            )}
                          </div>
                          <span className="text-sm">
                            {_flightDetails.arrival.terminal}
                          </span>
                        </div>
                      )}

                      {_flightDetails.isMonitoring && (
                        <div className="w-full">
                          <div className="font-bold mb-1">
                            <span className="cursor-pointer">
                              {t(
                                `${pathToTabsTranslation}.flightInfoTab.arrivalCard.scheduled`
                              )}
                              ({_flightDetails.arrival.timezone})
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className="text-sm cursor-pointer hover:text-primary transition-colors"
                              title="Click to override flight arrival time"
                              onClick={() => {}}
                            >
                              {_flightDetails.arrival.scheduled
                                ? formatDate(_flightDetails.arrival.scheduled, {
                                    useExistingTimezone: true,
                                  })
                                : 'N/A'}
                            </span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </>
              </CardContent>
            </Card>
          ) : (
            <Card className="p-6 flex justify-center items-center">
              <p className="text-gray-500">
                {t(`${pathToTabsTranslation}.flightInfoTab.noInformation`)}
              </p>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="notifications">
          {notifications ? (
            <Card className="p-2">
              <NotificationsTable
                data={notifications}
                isLoading={isLoadingNotifications}
              />
            </Card>
          ) : (
            <Card className="p-6 flex justify-center items-center">
              <p className="text-gray-500">
                {t(`journeys:notificationsTable.noInformation`)}
              </p>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="payment">
          <Card className="p-6 flex justify-center items-center">
            {journeyData.journeyPayment ? (
              <CardContent className="w-full flex flex-col lg:flex-row">
                <div className="w-full flex flex-col gap-1 items-start">
                  <div className="flex items-center gap-2">
                    <p className="font-bold">Payer name:</p>
                    <span>
                      {journeyData.journeyPayment.paymentDetails.payer.name ||
                        'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold">Payer phone:</p>
                    <span>
                      {journeyData.journeyPayment.paymentDetails.payer.phone ||
                        'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold">Payment Provider:</p>
                    <span>{journeyData.journeyPayment.provider || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold">Total:</p>
                    <span>
                      {journeyData.journeyPayment.paymentDetails.transactions[0]
                        .total || 'N/A'}{' '}
                      {journeyData.journeyPayment.paymentDetails.transactions[0]
                        .currency || 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold">Payment method:</p>
                    <span>
                      {journeyData.journeyPayment.paymentDetails.transactions[0]
                        .paymentMethod.type || 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold">Payment card number:</p>
                    <span>
                      {journeyData.journeyPayment.paymentDetails.transactions[0]
                        .paymentMethod.cardNumber || 'N/A'}
                    </span>
                  </div>
                </div>
                <div className="flex">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      if (journeyData.journeyPayment?.invoiceUrl) {
                        window.open(
                          journeyData.journeyPayment?.invoiceUrl,
                          '_blank'
                        );
                      }
                    }}
                  >
                    <p>Download receipt</p>
                  </Button>
                </div>
              </CardContent>
            ) : (
              <p className="text-gray-500">
                {t(`${pathToTabsTranslation}.paymentTab.noInformation`)}
              </p>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};
