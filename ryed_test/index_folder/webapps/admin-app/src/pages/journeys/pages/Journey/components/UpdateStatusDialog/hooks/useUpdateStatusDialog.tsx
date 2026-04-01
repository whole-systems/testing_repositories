import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUpdateJourneyStatusMutation } from '@/api/journeysEndpoints';
import { ETripStatus } from '@/models/journey';

export const useUpdateStatusDialog = ({ status }: { status: ETripStatus }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<ETripStatus | undefined>(
    undefined
  );
  const [showConfirmation, setShowConfirmation] = useState(false);

  const { journeyId } = useParams();
  const [updateJourneyStatusAPI, { isSuccess, isLoading }] =
    useUpdateJourneyStatusMutation();

  const handleUpdateStatus = () => {
    if (journeyId && selectedStatus) {
      // Check if status requires confirmation
      if (selectedStatus === ETripStatus.FINISHED) {
        setShowConfirmation(true);
        return;
      }

      // If no confirmation needed, update immediately
      updateJourneyStatusAPI({ journeyId, status: selectedStatus }).then(() => {
        setSelectedStatus(undefined);
        setOpenModal(false);
        setShowConfirmation(false);
      });
    }
  };

  const handleConfirmUpdate = () => {
    if (journeyId && selectedStatus) {
      updateJourneyStatusAPI({ journeyId, status: selectedStatus }).then(() => {
        setSelectedStatus(undefined);
        setOpenModal(false);
        setShowConfirmation(false);
      });
    }
  };

  const handleStatusSelect = (newStatus: ETripStatus) => {
    setSelectedStatus(newStatus);
    // Don't show confirmation immediately, only when button is clicked
  };

  const handleModalClose = (open: boolean) => {
    setOpenModal(open);
    if (!open) {
      setSelectedStatus(undefined);
      setShowConfirmation(false);
    }
  };

  const availableStatuses = useMemo(() => {
    // Only include the specified statuses
    const allowedStatuses = [
      ETripStatus.PENDING,
      ETripStatus.PENDING_UPDATE_ACCEPTED,
      ETripStatus.PENDING_DRIVER_ACCEPTANCE,
      ETripStatus.PENDING_SCHEDULED_JOURNEY,
      ETripStatus.FINISHED,
      ETripStatus.CANCELLED_BY_USER,
      ETripStatus.CANCELLED_BY_TRAVEL_AGENT,
      ETripStatus.ARCHIVED,
    ];
    return allowedStatuses;
  }, [status]);

  useEffect(() => {
    if (isSuccess) {
      setOpenModal(false);
      setShowConfirmation(false);
    }
  }, [isSuccess]);

  return {
    data: {
      openModal,
      selectedStatus,
      isLoading,
      availableStatuses,
      showConfirmation,
    },
    handlers: {
      setOpenModal,
      setSelectedStatus,
      handleUpdateStatus,
      handleConfirmUpdate,
      handleStatusSelect,
      setShowConfirmation,
      handleModalClose,
    },
  };
};
