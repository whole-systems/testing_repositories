export const journeyStatusToReadable = (status: string) => {
  switch (status) {
    case 'PENDING':
      return 'Created';
    case 'PENDING_SCHEDULED_JOURNEY':
      return 'Scheduled';
    case 'SEARCHING_FOR_DRIVER':
      return 'Searching for driver';
    case 'IN_PROGRESS':
      return 'In progress - User Picked';
    case 'FINISHED':
      return 'Confirmed Drop-off';
    case 'DRIVER_AT_PICKUP_SPOT':
      return 'Driver reached pickup spot - waiting to pickup';
    case 'DRIVER_ON_THE_WAY':
      return 'Driver on the way to pickup spot';
    case 'PENDING_DRIVER_ACCEPTANCE':
      return 'Pending driver acceptence';
    default:
      return status;
  }
};
