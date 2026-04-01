import { useGetCurrentUserQuery } from '@/api/authEndpoints';
import { ETripStatus, TJourney } from '@/models/journey';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const ARCHIVE_STATUSES = [
  ETripStatus.CANCELLED_BY_USER,
  ETripStatus.CANCELLED_BY_DRIVER,
  ETripStatus.CANCELLED_BY_TRAVEL_AGENT,
  ETripStatus.FAILED,
];

const CANCEL_STATUSES = [
  ETripStatus.CANCELLED_BY_USER,
  ETripStatus.CANCELLED_BY_DRIVER,
  ETripStatus.CANCELLED_BY_TRAVEL_AGENT,
  ETripStatus.FAILED,
  ETripStatus.ARCHIVED,
];

const REASSIGN_STATUSES = [
  ETripStatus.PENDING_SCHEDULED_JOURNEY,
  ETripStatus.PENDING_DRIVER_ACCEPTANCE,
];

const FINISHED_STATUSES = [
  ETripStatus.CANCELLED_BY_USER,
  ETripStatus.CANCELLED_BY_DRIVER,
  ETripStatus.CANCELLED_BY_TRAVEL_AGENT,
  ETripStatus.FINISHED,
  ETripStatus.FAILED,
  ETripStatus.ARCHIVED,
  ETripStatus.PENDING_DRIVER_ACCEPTANCE,
];

const EDIT_STATUSES = [
  ETripStatus.PENDING_SCHEDULED_JOURNEY,
  ETripStatus.PENDING_DRIVER_ACCEPTANCE,
  ETripStatus.PENDING_UPDATE_ACCEPTED,
  ETripStatus.SEARCHING_FOR_DRIVER,
  ETripStatus.PENDING,
];

const DUPLICATE_STATUSES = [
  ETripStatus.PENDING,
  ETripStatus.SEARCHING_FOR_DRIVER,
  ETripStatus.DRIVER_ON_THE_WAY,
  ETripStatus.DRIVER_AT_PICKUP_SPOT,
  ETripStatus.IN_PROGRESS,
  ETripStatus.PENDING_SCHEDULED_JOURNEY,
  ETripStatus.FINISHED,
  ETripStatus.CANCELLED_BY_USER,
  ETripStatus.CANCELLED_BY_DRIVER,
  ETripStatus.FAILED,
  ETripStatus.ARCHIVED,
  ETripStatus.PENDING_DRIVER_ACCEPTANCE,
  ETripStatus.PENDING_UPDATE_ACCEPTED,
  ETripStatus.CANCELLED_BY_TRAVEL_AGENT,
];

