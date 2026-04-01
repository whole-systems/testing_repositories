// import { ETripStatus, TJourney } from '@/models/journey';
// import {
//   getJourneyStatus,
//   // isJourneyStatusForCancel,
// } from '@/utils/maps/journeyStatusMap';
// // import { useQueryOpen } from '@ryed-ui/hooks/useQueryOpen';
// import { Badge } from '@ryed/ui/ui/Badge';
// import { Button } from '@ryed/ui/ui/Button';
// import { capitalize } from 'lodash';
// import { CopyPlus, EllipsisIcon, FileText, Pencil, Plus } from 'lucide-react';
// import { FC } from 'react';
// import { useTranslation } from 'react-i18next';
// // import { EDIT_JOURNEY_QUERY_KEY } from '../../../JourneyEdit/consts';
// import { useExportToCalendar } from '../../hooks/useExportToCalendar';
// import { ApproveJourneySheet } from '../AssignJourneySheet/AssignJourneySheet';
// import { CancelJourneyDialog } from '../CancelJourneyDialog/CancelJourneyDialog';
// import { FinishJourneyDialog } from '../FinishJourneyDialog/FinishJourneyDialog';
// import { useJourneyHeader } from './hooks/useJourneyHeader';

// export const JourneyHeader: FC<{ journeyData: TJourney }> = ({
//   journeyData,
// }) => {
//   const { data, handlers } = useJourneyHeader({ journeyData });
//   const { handleAddToCalendar } = useExportToCalendar();
//   // const { setOpen: setIsEditJourneyDialogOpen } = useQueryOpen({
//   //   queryKey: EDIT_JOURNEY_QUERY_KEY,
//   // });
//   const { t } = useTranslation();
//   return (
//     <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
//       <Badge
//         className="text-lg font-semibold px-4 py-2 mb-4 md:mb-0 mr-4"
//         variant={getJourneyStatus(journeyData.status) || 'default'}
//       >
//         Status:{' '}
//         {capitalize(getJourneyStatus(journeyData.status) || journeyData.status)}
//       </Badge>
//       <div className="sm:space-y-0 md:space-x-2 flex  flex-row flex-wrap gap-2">
//         {data.isCanFinish && <FinishJourneyDialog />}
//         {data.isCanArchive && (
//           <Button
//             variant="outline"
//             onClick={handlers.archiveJourneyHandler}
//             loading={data.archiveLoading}
//             className="sm:w-auto"
//           >
//             {t('journeys:journey.journeyAction.archiveJourney')}
//           </Button>
//         )}
//         {!data.isCancelJourney && (
//           <>
//             {journeyData?.scheduledJourney?.pickupTime && (
//               <Button
//                 variant="outline"
//                 onClick={() => handleAddToCalendar(journeyData)}
//                 disabled={
//                   !(journeyData?.vehicleId && journeyData?.vehicleDriverId)
//                 }
//                 className="sm:w-auto bg-blue-600 hover:bg-blue-800 text-white"
//               >
//                 {t('journeys:journey.journeyAction.exportToCalendar')}
//               </Button>
//             )}
//             {!journeyData.dispatcherId && (
//               <Button
//                 onClick={() => handlers.handleApproveJorney()}
//                 loading={data.approveJorneyIsLoading}
//                 className="sm:w-auto"
//               >
//                 <Plus className="mr-2 h-4 w-4" />
//                 {t('journeys:journey.journeyAction.approveJourney')}
//               </Button>
//             )}
//             {data.isCanDuplicate && (
//               <Button
//                 onClick={handlers.handleDuplicateJourney}
//                 className="sm:w-auto"
//               >
//                 <CopyPlus className="mr-2 h-4 w-4" />
//                 {t('journeys:journey.journeyAction.duplicateJourney')}
//               </Button>
//             )}
//             {journeyData.metadata.orderrerInformation?.id === data.user?.id &&
//               data.isCanEdit && (
//                 <Button onClick={() => setIsEditJourneyDialogOpen(true)}>
//                   <Pencil className="mr-2 h-4 w-4" />
//                   {t('journeys:journey.journeyAction.editJourney')}
//                 </Button>
//               )}

//             {journeyData?.status === ETripStatus.PENDING &&
//               journeyData.dispatcherId === data.user?.id &&
//               !journeyData?.vehicleDriverId && <ApproveJourneySheet />}
//             {data.isReAssignShow && <ApproveJourneySheet reAssign />}

//             {journeyData?.status === ETripStatus.PENDING_UPDATE_ACCEPTED && (
//               <ApproveJourneySheet
//                 reAssign={!!journeyData.vehicleDriverId}
//                 isUpdatedAccepted
//               />
//             )}

//             {journeyData.metadata.orderrerInformation?.id === data.user?.id &&
//               isJourneyStatusForCancel(journeyData.status as ETripStatus) && (
//                 <CancelJourneyDialog />
//               )}
//             {journeyData.vehicleId && (
//               <Button
//                 disabled={data.exportJourneyToPdfIsLoading}
//                 onClick={handlers.handleExportPdf}
//                 className=" sm:w-auto"
//               >
//                 {data.exportJourneyToPdfIsLoading ? (
//                   <EllipsisIcon className="h-4 w-4" />
//                 ) : (
//                   <FileText className="h-4 w-4" />
//                 )}
//               </Button>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };
