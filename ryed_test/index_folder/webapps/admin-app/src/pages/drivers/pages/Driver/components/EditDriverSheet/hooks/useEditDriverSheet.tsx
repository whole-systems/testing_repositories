import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useAssignVehicleMutation,
  useDeleteDriverMutation,
  useEditDriverMutation,
  useGetDriverByIdQuery,
  useUnAssignVehicleMutation,
} from '@/api/driversEndpoints';
import { useFormik } from 'formik';
import { validationSchema } from '../utils/yup';
import { TEditDriverDTO } from '@/models/driver';
import { useGetAllVehicleQuery } from '@/api/vehicleEndpoints';

interface FormValues {
  firstName: string;
  lastName: string;
  fullName: string;
  [key: string]: string;
}

export const useEditDriverSheet = () => {
  const formik = useFormik<FormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      fullName: '',
    },
    validationSchema,
    validateOnChange: true,
    onSubmit: () => {},
  });
  const { setValues } = formik;
  const { driverId } = useParams();
  const navigate = useNavigate();
  const [editDriver, { isSuccess: editDriverIsSuccess }] =
    useEditDriverMutation();
  const [deleteDriverAPI, { isSuccess: deleteVehicleIsSuccess }] =
    useDeleteDriverMutation();
  const [assignVehicleAPI, { isSuccess: assignVehicleIsSuccess }] =
    useAssignVehicleMutation();
  const [unAssignVehicleAPI, { isSuccess: unAssignVehicleIsSuccess }] =
    useUnAssignVehicleMutation();
  const { data: driverData, isSuccess } = useGetDriverByIdQuery(driverId!);
  const { data: vehicleData } = useGetAllVehicleQuery('');

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openVehicleCombobox, setOpenVehicleOpenCombobox] = useState(false);
  const [valueVehicleCombobox, setValueVehcileCombobox] = useState('');
  useEffect(() => {
    if (isSuccess && driverData.vehicle) {
      setValueVehcileCombobox(driverData.vehicle.id);
    }
  }, [isSuccess, driverData]);
  const toggleDrawer = useCallback((newDrawerState: boolean) => {
    setIsDrawerOpen(newDrawerState);
  }, []);

  const updateDataToFormikAfterFetch = useCallback(() => {
    if (driverData) {
      setValues({
        firstName: driverData.firstName,
        lastName: driverData.lastName,
        fullName: driverData.fullName,
        password: '',
      });
    }
  }, [driverData, setValues]);

  useEffect(() => {
    if (isSuccess) {
      console.log('count call');
      updateDataToFormikAfterFetch();
    }
  }, [isSuccess, updateDataToFormikAfterFetch]);

  useEffect(() => {
    if (editDriverIsSuccess) {
      toggleDrawer(false);
    }
  }, [editDriverIsSuccess, toggleDrawer]);
  const updateDriver = useCallback(() => {
    const data: TEditDriverDTO = {
      firstName: formik.values.firstName,
      lastName: formik.values.lastName,
      fullName: formik.values.fullName,
      id: driverData!.id,
    };
    editDriver(data);
  }, [formik, editDriver, driverData]);

  const deleteVehicle = useCallback(() => {
    if (driverData?.id) {
      deleteDriverAPI(driverData.id);
    }
  }, [driverData, deleteDriverAPI]);

  useEffect(() => {
    if (deleteVehicleIsSuccess) {
      setOpenDeleteModal(false);
      setIsDrawerOpen(false);
      navigate('/drivers');
    }
  }, [navigate, deleteVehicleIsSuccess]);

  const assignVehicle = useCallback(() => {
    assignVehicleAPI({ vehicleId: valueVehicleCombobox, driverId: driverId! });
  }, [assignVehicleAPI, valueVehicleCombobox, driverId]);

  const unAssignVehicle = useCallback(() => {
    unAssignVehicleAPI({
      driverId: driverData!.id,
      vehicleId: driverData!.vehicle.id,
    });
  }, [driverData, unAssignVehicleAPI]);

  useEffect(() => {
    if (assignVehicleIsSuccess || unAssignVehicleIsSuccess) {
      toggleDrawer(false);
    }
  }, [assignVehicleIsSuccess, toggleDrawer, unAssignVehicleIsSuccess]);

  return {
    data: {
      isDrawerOpen,
      openDeleteModal,
      formik,
      vehicleData,
      openVehicleCombobox,
      valueVehicleCombobox,
      driverData,
    },
    handlers: {
      toggleDrawer,
      setOpenDeleteModal,
      deleteVehicle,
      updateDriver,
      setOpenVehicleOpenCombobox,
      setValueVehcileCombobox,
      assignVehicle,
      unAssignVehicle,
    },
  };
};
