import { useEffect, useMemo, useState } from 'react';
import { Region, regionPricingDTO } from '@/models/regions';
import { VehicleType } from '@/models/vehicle/vehicle';
import {
  useDeleteRegionPricingMutation,
  useUpdateRegionPricingMutation,
} from '@/api/regionsEndpoints';
import { useSetRegionPricingMutation } from '@/api/regionsEndpoints';
import { toast } from 'sonner';

export const usePricesTable = (
  allRegions: Region[],
  selectedRegions: Region[],
  countryCurrency: string,
  refetchAllRegions?: () => void
) => {
  const [priceInputs, setPriceInputs] = useState<{
    [fromToVehicleKey: string]: number | '';
  }>({});

  const [initialPriceInputs, setInitialPriceInputs] = useState<{
    [fromToVehicleKey: string]: number | '';
  }>({});

  const [existingPricingIds, setExistingPricingIds] = useState<{
    [fromToVehicleKey: string]: string;
  }>({});

  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  const [setRegionPricing] = useSetRegionPricingMutation();
  const [updateRegionPricing] = useUpdateRegionPricingMutation();
  const [deleteRegionPricing] = useDeleteRegionPricingMutation();

  const regionPairs = useMemo(() => {
    if (selectedRegions.length === 0) return [];

    const pairs = [];

    const fromRegion = selectedRegions[0];

    const internalExistingPricings =
      fromRegion.fromSupportedRegionsPricing?.filter(
        (pricing) => pricing.toSupportedRegionId === fromRegion.id
      ) || [];

    pairs.push({
      fromRegion,
      toRegion: fromRegion,
      existingPricings: internalExistingPricings.map((pricing) => ({
        id: pricing.id,
        priceLocal: pricing.priceLocal,
        vehicleType: pricing.vehicleType || VehicleType.SEDAN,
      })),
    });

    for (const toRegion of allRegions) {
      if (toRegion.id === fromRegion.id) continue;

      const existingPricings =
        fromRegion.fromSupportedRegionsPricing?.filter(
          (pricing) => pricing.toSupportedRegionId === toRegion.id
        ) || [];

      pairs.push({
        fromRegion,
        toRegion,
        existingPricings: existingPricings.map((pricing) => ({
          id: pricing.id,
          priceLocal: pricing.priceLocal,
          vehicleType: pricing.vehicleType || VehicleType.SEDAN,
        })),
      });
    }

    return pairs;
  }, [selectedRegions, allRegions]);

  useEffect(() => {
    if (regionPairs.length === 0) {
      setActiveTab(null);
    } else if (selectedRegions.length === 2) {
      const tabValue = `${selectedRegions[0].id}_${selectedRegions[1].id}`;
      setActiveTab(tabValue);
    } else {
      setActiveTab(
        `${regionPairs[0].fromRegion.id}_${regionPairs[0].toRegion.id}`
      );
    }
  }, [regionPairs, selectedRegions]);

  useEffect(() => {
    const dataReady = regionPairs.every(
      ({ fromRegion }) => fromRegion.fromSupportedRegionsPricing !== undefined
    );

    if (dataReady && !dataLoaded) {
      const newPriceInputs: { [fromToVehicleKey: string]: number | '' } = {};
      const newInitialPriceInputs: { [fromToVehicleKey: string]: number | '' } =
        {};
      const newExistingPricingIds: { [fromToVehicleKey: string]: string } = {};

      regionPairs.forEach(({ fromRegion, toRegion, existingPricings }) => {
        const vehicleTypes = Object.values(VehicleType);
        vehicleTypes.forEach((vehicleType) => {
          const fromToVehicleKey = `${fromRegion.id}_${toRegion.id}_${vehicleType}`;

          const existingPricing = existingPricings.find(
            (p) => p.vehicleType === vehicleType
          );

          if (existingPricing) {
            newPriceInputs[fromToVehicleKey] = existingPricing.priceLocal;
            newInitialPriceInputs[fromToVehicleKey] =
              existingPricing.priceLocal;
            newExistingPricingIds[fromToVehicleKey] = existingPricing.id;
          } else {
            newPriceInputs[fromToVehicleKey] = '';
            newInitialPriceInputs[fromToVehicleKey] = '';
          }
        });
      });

      setPriceInputs(newPriceInputs);
      setInitialPriceInputs(newInitialPriceInputs);
      setExistingPricingIds(newExistingPricingIds);
      setDataLoaded(true);
    }
  }, [regionPairs, dataLoaded]);

  useEffect(() => {
    setDataLoaded(false);
    setInitialPriceInputs({});
  }, [selectedRegions]);

  const handlePriceChange = (
    fromRegionId: string,
    toRegionId: string,
    vehicleType: string,
    price: number
  ) => {
    const fromToVehicleKey = `${fromRegionId}_${toRegionId}_${vehicleType}`;
    setPriceInputs((prev) => ({ ...prev, [fromToVehicleKey]: price }));
  };

  const submitPrices = async (fromRegionId: string, toRegionId: string) => {
    const vehicleTypes = Object.values(VehicleType);

    const newPricings: regionPricingDTO[] = [];
    const updatedPricings: {
      priceLocal: number;
      id: string;
      currency: string;
    }[] = [];
    const deletedPricingIds: string[] = [];
    const deletedPricingKeys: string[] = [];

    for (const vehicleType of vehicleTypes) {
      const fromToVehicleKey = `${fromRegionId}_${toRegionId}_${vehicleType}`;
      const priceLocal = priceInputs[fromToVehicleKey];
      const initialPriceLocal = initialPriceInputs[fromToVehicleKey];
      const existingPricingId = existingPricingIds[fromToVehicleKey];

      // Skip if price hasn't changed
      if (priceLocal === initialPriceLocal) {
        continue;
      }

      // Check if priceLocal is a valid number (including 0)
      // priceLocal can be number (including 0) or empty string ''
      if (
        priceLocal !== undefined &&
        priceLocal !== '' &&
        priceLocal !== null
      ) {
        if (existingPricingId) {
          // If price is set to 0, delete the pricing
          if (priceLocal === 0) {
            deletedPricingIds.push(existingPricingId);
            deletedPricingKeys.push(fromToVehicleKey);
          } else {
            // Update existing pricing if price is not 0
            updatedPricings.push({
              id: existingPricingId,
              priceLocal: priceLocal as number,
              currency: countryCurrency,
            });
          }
        } else {
          // Create new pricing only if price is not 0
          if (priceLocal !== 0) {
            newPricings.push({
              fromSupportedRegionId: fromRegionId,
              toSupportedRegionId: toRegionId,
              priceLocal: priceLocal as number,
              currency: countryCurrency,
              vehicleType,
            });
          }
        }
      } else if (existingPricingId && initialPriceLocal !== '') {
        // If price was cleared and there was an existing pricing, delete it
        deletedPricingIds.push(existingPricingId);
        deletedPricingKeys.push(fromToVehicleKey);
      }
    }

    try {
      if (newPricings.length > 0) {
        await setRegionPricing({
          fromSupportedRegionId: fromRegionId,
          data: { supportedRegionPricings: newPricings },
        }).unwrap();
      }

      if (updatedPricings.length > 0) {
        for (const pricing of updatedPricings) {
          await updateRegionPricing({
            pricingId: pricing.id,
            data: { supportedRegionPricings: [pricing] },
          }).unwrap();
        }
      }

      if (deletedPricingIds.length > 0) {
        for (const pricingId of deletedPricingIds) {
          await deleteRegionPricing({ pricingId }).unwrap();
        }
      }

      // Update initialPriceInputs and existingPricingIds to match current values after successful save
      setInitialPriceInputs((prev) => {
        const updated = { ...prev };
        for (const vehicleType of vehicleTypes) {
          const fromToVehicleKey = `${fromRegionId}_${toRegionId}_${vehicleType}`;
          updated[fromToVehicleKey] = priceInputs[fromToVehicleKey];
        }
        return updated;
      });

      // Clear existingPricingIds for deleted pricings
      setExistingPricingIds((prev) => {
        const updated = { ...prev };
        // Remove IDs for deleted pricings
        deletedPricingKeys.forEach((key) => {
          delete updated[key];
        });
        // Note: For newly created pricings, we can't update the ID here because
        // the API response doesn't return the created pricing IDs.
        // The IDs will be updated when data is reloaded via invalidatesTags.
        return updated;
      });

      // Refetch regions data to update the table after changes
      if (refetchAllRegions) {
        await refetchAllRegions();
        // Reset dataLoaded to trigger data reload
        setDataLoaded(false);
      }

      toast.success('Prices saved successfully.');
    } catch (error) {
      toast.error('Error submitting prices.');
      console.error('Error submitting prices:', error);
    }
  };

  return {
    data: {
      priceInputs,
      regionPairs,
      activeTab,
    },
    handlers: {
      setActiveTab,
      handlePriceChange,
      submitPrices,
    },
  };
};
