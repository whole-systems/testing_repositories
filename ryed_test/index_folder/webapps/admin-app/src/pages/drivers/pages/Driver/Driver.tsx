import { FC, useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card/Card';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { parsePoint } from '@/utils/parsePoint/parsePoint';
import { mapOptions } from '@/common/mapStyles.ts';
import { useDriver } from '@/pages/drivers/pages/Driver/hooks/useDriver.tsx';
import {
  CircleCheckBig,
  CircleUserRound,
  CircleX,
  ShieldX,
} from 'lucide-react';
import { Button } from '@/components/ui/Button/Button.tsx';

import { useApproveDriverMutation, useGenerateDriverDeepLinkMutation } from '@/api/driversEndpoints';
import { usePosthog } from '@/hooks/usePosthog/usePosthog';
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, Typography } from '@mui/material';

const style = {
  position: "fixed",
  top: 24,
  right: 24,
  width: 640,
  bgcolor: "background.paper",
  color:'#000',
  borderRadius: 2,
  boxShadow: 6,
  p: 2,
};


export const Driver: FC = () => {
  const { data } = useDriver();
  const driverData = data.driverData;
  const [approveDriver, { isSuccess, isError, error }] =
    useApproveDriverMutation();
    //  const [generateDeepLink, {  }] =
    // useGenerateDriverDeepLinkMutation();
  const { trackEvent } = usePosthog();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [openConfirmLinkModal,setOpenConfirmLinkModal] = useState(false);
  const [openLinkModal,setOpenLinkModal] = useState(false);

  const [generateDriverDeepLink, { data:deepLink ,isSuccess:isDeepLinkSuccess}] = useGenerateDriverDeepLinkMutation();

  const openModal = (image: string) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setOpenConfirmLinkModal(false);
  };