export const useJourneyHeader = ({
  journeyData,
}: {
  journeyData: TJourney;
}) => {
  const navigate = useNavigate();
  // const { journeyId } = useParams();
  // const dispatch = useAppDispatch();
  const { data: user } = useGetCurrentUserQuery('');
  // const [exportJourneyToPdfAPI, { isFetching: exportJourneyToPdfIsLoading }] =
  //   useLazyExportJourneyToPdfQuery();

  // const [
  //   approveJourneyApi,
  //   {
  //     isLoading: approveJorneyIsLoading,
  //     isError: approveJourneyIsError,
  //     reset: approveJourneyApiReset,
  //   },
  // ] = useApproveJourneyMutation();
  // useEffect(() => {
  //   if (approveJourneyIsError) {
  //     navigate(-1);
  //     approveJourneyApiReset();
  //   }
  // }, [approveJourneyIsError, navigate, approveJourneyApiReset]);

  // const [archiveJourney, { isLoading: archiveLoading }] =
  //   useArchiveJourneyMutation();

  const isCanFinish = useMemo(() => {
    if (
      journeyData?.scheduledJourney?.pickupTime &&
      journeyData.vehicleDriverId
    ) {
      const pickupTime = new Date(journeyData.scheduledJourney.pickupTime);

      if (!isNaN(pickupTime.getTime())) {
        const now = new Date();
        const oneHourInMilliseconds = 60 * 60 * 1000;

        if (
          now.getTime() - pickupTime.getTime() >= oneHourInMilliseconds &&
          !FINISHED_STATUSES.includes(journeyData.status as ETripStatus)
        ) {
          return true;
        }
      }
    }
    return false;
  }, [
    journeyData?.scheduledJourney?.pickupTime,
    journeyData.vehicleDriverId,
    journeyData.status,
  ]);

  const isCanDuplicate = useMemo(
    () =>
      DUPLICATE_STATUSES.includes(journeyData.status as ETripStatus) &&
      user?.id === journeyData.metadata.orderrerInformation?.id,
    [journeyData, user?.id]
  );

  const isCanEdit = useMemo(
    () => EDIT_STATUSES.includes(journeyData.status as ETripStatus),
    [journeyData?.status]
  );

  const isCanArchive = useMemo(
    () => ARCHIVE_STATUSES.includes(journeyData.status as ETripStatus),
    [journeyData?.status]
  );

  const isCancelJourney = useMemo(
    () => CANCEL_STATUSES.includes(journeyData.status as ETripStatus),
    [journeyData?.status]
  );

  const isCanApprove = useMemo(() => {
    if (
      journeyData.status === ETripStatus.PENDING &&
      !journeyData.dispatcherId
    ) {
      return true;
    }
    if (
      journeyData.status === ETripStatus.PENDING_UPDATE_ACCEPTED &&
      journeyData.dispatcherId
    ) {
      return true;
    }
    return false;
  }, [journeyData]);

  const isReAssignShow = useMemo(
    () => REASSIGN_STATUSES.includes(journeyData.status as ETripStatus),
    [journeyData?.status]
  );

  // const handleApproveJorney = useCallback(async () => {
  //   await approveJourneyApi(journeyId || '');
  // }, [approveJourneyApi, journeyId]);

  // const archiveJourneyHandler = useCallback(() => {
  //   if (journeyData) {
  //     archiveJourney({ journeyId: journeyData?.id });
  //   }
  // }, [archiveJourney, journeyData]);

  // const persistJourneyData = useCallback(() => {
  //   try {
  //     localStorage.setItem(
  //       JOURNEY_CREATE_WIZARD_LOCAL_STORAGE_KEY,
  //       JSON.stringify({
  //         data: journeyToWizardData(journeyData),
  //         step: 'userDetails',
  //       })
  //     );
  //   } catch (error) {
  //     console.error('Error persisting journey data', error);

  //     throw error;
  //   }
  // }, [journeyData]);

  // const handleDuplicateJourney = useCallback(() => {
  //   if (journeyData) {
  //     try {
  //       persistJourneyData();
  //       if (journeyData.scheduledJourney?.fullFlightInformation) {
  //         navigate(
  //           '/journeys?createJourney=true&journeyWizard=flightInformation'
  //         );
  //       } else {
  //         navigate(
  //           '/journeys?createJourney=true&journeyWizard=transferDetails'
  //         );
  //       }
  //     } catch (error) {
  //       toast.error('Failed to duplicate journey.');
  //     }
  //   }
  // }, [dispatch, journeyData, navigate]);

  // const handleExportPdf = useCallback(async () => {
  //   await exportJourneyToPdfAPI(journeyId || '');
  // }, [journeyId, exportJourneyToPdfAPI]);

  return {
    data: {
      journeyData,
      user,
      // approveJorneyIsLoading,
      // exportJourneyToPdfIsLoading,
      isCanArchive,
      isCanFinish,
      isCanEdit,
      // archiveLoading,
      navigate,
      isCancelJourney,
      isReAssignShow,
      isCanApprove,
      isCanDuplicate,
    },
    handlers: {
      // handleDuplicateJourney,
      // handleApproveJorney,
      // handleExportPdf,
      // archiveJourneyHandler,
    },
  };
};
