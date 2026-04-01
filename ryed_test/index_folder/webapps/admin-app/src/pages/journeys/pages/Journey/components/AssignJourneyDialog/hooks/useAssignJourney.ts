import { useGetDispatcherQuery } from '@/api/dispatchersEndpoints';
import { useGetDriversQuery } from '@/api/driversEndpoints';
import {
  useAssignDispatcherToJourneyMutation,
  useAssignDriverToJourneyMutation,
  useGetPriceMutation,
  useReassignDriverToJourneyMutation,
} from '@/api/journeysEndpoints';
import { useGetVehicleByDispatcherIdQuery } from '@/api/vehicleEndpoints';
import { useGetTravelAgencyQuery } from '@/api/travelAgenciesEndpoints';
import { TJourney } from '@/models/journey';
import { useEffect, useMemo, useState } from 'react';
import { getCurrencyCodeFromCountry } from '@/utils/getCurrencyCodeFromCountry/getCurrencyCodeFromCountry';
import { useGetExchangeRateQuery } from '@/api/exchangeEndpoints';
import { defaultCurrencyCodeOptions } from '../consts';
import { toast } from 'sonner';

export const useAssignJourney = (journeyData: TJourney) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedDispatcher, setSelectedDispatcher] = useState<string | null>(
    null
  );
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState<
    string | null
  >(null);
  const [price, setPrice] = useState<number | null>(null);

  const [
    assignJourney,
    { isLoading: isAssigningJourney, error: assignJourneyError },
  ] = useAssignDispatcherToJourneyMutation();
  const [
    assignDriverToJourney,
    { isLoading: isAssigningDriver, error: assignDriverToJourneyError },
  ] = useAssignDriverToJourneyMutation();
  const [
    reassignDriverToJourney,
    { isLoading: isReassigningDriver, error: reassignDriverToJourneyError },
  ] = useReassignDriverToJourneyMutation();

  const [getPriceAPI] = useGetPriceMutation();
  const { data: dispatchers, error: dispatchersError } = useGetDispatcherQuery(
    undefined,
    {
      skip: !openModal,
    }
  );
  const { data: drivers, error: driversError } = useGetDriversQuery(
    {
      dispatcherId: selectedDispatcher ?? undefined,
    },
    {
      skip: !openModal || !selectedDispatcher,
    }
  );
  const { data: vehicles, error: vehiclesError } =
    useGetVehicleByDispatcherIdQuery(selectedDispatcher ?? '', {
      skip: !openModal || !selectedDispatcher,
    });

  const travelAgencyId =
    journeyData?.travelAgencyId ||
    journeyData?.travelAgencyAgent?.travelAgency?.id ||
    journeyData?.travelAgency?.id;

  const { data: travelAgency, error: travelAgencyError } =
    useGetTravelAgencyQuery(travelAgencyId ?? '', {
      skip: !travelAgencyId || !openModal,
    });

  useEffect(() => {
    if (assignJourneyError) {
      console.log('assignJourneyError', assignJourneyError);
      toast.error(assignJourneyError.message ?? 'Error assigning dispatcher');
    }
    if (assignDriverToJourneyError) {
      toast.error(
        assignDriverToJourneyError.message ?? 'Error assigning driver'
      );
    }
    if (reassignDriverToJourneyError) {
      toast.error(
        reassignDriverToJourneyError.message ?? 'Error reassigning driver'
      );
    }
    if (dispatchersError) {
      toast.error(dispatchersError.message ?? 'Error fetching dispatchers');
    }
    if (driversError) {
      toast.error(driversError.message ?? 'Error fetching drivers');
    }
    if (vehiclesError) {
      toast.error(vehiclesError.message ?? 'Error fetching vehicles');
    }
    if (travelAgencyError) {
      toast.error(travelAgencyError.message ?? 'Error fetching travel agency');
    }
  }, [
    assignJourneyError,
    assignDriverToJourneyError,
    reassignDriverToJourneyError,
    dispatchersError,
    driversError,
    vehiclesError,
    travelAgencyError
  ]);

  const [recommendedPrice, setRecommendedPrice] = useState<number>(0);

  useEffect(() => {
    if (journeyData?.currency && !selectedCurrencyCode) {
      setSelectedCurrencyCode(journeyData.currency);
    }
  }, [journeyData?.currency, selectedCurrencyCode]);

  useEffect(() => {
    if (journeyData?.dispatcherId && !selectedDispatcher) {
      setSelectedDispatcher(journeyData.dispatcherId);
    }
    if (journeyData?.vehicleDriverId && !selectedDriver) {
      setSelectedDriver(journeyData.vehicleDriverId);
    }
    if (journeyData?.vehicleId && !selectedVehicle) {
      setSelectedVehicle(journeyData.vehicleId);
    }
    if (journeyData?.currency && !selectedCurrencyCode) {
      setSelectedCurrencyCode(journeyData.currency);
    }
  }, [
    journeyData?.dispatcherId,
    selectedDispatcher,
    journeyData?.vehicleDriverId,
    selectedDriver,
    journeyData?.vehicleId,
    selectedVehicle,
    journeyData?.currency,
    selectedCurrencyCode,
    assignJourney,
  ]);

  useEffect(() => {
    if (
      travelAgency?.dispatcherOrderrerExclusivity &&
      !selectedDispatcher &&
      !journeyData?.dispatcherId
    ) {
      const exclusiveDispatcherId =
        travelAgency.dispatcherOrderrerExclusivity.dispatcherId;
      setSelectedDispatcher(exclusiveDispatcherId);
    }
  }, [travelAgency, selectedDispatcher, journeyData?.dispatcherId]);

  useEffect(() => {
    if (journeyData?.tripPrice && !price) {
      setPrice(
        selectedCurrencyCode === 'USD'
          ? Number(journeyData.tripPriceUSD?.toFixed(2))
          : Number(journeyData.tripPrice?.toFixed(2))
      );
    } else if (recommendedPrice && !price && !journeyData.tripPriceUSD) {
      setPrice(recommendedPrice);
    }
  }, [
    journeyData?.tripPrice,
    journeyData?.tripPriceUSD,
    price,
    selectedCurrencyCode,
    recommendedPrice,
  ]);

  const currencyOptions = useMemo(() => {
    const currencyCode = getCurrencyCodeFromCountry(
      journeyData?.fromLatLang?.country ?? ''
    );
    return currencyCode === 'USD'
      ? defaultCurrencyCodeOptions
      : [
          ...defaultCurrencyCodeOptions,
          { value: currencyCode, label: currencyCode, available: true },
        ];
  }, [
    defaultCurrencyCodeOptions,
    journeyData?.fromLatLang?.country,
    selectedCurrencyCode,
  ]);

  const { data: exchangeRate } = useGetExchangeRateQuery(
    {
      from: selectedCurrencyCode ?? 'USD',
      to: 'USD',
    },
    {
      skip: !selectedCurrencyCode || selectedCurrencyCode === 'USD',
    }
  );

  const localCurrencyToUsd = useMemo(() => {
    const isShouldNotConvert = [
      !exchangeRate,
      !price,
      !selectedCurrencyCode,
      selectedCurrencyCode === 'USD',
    ].some((item) => item);

    if (isShouldNotConvert) return null;

    return Number(exchangeRate!.rate * Number(price)).toFixed(2);
  }, [exchangeRate, price, selectedCurrencyCode]);

  useEffect(() => {
    if (
      journeyData?.fromLatLang &&
      journeyData?.toLatLang &&
      journeyData?.vehicle &&
      selectedDispatcher
    ) {
      const carType = vehicles?.find(
        (vehicle) => vehicle.id === selectedVehicle
      )?.type;
      const from = {
        latitude: journeyData.fromLatLang.latitude,
        longitude: journeyData.fromLatLang.longitude,
        country: journeyData.fromLatLang.country,
      };
      const to = {
        latitude: journeyData.toLatLang.latitude,
        longitude: journeyData.toLatLang.longitude,
        country: journeyData.toLatLang.country,
      };
      const data = {
        fromLocation: from,
        toDestination: to,
        carType: carType ?? journeyData.vehicle.type,
        additionalStops:
          journeyData?.metadata.routeDetails?.stops?.map((item) => ({
            latitude: item.latitude,
            longitude: item.longitude,
            country: item.country,
          })) || [],
        pickupTime: journeyData?.scheduledJourney?.pickupTime || '',
        passengersAmount: journeyData?.metadata?.passengerCount,
      };
      getPriceAPI({ data, dispatcherId: selectedDispatcher })
        .unwrap()
        .then((response) => {
          setRecommendedPrice(response.totalSum);

          setPrice(response.totalSum);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [
    getPriceAPI,
    journeyData?.fromLatLang,
    journeyData?.toLatLang,
    journeyData?.vehicle,
    selectedDispatcher,
  ]);

  const handleAssignDispatcher = () => {
    if (selectedDispatcher) {
      assignJourney({
        journeyId: journeyData.id,
        dispatcherId: selectedDispatcher,
      });
    }
  };

  const handleAssignJourney = () => {
    if (journeyData.vehicleDriverId && selectedDriver && selectedVehicle) {
      reassignDriverToJourney({
        journeyId: journeyData.id,
        vehicleDriverId: selectedDriver,
        vehicleId: selectedVehicle,
        price: price ?? 0,
        currencyCode: selectedCurrencyCode ?? 'USD',
      });
    }
    if (selectedDispatcher && selectedDriver && selectedVehicle) {
      assignDriverToJourney({
        journeyId: journeyData.id,
        vehicleDriverId: selectedDriver,
        vehicleId: selectedVehicle,
        price: price ?? 0,
        currencyCode: selectedCurrencyCode ?? 'USD',
      });
    }
  };

  return {
    data: {
      openModal,
      dispatchers,
      drivers,
      vehicles,
      selectedDispatcher,
      selectedCurrencyCode,
      price,
      recommendedPrice,
      localCurrencyToUsd,
      selectedDriver,
      selectedVehicle,
      currencyOptions,
      isAssigningJourney,
      isAssigningDriver,
      isReassigningDriver,
    },
    handlers: {
      setOpenModal,
      setSelectedDispatcher,
      setPrice,
      setSelectedCurrencyCode,
      setSelectedDriver,
      setSelectedVehicle,
      handleAssignJourney,
      handleAssignDispatcher,
    },
  };
};