const onComfirmGenerateDeepLink = () =>{
  generateDriverDeepLink({driverId:driverData!.id})
}

   useEffect(()=>{
      if(isDeepLinkSuccess){
      setOpenLinkModal(true)
      }
  
     },[isDeepLinkSuccess])

  useEffect(() => {
    if (isSuccess) {
      trackEvent('DRIVER_ONBOARDING_APPROVED', {
        driver_id: driverData?.id ?? 'unknown',
        dispatcher_id: driverData?.dispatcher?.id ?? 'unknown',
      });
    }
    if (isError) {
      trackEvent('DRIVER_ONBOARDING_APPROVED_FAILED', {
        driver_id: driverData?.id ?? 'unknown',
        dispatcher_id: driverData?.dispatcher?.id ?? 'unknown',
        reason: JSON.stringify(error),
      });
    }
  }, [isSuccess, isError, error, driverData, trackEvent]);

  return (
    driverData && (
      <div className="w-full h-full flex flex-1 flex-col overflow-auto">
        <div className="p-2 w-full flex justify-end space-x-2">
          {driverData.status.includes('ONBOARDING') ? (
            driverData.status === 'ONBOARDING_PENDING_APPROVAL' ? (
              <>
                <Button
                  className="bg-green-600 text-white font-bold"
                  onClick={() => approveDriver({ driverId: driverData.id })}
                >
                  <div className="flex items-center">
                    <span className="mr-2">Approve</span>
                    <CircleCheckBig size={20} />
                  </div>
                </Button>
                <Button
                  className="bg-red-600 text-white font-bold"
                  onClick={() =>
                    alert('You cannot Decline Driver, Please contact Blokh')
                  }
                >
                  <div className="flex items-center">
                    <span className="mr-2">Decline</span>
                    <CircleX size={20} />
                  </div>
                </Button>
              </>
            ) : (
              <div className="rounded-md bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 px-4 py-3 text-amber-800 dark:text-amber-200">
                Onboarding is in progress - Please finish onboarding on the App
              </div>
            )
          ) : (
            <>
            <Button
                className="bg-red-600 text-white font-bold"
                onClick={()=>setOpenConfirmLinkModal(true)}
              >
                <div className="flex items-center">
                  <span className="mr-2">Generate Reset Password Link</span>
                 
                </div>
              </Button>
              <Button
                className="bg-red-600 text-white font-bold"
                onClick={() =>
                  alert('You cannot Decline Driver, Please contact Blokh')
                }
              >
                <div className="flex items-center">
                  <span className="mr-2">Block</span>
                  <ShieldX size={20} />
                </div>
              </Button>
                           
            </>
          )}
        </div>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/3 p-2">
            <Card className="p-1 h-full">
              <GoogleMap
                mapContainerStyle={{
                  height: '100%',
                  width: '100%',
                }}
                center={{
                  ...(parsePoint(driverData?.location) ?? {
                    lat: 0,
                    lng: 0,
                  }),
                }}
                options={mapOptions}
                zoom={15}
              >
                <Marker
                  position={{
                    ...(parsePoint(driverData?.location) ?? {
                      lat: 0,
                      lng: 0,
                    }),
                  }}
                  icon={{
                    url: '/assets/car-icon.png',
                    scaledSize: new window.google.maps.Size(42, 42),
                  }}
                ></Marker>
              </GoogleMap>
            </Card>
          </div>
          <div className="w-full lg:w-1/3 p-2 flex items-stretch">
            {driverData?.dispatcher && (
              <Card className="p-2 flex flex-col items-center flex-1">
                <div className="flex justify-between w-full">
                  <span className="font-bold text-lg">Dispatcher Info:</span>
                </div>
                <div className="mt-2 flex flex-col items-center">
                  <img
                    src={
                      driverData.dispatcher.logoUrl
                        ? driverData.dispatcher.logoUrl
                        : ''
                    }
                    alt="Dispatcher Logo"
                    className="w-24 h-24 rounded-full"
                  />
                  <div className="mt-2 text-center">
                    <div className="mt-2 flex flex-col">
                      <span className="font-bold">
                        {driverData.dispatcher.companyName}
                      </span>
                      {driverData.dispatcher.description && (
                        <span>{driverData.dispatcher.description}</span>
                      )}
                      <span className="font-bold">
                        {driverData.dispatcher.email}
                      </span>
                      {driverData.dispatcher.phoneNumber && (
                        <span className="font-bold">
                          {driverData.dispatcher.phoneNumber}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
          <div className="w-full lg:w-1/3 p-2 flex items-stretch">
            <Card className="h-full p-2 flex flex-col items-center flex-1">
              <div className="flex justify-between w-full">
                <span className={'font-bold text-lg'}>Driver Info:</span>
                <div className="flex-row">
                  status:{' '}
                  <div className={'font-bold text-lg'}>
                    {driverData?.status}
                  </div>
                </div>
              </div>
              <div className="mt-2 flex flex-col items-center">
                {driverData?.profileImageUrl ? (
                  <img
                    src={driverData.profileImageUrl}
                    alt="Driver Profile"
                    className={`w-24 h-24 rounded-full ${
                      driverData.profileImageUrl ? 'cursor-pointer' : ''
                    }`}
                    onClick={() => {
                      driverData.profileImageUrl
                        ? openModal(driverData.profileImageUrl)
                        : null;
                    }}
                  />
                ) : (
                  <CircleUserRound className="w-24 h-24 rounded-full" />
                )}
                <span className="mt-2 font-bold">{driverData?.fullName}</span>
                <span className="font-bold">{driverData?.email}</span>
                <span className="font-bold">{driverData?.phoneNumber}</span>
                <span>{driverData?.description}</span>
              </div>
            </Card>
          </div>
          <div className="flex flex-wrap max-h-full">
            <div className="lg:w-1/2 p-2">
              <Card className="h-1/2 p-2 flex flex-col">
                <div className="flex p-2 justify-between">
                  <span className={'font-bold text-lg'}>Driver License:</span>
                </div>
                <div className="flex flex-wrap justify-center">
                  {driverData?.driverLicenseFrontUrl && (
                    <img
                      src={driverData.driverLicenseFrontUrl}
                      alt="Driver License Front"
                      className="w-full  md:w-1/2 p-2 cursor-pointer hover:shadow-lg h-2/5"
                      onClick={() =>
                        openModal(driverData.driverLicenseFrontUrl!)
                      }
                    />
                  )}
                  {driverData?.driverLicenseBackUrl && (
                    <img
                      src={driverData.driverLicenseBackUrl}
                      alt="Driver License Back"
                      className="w-full md:w-1/2 p-2 cursor-pointer hover:shadow-lg h-2/5"
                      onClick={() =>
                        openModal(driverData.driverLicenseBackUrl!)
                      }
                    />
                  )}
                </div>
              </Card>
            </div>
            <div className="w-full lg:w-1/2 p-2">
              <Card className="h-2/5 p-2 flex flex-col">
                <div className="flex p-2 justify-between">
                  <span className={'font-bold text-lg'}>Profile Images:</span>
                </div>
                <div className="flex flex-wrap justify-center">
                  {driverData?.images?.profileImage && (
                    <img
                      src={driverData.images.profileImage}
                      alt="Profile Image"
                      className="w-full md:w-1/2 p-2 cursor-pointer hover:shadow-lg max-w-full h-auto"
                      onClick={() => openModal(driverData.images.profileImage!)}
                    />
                  )}
                  {driverData?.images?.faceImage && (
                    <img
                      src={driverData.images.faceImage}
                      alt="Face Image"
                      className="w-full md:w-1/2 p-2 cursor-pointer hover:shadow-lg max-w-full h-auto"
                      onClick={() => openModal(driverData.images.faceImage!)}
                    />
                  )}
                  {driverData?.images?.fullImage && (
                    <img
                      src={driverData.images.fullImage}
                      alt="Full Image"
                      className="w-full md:w-1/2 p-2 cursor-pointer hover:shadow-lg max-w-full h-auto"
                      onClick={() => openModal(driverData.images.fullImage!)}
                    />
                  )}
                </div>
              </Card>
            </div>
          </div>
          {isModalOpen && (
            <div
              id="modal-overlay"
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
              onClick={(event) => {
                if ((event.target as HTMLElement).id === 'modal-overlay') {
                  closeModal();
                }
              }}
            >
              <div className="bg-white p-2 max-w-4xl max-h-full overflow-auto">
                <img
                  src={selectedImage}
                  alt="Full Size"
                  className="max-w-full h-auto"
                />
                <button
                  onClick={closeModal}
                  className="pt-3 text-gray-800 font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
        <Dialog
        open={openConfirmLinkModal}
        onClose={closeModal}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">
          Confirm Action
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            Are you sure you want to send a reset password link to the driver?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeModal} color="inherit">
            Cancel
          </Button>
          <Button onClick={onComfirmGenerateDeepLink} color="error" variant="default">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
   <Modal open={openLinkModal} onClose={()=>setOpenLinkModal(false)}>
        
  <Box sx={style} >
      <Typography variant="subtitle1" fontWeight={600}>
          {deepLink as string}
          </Typography>
    </Box>
</Modal>
      </div>
    )
  );
};
