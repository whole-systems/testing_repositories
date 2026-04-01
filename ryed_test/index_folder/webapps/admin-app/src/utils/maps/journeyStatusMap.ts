import { ETripStatus } from '@/models/journey';

export const journeyStatusMap = {
  'in-progress': [
    ETripStatus.DRIVER_ON_THE_WAY,
    ETripStatus.DRIVER_AT_PICKUP_SPOT,
    ETripStatus.IN_PROGRESS,
  ],
  future: [
    ETripStatus.PENDING_SCHEDULED_JOURNEY,
    ETripStatus.SEARCHING_FOR_DRIVER,
  ],
  pending: [ETripStatus.PENDING],
  finished: [ETripStatus.FINISHED],
  unfulfilled: [ETripStatus.CANCELLED_BY_DRIVER, ETripStatus.CANCELLED_BY_USER],
  archived: [ETripStatus.ARCHIVED],
} as Record<string, ETripStatus[]>;

export const getJourneyStatus = (status: string) =>
  Object.keys(journeyStatusMap).find((key) =>
    journeyStatusMap[key].includes(status as ETripStatus)
  ) ?? null;
