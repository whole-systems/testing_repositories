import {
  useAddVehicleImageMutation,
  useDeleteVehicleMutation,
  useEditVehicleMutation,
  useGetVehicleByIdQuery,
} from '@/api/vehicleEndpoints';
import { EditVehicleDTO } from '@/models/vehicle/vehicle';
import { useFormik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { validationSchema } from '../utils/yup';

interface FormValues {
  carPriceUSD: number;
  tripPricePerKm: number;
  tripPricePerMinute: number;
  tripMinPrice: number;
  numberOfSits: number;
  [key: string]: string | number;
}

// TODO: add loading to action btns

export const useEditVehicle = () => {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const [editVehicleAPI, { isSuccess: editVehicleIsSuccess }] =
    useEditVehicleMutation();
  const [deleteVehicleAPI, { isSuccess: deleteVehicleIsSuccess }] =
    useDeleteVehicleMutation();
  const [addVehicleImage] = useAddVehicleImageMutation();
  const { data: vehicleData, isSuccess } = useGetVehicleByIdQuery(vehicleId!);

  const formik = useFormik<FormValues>({
    initialValues: {
      carPriceUSD: vehicleData?.carPriceUSD ?? 0,
      tripPricePerKm: vehicleData?.tripPricePerKm ?? 0,
      tripPricePerMinute: vehicleData?.tripPricePerMinute ?? 0,
      tripMinPrice: vehicleData?.tripMinPrice ?? 0,
      numberOfSits: vehicleData?.numberOfSits ?? 0,
    },

    validationSchema,
    validateOnChange: true,
    onSubmit: () => {},
  });
  const [images, setImages] = useState<
    Record<string, string | ArrayBuffer | null>
  >({
    front: null,
    back: null,
    side: null,
    profile: null,
    interior_back: null,
    interior_front: null,
  });

  const [imagesFile, setImagesFile] = useState<Record<string, File | null>>({
    front: null,
    back: null,
    side: null,
    profile: null,
    interior_back: null,
    interior_front: null,
  });

  //set data to formik after get data
  const { setValues } = formik;
  const updateFormValues = React.useCallback(() => {
    if (vehicleData) {
      if (vehicleData.galleryImages) {
        setImages((state) => {
          const updatedObject = { ...state };
          Object.keys(vehicleData.galleryImages!).forEach((key) => {
            if (key in updatedObject) {
              updatedObject[key] = vehicleData.galleryImages![key];
            }
          });

          return updatedObject;
        });
      }
      setValues({
        carPriceUSD: vehicleData.carPriceUSD ?? 0,
        tripPricePerKm: vehicleData.tripPricePerKm ?? 0,
        tripPricePerMinute: vehicleData.tripPricePerMinute ?? 0,
        tripMinPrice: vehicleData.tripMinPrice ?? 0,
        numberOfSits: vehicleData.numberOfSits ?? 0,
      });
    }
  }, [vehicleData, setValues]);

  useEffect(() => {
    if (isSuccess) {
      updateFormValues();
    }
  }, [isSuccess, updateFormValues]);
  //set data to formik after get data

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const toggleDrawer = useCallback((newDrawerState: boolean) => {
    setIsDrawerOpen(newDrawerState);
  }, []);

  useEffect(() => {
    if (editVehicleIsSuccess) {
      setOpenDeleteModal(false);
      setIsDrawerOpen(false);
    }
  }, [editVehicleIsSuccess]);

  const deleteVehicle = useCallback(async () => {
    try {
      await deleteVehicleAPI(vehicleData?.id ?? '').unwrap();
      toast.success('Vehicle deleted successfully.');
    } catch (error) {
      toast.error('Failed to delete vehicle.');
    }
  }, [vehicleData, deleteVehicleAPI]);

  useEffect(() => {
    if (deleteVehicleIsSuccess) {
      setOpenDeleteModal(false);
      setIsDrawerOpen(false);
      navigate('/vehicles');
    }
  }, [navigate, deleteVehicleIsSuccess]);

  const handleImageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
      const file = event.target.files?.[0];

      if (file) {
        setImagesFile((state) => ({
          ...state,
          [name]: file,
        }));
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages((state) => ({
            ...state,
            [name]: reader.result,
          }));
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  const uploadImages = useCallback(async () => {
    try {
      const createRequest = async (type: string, value: File) => {
        const formData = new FormData();
        formData.append('profileImage', value);
        console.log(formData, value);
        await addVehicleImage({
          id: vehicleId!,
          type,
          formData,
        });
      };
      await Promise.all(
        Object.keys(imagesFile)
          .map((item) =>
            imagesFile[item]
              ? createRequest(item, imagesFile[item]!)
              : undefined
          )
          .filter((f) => f !== undefined)
      );
    } catch (error) {
      console.log(error);
    }
  }, [imagesFile, addVehicleImage, vehicleId]);

  const [isUpdating, setIsUpdating] = useState(false);

  const editVehicle = useCallback(async () => {
    try {
      setIsUpdating(true);

      const values = formik.values;
      const data: EditVehicleDTO = {
        numberOfSits: +values.numberOfSits,
        carPriceUSD: +values.carPriceUSD,
        tripPricePerKm: +values.tripPricePerKm,
        tripPricePerMinute: +values.tripPricePerMinute,
        tripMinPrice: +values.tripMinPrice,
        id: vehicleData?.id ?? '',
      };
      console.log(data);
      await editVehicleAPI(data);
      await uploadImages();

      toast.success('Vehicle updated successfully.');
    } catch (error) {
      toast.error('Failed to update vehicle.');
    } finally {
      setIsUpdating(false);
    }
  }, [formik.values, vehicleData, editVehicleAPI, uploadImages]);

  return {
    data: { isDrawerOpen, formik, openDeleteModal, images },
    handlers: {
      toggleDrawer,
      setOpenDeleteModal,
      deleteVehicle,
      editVehicle,
      handleImageChange,
    },
    isUpdating,
  };
};
