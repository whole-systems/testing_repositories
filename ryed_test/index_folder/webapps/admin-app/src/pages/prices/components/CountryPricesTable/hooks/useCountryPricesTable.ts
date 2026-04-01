import { useEffect, useState } from 'react';
import { VehicleType } from '@/models/vehicle/vehicle';
import {
  useGetCountryPricingQuery,
  useSetCountryPricingMutation,
  useUpdateCountryPricingMutation,
} from '@/api/regionsEndpoints';
import { toast } from 'sonner';
import { SupportedCountryPricing } from '@/models/regions';

type PriceInput = {
  pricePerMinute: number;
  pricePerKilometer: number;
  basePrice: number;
  halfDayPrice: number;
  fullDayPrice: number;
  pricingId?: string;
};

interface NewPricing {
  supportedCountryId: string;
  vehicleType: VehicleType;
  tripPricePerKm: number;
  tripPricePerMinute: number;
  tripBasePrice: number;
  tripHalfDayPrice: number;
  tripFullDayPrice: number;
}

export const useCountryPricesTable = (countryId: string) => {
  const { data: countryPricingData, isLoading } =
    useGetCountryPricingQuery(countryId);

  const [setCountryPricing] = useSetCountryPricingMutation();
  const [updateCountryPricing] = useUpdateCountryPricingMutation();

  // State to keep track of current inputs
  const [priceInputs, setPriceInputs] = useState<
    Partial<Record<VehicleType, PriceInput>>
  >({});

  // State to keep track of initial inputs for comparison
  const [initialPriceInputs, setInitialPriceInputs] = useState<
    Partial<Record<VehicleType, PriceInput>>
  >({});

  useEffect(() => {
    if (countryPricingData && !isLoading) {
      const newPriceInputs: Partial<Record<VehicleType, PriceInput>> = {};

      countryPricingData.forEach((pricing: SupportedCountryPricing) => {
        newPriceInputs[pricing.vehicleType] = {
          pricePerMinute: pricing.tripPricePerMinute,
          pricePerKilometer: pricing.tripPricePerKm,
          basePrice: pricing.tripBasePrice,
          halfDayPrice: pricing.tripHalfDayPrice,
          fullDayPrice: pricing.tripFullDayPrice,
          pricingId: pricing.id,
        };
      });

      setPriceInputs(newPriceInputs);
      setInitialPriceInputs(newPriceInputs);
    }
  }, [countryPricingData, isLoading]);

  const handlePriceChange = (
    vehicleType: VehicleType,
    field:
      | 'pricePerMinute'
      | 'pricePerKilometer'
      | 'basePrice'
      | 'halfDayPrice'
      | 'fullDayPrice',
    value: number
  ) => {
    const numericValue = isNaN(value) ? undefined : value;

    setPriceInputs((prev) => ({
      ...prev,
      [vehicleType]: {
        ...prev[vehicleType],
        [field]: numericValue,
      } as PriceInput,
    }));
  };

  const submitPrices = async () => {
    const newPricings: NewPricing[] = [];
    const updatedPricings: {
      pricingId: string;
      data: {
        tripPricePerKm: number;
        tripPricePerMinute: number;
        tripBasePrice: number;
        tripHalfDayPrice: number;
        tripFullDayPrice: number;
      };
    }[] = [];

    Object.entries(priceInputs).forEach(([vehicleType, pricing]) => {
      const initialPricing = initialPriceInputs[vehicleType as VehicleType];

      if (pricing && pricing.pricingId) {
        // Update existing price only if it has changed
        // Using strict !== comparison to properly handle 0 values
        const hasChanged =
          pricing.pricePerKilometer !== initialPricing?.pricePerKilometer ||
          pricing.pricePerMinute !== initialPricing?.pricePerMinute ||
          pricing.basePrice !== initialPricing?.basePrice ||
          pricing.halfDayPrice !== initialPricing?.halfDayPrice ||
          pricing.fullDayPrice !== initialPricing?.fullDayPrice;

        if (hasChanged) {
          updatedPricings.push({
            pricingId: pricing.pricingId,
            data: {
              tripPricePerKm: pricing.pricePerKilometer,
              tripPricePerMinute: pricing.pricePerMinute,
              tripBasePrice: pricing.basePrice,
              tripHalfDayPrice: pricing.halfDayPrice,
              tripFullDayPrice: pricing.fullDayPrice,
            },
          });
        }
      } else if (pricing) {
        // Create new price, only if prices are not zero
        const hasPricePerKm =
          pricing && pricing.pricePerKilometer !== undefined;
        const hasPricePerMinute =
          pricing && pricing.pricePerMinute !== undefined;
        const hasBasePrice = pricing && pricing.basePrice !== undefined;

        if (hasPricePerKm || hasPricePerMinute || hasBasePrice) {
          newPricings.push({
            supportedCountryId: countryId,
            vehicleType: vehicleType as VehicleType,
            tripPricePerKm: pricing.pricePerKilometer,
            tripPricePerMinute: pricing.pricePerMinute,
            tripBasePrice: pricing.basePrice,
            tripHalfDayPrice: pricing.halfDayPrice,
            tripFullDayPrice: pricing.fullDayPrice,
          });
        }
      }
    });

    try {
      if (newPricings.length > 0) {
        await setCountryPricing(newPricings).unwrap();
      }

      if (updatedPricings.length > 0) {
        for (const pricing of updatedPricings) {
          await updateCountryPricing({
            pricingId: pricing.pricingId,
            data: pricing.data,
          }).unwrap();
        }
      }

      toast.success('Country prices saved successfully.');

      // Update initialPriceInputs after successful save
      setInitialPriceInputs(priceInputs);
    } catch (error) {
      toast.error('Error saving country prices.');
      console.error('Error saving country prices:', error);
    }
  };

  return {
    data: {
      priceInputs,
      isLoading,
    },
    handlers: {
      handlePriceChange,
      submitPrices,
    },
  };
};
