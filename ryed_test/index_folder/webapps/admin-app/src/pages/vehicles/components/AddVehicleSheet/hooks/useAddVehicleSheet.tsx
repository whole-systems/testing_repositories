import {
  useLazyGetMakesCarDropdownQuery,
  useLazyGetModelsCarDropdownQuery,
} from '@/api/carModelsEndpoints';
import { useCreateVehicleMutation } from '@/api/vehicleEndpoints';
import { CreateVehicleDTO } from '@/models/vehicle/vehicle';
import { useFormik } from 'formik';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { validationSchema } from '../utils/yup';

interface FormValues {
  color: string;
  registeredNumber: string;
  carPriceUSD: number;
  tripPricePerKm: number;
  tripPricePerMinute: number;
  tripMinPrice: number;
  exclusivityLevel: string;
  type: string;
  year: string;
  make: string;
  model: string;
  numberOfSits: number;
  [key: string | number]: string | number;
}

const mapOptions = (data: string[]) =>
  data.map((item) => ({ value: item.toLowerCase(), label: item }));

export const useAddVehicleSheet = () => {
  const [getMakesCar, { data: makesCarData, isLoading: makesCarIsLoading }] =
    useLazyGetMakesCarDropdownQuery();
  const [getModelsCar, { data: modelsCarData, isLoading: modelsCarIsLoading }] =
    useLazyGetModelsCarDropdownQuery();
  //TODO: CHECK WHY ISLOADING DOESNT WORKING

  const [
    createNewVehicle,
    { isLoading: isCreatingVehicle, isError, isSuccess },
  ] = useCreateVehicleMutation();

  const formik = useFormik<FormValues>({
    initialValues: {
      exclusivityLevel: '',
      type: '',
      year: '2025',
      make: '',
      model: '',
      color: '',
      registeredNumber: '',
      carPriceUSD: 0,
      tripPricePerKm: 0,
      tripPricePerMinute: 0,
      tripMinPrice: 0,
      numberOfSits: 0,
    },
    validationSchema,
    validateOnChange: true,
    onSubmit: () => {},
  });
  const { resetForm } = formik;

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [openExclusivityLevelBox, setOpenExclusivityLevelBox] = useState(false);
  const [openTypeBox, setOpenTypeBox] = useState(false);
  const [openMakesBox, setOpenMakesBox] = useState(false);
  const [openModelsBox, setOpenModelsBox] = useState(false);
  const [openYearBox, setOpenYearBox] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Vehicle created successfully.');
      resetForm();
    }
  }, [isSuccess, resetForm]);

  useEffect(() => {
    if (isError) {
      toast.error('Failed to create vehicle.');
    }
  }, [isError]);

  const toggleDrawer = useCallback((newDrawerState: boolean) => {
    setIsDrawerOpen(newDrawerState);
  }, []);

  const disabledFormBtn = useMemo(() => {
    if (Object.keys(formik.errors).length) {
      return true;
    }
    const emptyField = Object.keys(formik.values).some(
      (item) => !formik.values[item]
    );

    if (emptyField) {
      return true;
    }
    return false;
  }, [formik]);

  const disabledComboboxes = useCallback(
    (name: string) => {
      switch (name) {
        case 'make':
          return !!formik.errors.year || !formik.values.year;
        case 'model':
          return (
            !!formik.errors.year || !formik.values.year || !formik.values.make
          );
        default:
          return false;
      }
    },
    [formik.errors.year, formik.values.year, formik.values.make]
  );

  //get makes
  const openAndGetMakesData = useCallback(
    (newState: boolean) => {
      if (!newState) {
        setOpenMakesBox(false);
        return;
      }
      if (!!formik.values.year && !formik.errors.year) {
        getMakesCar(+formik.values.year, true);
        setOpenMakesBox(true);
        formik.setFieldValue('model', '');
      }
    },
    [getMakesCar, formik]
  );
  //get makes

  //get models
  const openAndGetModelsData = useCallback(
    (newState: boolean) => {
      const currentValue = formik.values.make;
      if (!newState) {
        setOpenModelsBox(false);
        return;
      }
      if (!!formik.values.year && !formik.errors.year && !!currentValue) {
        getModelsCar(
          {
            year: +formik.values.year,
            make:
              makesCarData?.find((f) => f.toLowerCase() === currentValue) ?? '',
          },
          true
        );
        setOpenModelsBox(true);
      }
    },
    [
      formik.values.year,
      formik.errors.year,
      getModelsCar,
      formik.values.make,
      makesCarData,
    ]
  );
  //get models

  const createVehicle = useCallback(() => {
    const data: CreateVehicleDTO = {
      ...formik.values,
      type: formik.values.type.toUpperCase(),
      exclusivityLevel: formik.values.exclusivityLevel.toUpperCase(),
      year: +formik.values.year,
      make:
        makesCarData?.find((f) => f.toLowerCase() === formik.values.make) ?? '',
      model:
        modelsCarData?.find((f) => f.toLowerCase() === formik.values.model) ??
        '',
      carPriceUSD: +formik.values.carPriceUSD,
      tripPricePerKm: +formik.values.tripPricePerKm,
      tripPricePerMinute: +formik.values.tripPricePerMinute,
      tripMinPrice: +formik.values.tripMinPrice,
      numberOfSits: +formik.values.numberOfSits,
    };
    createNewVehicle(data);
  }, [formik, modelsCarData, makesCarData, createNewVehicle]);

  return {
    data: {
      isDrawerOpen,
      formik,
      openComboboxes: {
        exclusivityLevel: openExclusivityLevelBox,
        type: openTypeBox,
        make: openMakesBox,
        model: openModelsBox,
        year: openYearBox,
      } as OpenComboboxes,

      comboboxesIsLoading: {
        make: makesCarIsLoading,
        model: modelsCarIsLoading,
      } as ComboboxIsLoading,
      carData: {
        make: mapOptions(makesCarData ?? []),
        model: mapOptions(modelsCarData ?? []),
      } as CarData,

      disabledComboboxes,
      disabledFormBtn,
    },
    handlers: {
      setOpenComboboxes: {
        exclusivityLevel: setOpenExclusivityLevelBox,
        type: setOpenTypeBox,
        make: openAndGetMakesData,
        model: openAndGetModelsData,
        year: setOpenYearBox,
      } as SetOpenComboboxes,
      toggleDrawer,
      openAndGetMakesData,
      setOpenExclusivityLevelBox,
      setOpenTypeBox,
      openAndGetModelsData,
      createVehicle,
    },
    isCreatingVehicle,
  };
};

interface OpenComboboxes {
  [key: string]: boolean;
}
interface SetOpenComboboxes {
  [key: string]: (newState: boolean) => void;
}
interface CarData {
  [key: string]: {
    value: string;
    label: string;
  }[];
}
interface ComboboxIsLoading {
  [key: string]: boolean;
}
