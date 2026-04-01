import { FC,useState,useEffect } from 'react';
import { useDispatchers } from './hooks/useDispatchers';
import { DispatchersTable } from './components/DispatchersTable/DispatchersTable';
import { CreateDispatcherSheet } from './components/CreateDispatcherSheet/CreateDispatcherSheet';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Button } from '@/components/ui/Button/Button.tsx';
import { toast } from 'sonner';

export const Dispatchers: FC = () => {
  const { data,handlers ,isSuccess,isError} = useDispatchers();
  const [openConfirmLinkModal,setOpenConfirmLinkModal] = useState<boolean>(false);
  const [selectedDispatcherId,setSelectedDispatcherId] = useState<string>();

const onResetPasswordClicked = (id:string) =>{
  setSelectedDispatcherId(id);
  setOpenConfirmLinkModal(true);
}
const closeModal = () =>{
setOpenConfirmLinkModal(false)
}
const onConfirmResetPasswordClicked = () =>{
 handlers.resetPassword({id:selectedDispatcherId})
}
useEffect(()=>{
  if(isSuccess){
    closeModal();
    toast.success("Password has been reset!");
  }
},[isSuccess])
useEffect(()=>{
  if(isError){
    closeModal();
    toast.error("An error occurred");
  }
},[isError])
  return (
    <div className="h-full flex flex-col w-full">
      <div className=" mb-4">
        <div className="flex w-full justify-end items-center space-x-3 mt-2 sm:mt-0">
          {/* <NewJourneySheet /> */}
          <CreateDispatcherSheet />
        </div>
      </div>
      <div className="flex h-full w-full flex-col flex-1 overflow-hidden">
        <DispatchersTable
          data={data.dispatchersData}
          isLoading={data.dispatchersIsLoading}
          resetPassword={onResetPasswordClicked}
        />
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
                  Are you sure you want to send a reset password link to the dispatcher?
                </DialogContentText>
              </DialogContent>
      
              <DialogActions>
                <Button onClick={closeModal} color="inherit">
                  Cancel
                </Button>
                <Button onClick={onConfirmResetPasswordClicked} color="error" variant="default">
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
         
    </div>
  );
};
