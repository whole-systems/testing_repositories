import { Card } from '@/components/ui/Card/Card';
import { Loader } from '@/components/ui/Loader/Loader';
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import { FC ,useEffect, useState} from 'react';
// import { AddDriverSheet } from './components/AddDriverSheet/AddDriverSheet';
import { DriversTable } from './components/DriversTable/DriversTable';
import { DriverStatusRegistry, useDrivers } from './hooks/useDrivers';
import { mapOptions } from '@/common/mapStyles.ts';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { useSearchParams } from 'react-router-dom';
import { ListFilter } from 'lucide-react';
import { Button } from '@/components/ui/Button/Button.tsx';
import { capitalize } from 'lodash';
import { Combobox } from '@ryed/ui';
import { useGenerateDriverDeepLinkMutation } from '@/api/driversEndpoints';
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, Typography } from '@mui/material';
import { TDriver } from '@/models/driver';


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





export const Drivers: FC = () => {
  const { data, handlers, isFetching, isLoading, isError } = useDrivers();
  const [searchParams, setSearchParams] = useSearchParams(); 
  const [openConfirmLinkModal,setOpenConfirmLinkModal] = useState(false);
  const [openLinkModal,setOpenLinkModal] = useState(false);
  const [selectedDriver,setSelectedDriver] = useState<TDriver>();
  const currentFilter = searchParams.get('status') || 'all';

  const handleFilterChange = (filter: keyof typeof DriverStatusRegistry) => {
    setSearchParams(`?status=${filter}`, { replace: true });
  };
    
   const [generateDriverDeepLink, { data:deepLink ,isSuccess}] = useGenerateDriverDeepLinkMutation();

   const openDeepLinkConfirmModal = (driverId:string) =>{
    const driver = data.driversData?.find(d => d.id === driverId);
      setOpenConfirmLinkModal(true)
      setSelectedDriver(driver)
   }
   const onComfirmGenerateDeepLink = () =>{
    closeModal();
 
      generateDriverDeepLink({driverId:selectedDriver!.id})
    
   }
   const closeModal = () =>setOpenConfirmLinkModal(false)
  
   useEffect(()=>{
    if(isSuccess){
    setOpenLinkModal(true)
    }

   },[isSuccess])

  return (
    <>
    <div className="overflow-hidden flex  h-full">
      <div className=" py-2 lg:py-8 px-2 md:px-6 w-full">
        <div className="h-full flex w-full flex-col">
          <div className="p-2 w-full justify-end flex space-x-3">
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="mr-2 bg-gray-800 text-white border-2 border-gray-700">
                    <div className="flex">
                      <span className="mr-2">Filter by status</span>
                      <ListFilter size={20} />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {Object.keys(DriverStatusRegistry).map((status) => (
                    <DropdownMenuCheckboxItem
                      key={status}
                      onClick={() =>
                        handleFilterChange(
                          status as keyof typeof DriverStatusRegistry
                        )
                      }
                      checked={currentFilter === status}
                    >
                      {capitalize(status)}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="w-[300px]">
              <Combobox
                searchPlaceHolder="Select dispatcher"
                selectText="Select dispatcher"
                open={data.dispatcherComboboxOpen}
                setOpen={(open) => handlers.setDispatcherComboboxOpen(open)}
                isLoading={isFetching}
                value={data.dispatcherComboboxValue}
                setValue={(value) => handlers.setDispatcherComboboxValue(value)}
                options={data.dispatcherComboboxOptions || []}
              />
            </div>
            {/* <AddDriverSheet /> */}
          </div>
          {!isLoading && !isError && (
            <div className="flex h-full flex-col pt-1 lg:pt-4 ">
              <div className="flex flex-col h-full lg:flex-row flex-1">
                <Card className=" p-4 flex lg:flex-1 m-2 min-h-[300px] max-h-[500px]">
                  <GoogleMap
                    mapContainerStyle={{
                      height: '100%',
                      width: '100%',
                    }}
                    center={{
                      lat: data.markers[0]?.lat ?? 0,
                      lng: data.markers[0]?.lng ?? 0,
                    }}
                    zoom={15}
                    options={mapOptions}
                  >
                    {data.markers.map((location) => (
                      <Marker
                        key={location.id}
                        position={{ lat: location.lat, lng: location.lng }}
                        onClick={() => handlers.setSelectedMarker(location)}
                        icon={{
                          url: '/assets/car-icon.png',
                          scaledSize: new window.google.maps.Size(42, 42),
                        }}
                      >
                        {data.selectedMarker?.id === location.id && (
                          <InfoWindow
                            position={location}
                            onCloseClick={() =>
                              handlers.setSelectedMarker(null)
                            }
                          >
                            <div
                              style={{
                                width: '100px',
                                height: '50px',
                                color: 'black',
                              }}
                            >
                              {location.label}
                            </div>
                          </InfoWindow>
                        )}
                      </Marker>
                    ))}
                  </GoogleMap>
                </Card>
                <Card className="p-4 flex lg:flex-1 m-2 min-h-[300px] max-h-[500px]">
                  <DriversTable data={data.tableData} isFetching={isFetching} generateLink={(driverId)=>openDeepLinkConfirmModal(driverId)} />
                </Card>
              </div>
            </div>
          )}
          {isLoading && (
            <div className="flex w-full flex-row p-8 justify-center items-center">
              <Loader />
            </div>
          )}
          {isError && (
            <p className="w-full p-8 text-center text-xl font-bold">
              Failed to load drivers list.
            </p>
          )}
        </div>
      </div>

    </div><Dialog
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
            Are you sure you want to reset email for <strong>{selectedDriver?.fullName}</strong> ? 
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

      </>
  );
};
