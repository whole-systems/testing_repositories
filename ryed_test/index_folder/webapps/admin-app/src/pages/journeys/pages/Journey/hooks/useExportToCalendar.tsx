import { TJourney } from '@/models/journey';
import { parseLocationName } from '@/utils/parseLocationName/parseLocationName';
import { composeReadableTime } from '@ryed-ui/utils/parseTime';
import { addHours, differenceInMinutes } from 'date-fns';

type CalendarEvent = {
  summary: string;
  description: string;
  start: string;
  end: string;
  url: string;
  startDate: Date;
  endDate: Date;
};
export const useExportToCalendar = () => {
  const addToGoogleCalendar = (event: CalendarEvent) => {
    const baseURL = 'https://www.google.com/calendar/render';
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: event.summary,
      dates: `${event.startDate
        .toISOString()
        .replace(/-|:|\.\d\d\d/g, '')
        .slice(0, -1)}Z/${event.endDate
        .toISOString()
        .replace(/-|:|\.\d\d\d/g, '')
        .slice(0, -1)}Z`,
      details: event.description,
      sf: 'true',
      output: 'xml',
    });

    const url = `${baseURL}?${params.toString()}`;
    window.open(url, '_blank');
  };

  // const addToLocalCalendar = (event: CalendarEvent) => {
  //   const startDate = event.startDate;
  //
  //   createEvent({
  //     title: event.summary,
  //     description: event.description,
  //     start: [startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate(), startDate.getHours(), startDate.getMinutes()],
  //     duration: { minutes: 1 },
  //   }, (error, value) => {
  //     if (error) {
  //       console.log(error);
  //       return;
  //     }
  //     const blob = new Blob([value], { type: 'text/calendar' });
  //     const url = window.URL.createObjectURL(blob);
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', 'journey.ics');
  //     document.body.appendChild(link);
  //     link.click();
  //   });
  // };

  const useAddToCalendar = (journey: TJourney | undefined) => {
    if (!journey) return;

    const {
      scheduledJourney,
      unavailabilitySchedule,
      vehicle,
      fromAddress,
      toAddress,
      user,
      toLatLang,
      fromLatLang,
    } = journey;

    if (scheduledJourney && fromAddress && toAddress) {
      const startDate = new Date(
        unavailabilitySchedule?.unavailableFrom ?? scheduledJourney.pickupTime
      );
      const endDate = unavailabilitySchedule?.unavailableUntil
        ? new Date(unavailabilitySchedule?.unavailableUntil)
        : addHours(startDate, 1);
      const startTime = composeReadableTime(
        startDate,
        fromLatLang.country || toLatLang.country
      ).normalizedDateWithTime;
      const endTime = composeReadableTime(
        endDate,
        fromLatLang.country || toLatLang.country
      ).normalizedDateWithTime;
      const event = {
        summary: `Driver - Driver: ${
          journey.vehicleDriver?.firstName
        }, from ${parseLocationName(fromLatLang)} to ${parseLocationName(
          toLatLang
        )}`,
        description: `Driver: ${journey.vehicleDriver?.firstName} ${
          journey.vehicleDriver?.lastName
        }
From: ${parseLocationName(fromLatLang)}
To: ${parseLocationName(toLatLang)}

Pick User: ${user?.firstName} ${user?.lastName}
Phone Number: ${user?.phoneNumber}

From: ${startTime}
Until: ${endTime}
User Pickup Time: ${
          composeReadableTime(
            new Date(scheduledJourney.pickupTime),
            fromLatLang.country || toLatLang.country
          ).normalizedDateWithTime
        }

vehicle: ${vehicle?.make} ${vehicle?.model} ${vehicle?.registeredNumber}
`,
        start: startTime,
        end: endTime,
        url: window.location.href,
        startDate,
        endDate,
        durationInMinutes: differenceInMinutes(endDate, startDate),
      };

      addToGoogleCalendar(event);

      // addToLocalCalendar(event);
    }
  };

  return { handleAddToCalendar: useAddToCalendar };
};
