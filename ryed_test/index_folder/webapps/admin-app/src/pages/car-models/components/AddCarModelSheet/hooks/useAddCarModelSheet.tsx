import { useFormik } from 'formik';
import { validationSchema } from '../utils/yup';
import { useCallback, useEffect, useState } from 'react';
import {
  useAddCarModelMutation,
  useLazyGetMakesCarDropdownQuery,
  useLazyGetModelsCarDropdownQuery,
} from '@/api/carModelsEndpoints';

interface FormValues {
  year: string;
  make: string;
  model: string;
  [key: string]: string;
}
const mapOptions = (data: string[]) =>
  data.map((item) => ({ value: item.toLowerCase(), label: item }));

export const useAddCarModelSheet = () => {
  const [addCarModelAPI, { isSuccess, isLoading }] = useAddCarModelMutation();

  const [getMakesCar, { data: makesCarData, isLoading: makesCarIsLoading }] =
    useLazyGetMakesCarDropdownQuery();
  const [getModelsCar, { data: modelsCarData, isLoading: modelsCarIsLoading }] =
    useLazyGetModelsCarDropdownQuery();
  const formik = useFormik<FormValues>({
    initialValues: {
      year: '2000',
      make: '',
      model: '',
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      console.log(values);
      addCarModelAPI({
        ...values,
        make: makesCarData?.find((f) => f.toLowerCase() === values.make) ?? '',
        year: +values.year,
      });
    },
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = useCallback((newDrawerState: boolean) => {
    setIsDrawerOpen(newDrawerState);
    if (!newDrawerState) {
      formik.resetForm();
    }
  }, []);
  useEffect(() => {
    if (isSuccess) {
      toggleDrawer(false);
    }
  }, [isSuccess, toggleDrawer]);

  const [openMakesBox, setOpenMakesBox] = useState(false);
  const [openModelsBox, setOpenModelsBox] = useState(false);
  const [openYearBox, setOpenYearBox] = useState(false);
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

      if (!newState || !currentValue) {
        setOpenModelsBox(false);
        return;
      }
      if (!!formik.values.year && !formik.errors.year && !!currentValue) {
        setOpenModelsBox(true);
        getModelsCar(
          {
            year: +formik.values.year,
            make:
              makesCarData?.find((f) => f.toLowerCase() === currentValue) ?? '',
          },
          true
        );
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
  console.log(openModelsBox);
  return {
    data: {
      formik,
      isDrawerOpen,
      isLoading,
      openComboboxes: {
        make: openMakesBox,

        year: openYearBox,
      } as OpenComboboxes,
      openModelsBox,
      comboboxesIsLoading: {
        make: makesCarIsLoading,
      } as ComboboxIsLoading,
      carData: {
        make: mapOptions(makesCarData ?? []),
      } as CarData,
      models: modelsCarData ?? [],
      modelsCarIsLoading,
      disabledComboboxes,
    },
    handlers: {
      toggleDrawer,
      setOpenComboboxes: {
        make: openAndGetMakesData,
        year: setOpenYearBox,
      } as SetOpenComboboxes,
      openAndGetModelsData,
    },
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
