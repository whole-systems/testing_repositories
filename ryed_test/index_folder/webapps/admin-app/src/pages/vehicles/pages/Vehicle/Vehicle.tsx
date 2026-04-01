import { Card } from '@/components/ui/Card/Card';
import { Loader } from '@/components/ui/Loader/Loader';
import {
  getCarExclusivity,
  getCarType,
} from '@/utils/maps/carTypeAndExclusivityMap';
import { EditVehicleSheet } from './components/EditVehicleSheet/EditVehicleSheet';
import { useVehicle } from './hooks/useVehicle';
import React, { useState } from 'react';

export const Vehicle: React.FC = () => {
  const { data, isLoading, isError } = useVehicle();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openModal = (image: string) => {
    setSelectedImage(image);
    setModalOpen(true);
  };


  const closeModal = () => {
    setModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="w-full p-4 flex flex-row items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full p-4 flex flex-row justify-center">
        <p className="text-xl font-bold">Failed to load vehicle information.</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-1 flex-col">
      <div className="p-2 w-full justify-between items-center flex">
        <span className="font-bold text-lg">Vehicle Info:</span>
        <EditVehicleSheet />
      </div>
      <div className="mt-2 flex w-full font-semibold">
        <Card className="w-full m-2 p-2">
          <h3 className="pb-8 text-2xl">Vehicle Info</h3>
          <div className="flex flex-col">
            <span>Make: {data.vehicleData?.make}</span>
            <span>Model: {data.vehicleData?.model}</span>
          </div>
          <div className="flex flex-col mt-2">
            <span>Color: {data.vehicleData?.color}</span>
            <span>Year: {data.vehicleData?.year}</span>
          </div>
          <div className="flex flex-col mt-2">
            <span>Number of sits: {data.vehicleData?.numberOfSits}</span>
            <span>Registred number: {data.vehicleData?.registeredNumber}</span>
          </div>
          <div className="flex flex-col mt-2">
            <span>Type: {getCarType(data.vehicleData?.type ?? '')?.label}</span>
            <span>
              Exclusivity:{' '}
              {
                getCarExclusivity(data.vehicleData?.exclusivityLevel ?? '')
                  ?.label
              }
            </span>
          </div>
        </Card>
        <Card className="w-full m-2 p-2">
          <h3 className="pb-8 text-2xl">Vehicle Pricing</h3>
          <div className="flex flex-col">
            <span>Car price USD: {data.vehicleData?.carPriceUSD}</span>
          </div>
          <div className="flex flex-col mt-2">
            <span>Price per KM: {data.vehicleData?.tripPricePerKm}</span>
            <span>
              Price per minute: {data.vehicleData?.tripPricePerMinute}
            </span>
            <span>Min price: {data.vehicleData?.tripMinPrice}</span>
          </div>
        </Card>
      </div>
      <div className="mt-2 flex w-full flex-wrap">
        {data.vehicleData?.galleryImages &&
          Object.keys(data.vehicleData?.galleryImages).map((item) => (
            <div className="p-2" key={item}>
              <div className="border-2 shadow rounded-lg p-4">
                <p className="text-center font-semibold pb-2">
                  {`Vehicle ${item.charAt(0).toUpperCase() + item.slice(1).split('_').join(' ')}`}
                </p>
                <img
                  className="cursor-pointer hover:shadow-md transition-shadow duration-200 ease-in-out"
                  src={data.vehicleData?.galleryImages![item]}
                  alt={`Vehicle ${item}`}
                  onClick={() => openModal(data.vehicleData?.galleryImages![item] as string)}
                  style={{ width: '300px', height: '200px', objectFit: 'cover' }}
                />
              </div>
            </div>
          ))}
      </div>
      {isModalOpen && (
        <div id="modal-overlay" className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
             onClick={(event) => {
               if ((event.target as HTMLElement).id === "modal-overlay") {
                 closeModal()
               }
             }}>
          <div className="bg-white p-2 max-w-4xl max-h-full overflow-auto">
            <img src={selectedImage} alt="Full Size" className="max-w-full h-auto" />
            <button onClick={closeModal} className="pt-3 text-gray-800 font-bold">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

