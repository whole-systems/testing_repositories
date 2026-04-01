const cancelModal = {
  openModalBtn: 'Cancel Journey',
  title: 'Cancel Journey',
  description:
    'Are you sure you want to cancel this journey? Once canceled, it cannot be undone.',
  confirmBtn: 'Cancel Journey',
  reasonFieldPlaceholder: 'Reason',
};

const setFinishModal = {
  openBtn: 'Set as Finish',
  title: 'Finish Journey',
  description: 'Are you sure you want to mark this trip as finished?',
  confirmBtn: 'Set as Finished',
};

const updateStatusModal = {
  title: 'Update Status',
  description: 'Are you sure you want to update the status of this journey?',
  confirmBtn: 'Update Status',
  placeholder: 'Select a status',
  confirmationTitle: 'Confirm Action',
  finishConfirmation: 'Are you sure you want to set journey as finished?',
  cancelConfirmation: 'Are you sure you want to cancel the journey?',
  cancelBtn: 'Cancel',
  statusDescriptions: {
    PENDING: 'Journey is waiting to be assigned by dispatcher.',
    PENDING_UPDATE_ACCEPTED:
      'Journey update accepted, waiting to be assigned by dispatcher.',
    PENDING_DRIVER_ACCEPTANCE:
      'Waiting for driver to accept the journey. (after dispatcher is assigned)',
    PENDING_SCHEDULED_JOURNEY:
      'Scheduled journey waiting to start (after driver is assigned).',
    FINISHED: 'Journey is completed.',
    CANCELLED_BY_USER: 'Journey was cancelled by user.',
    CANCELLED_BY_TRAVEL_AGENT: 'Journey was cancelled by travel agent.',
    ARCHIVED: 'Journey has been archived. (only for cancelled journeys)',
  },
  statusErrors: {
    noDispatcher: 'Cannot change status: No dispatcher assigned',
    noDriver: 'Cannot change status: No driver assigned',
    notCancelled: 'Cannot change status: Journey must be cancelled first',
    alreadyFinished: 'Cannot change status: Journey is already finished',
    alreadyArchived: 'Cannot change status: Journey is archived',
  },
};

const assignJourneyToDriverSheet = {
  openModalBtnAssign: 'Assign Journey to Driver',
  openModalBtnReAssign: 'Reassign Journey to Driver',
  openModalBtnConfirm: 'Confirm',
  title: 'Assign Journey to Driver',
  infoFields: {
    carTypeAndExclusivity: {
      label: 'Car Type & Exclusivity',
      carType: 'Car Type',
      exclusivity: 'Exclusivity',
    },
    services: {
      label: 'Services',
    },
    passengersCount: {
      label: 'Passengers Count',
    },
    message: {
      label: 'Message',
    },
  },
  fields: {
    requestDriverApproval: 'Request Driver Approval',
    vehicle: {
      name: 'Vehicle',
      placeholder: 'Select vehicle',
    },
    drivers: {
      label: 'Drivers',
      placeholder: 'Select drivers',
    },
    driver: {
      name: 'Driver',
      placeholder: 'Select driver',
    },
    priceUsd: {
      name: 'Price USD',
      placeholder: 'Price USD',
    },
    price: {
      name: 'Price',
      placeholder: 'Price',
    },
    currencyCode: {
      name: 'Currency',
      placeholder: 'Currency',
    },
  },
  confirmBtnAssign: 'Assign Journey',
  confirmBtnReAssign: 'Reassign Journey',
  confirmBtnConfirm: 'Confirm',
};

const journeyDetails = {
  title: 'Journey Details',
  timing: {
    title: 'Timing',
    scheduledPickup: 'Scheduled Pickup',
  },
  location: {
    title: 'Location',
    from: 'From',
    to: 'To',
  },
  journeyMetrics: {
    title: 'Journey Metrics',
    totalJourneyTime: 'Total Journey Time',
    rideToJourneyTime: 'Ride to Journey Time',
    price: 'Price',
  },
  additionalStops: {
    title: 'Additional Stops',
  },
  additionalServices: {
    title: 'Additional Services',
  },
  message: {
    title: 'Message',
  },
};

const peopleTab = {
  userInfoCard: {
    title: 'User Information',
    name: 'Name',
    phone: 'Phone',
  },
  ordererInfoCard: {
    title: 'Orderer Information',
    name: 'Name',
    phone: 'Phone',
    company: 'Company',
  },
  driverInfoCard: {
    title: 'Driver Information',
    name: 'Name',
    phone: 'Phone',
    noAssigned: 'No driver assigned yet',
  },
};

const vehicleTab = {
  title: 'Vehicle Information',
  make: 'Make',
  model: 'Model',
  year: 'Year',
  color: 'Color',
  registrationNumber: 'Registration Number',
  numberOfSeats: 'Number of Seats',
  noInformation: 'No vehicle information available',
};

const flightInfoTab = {
  title: 'Flight Information',
  departureCard: {
    title: 'Departure',
    airline: 'Airline',
    airport: 'Airport',
    terminal: 'Terminal',
    scheduled: 'Scheduled Departure',
    flightDepartureTime: 'Original Departure Time',
    flightUpdatedDepartureTime: 'Updated Departure Time',
  },
  arrivalCard: {
    title: 'Arrival',
    airline: 'Airline',
    airport: 'Airport',
    terminal: 'Terminal',
    scheduled: 'Scheduled Arrival',
    flightArrivalTime: 'Original Arrival Time',
    flightUpdatedArrivalTime: 'Updated Arrival Time',
  },
  noInformation: 'No flight information available',
};

const paymentTab = {
  noInformation: 'No payment information available',
};

const journeysTableFilterSheet = {
  mainTitle: 'Filter',
  payment: {
    title: 'Payment',
    placeholder: 'No selected',
    values: {
      delayedPayment: 'Delayed payment',
      paidByCreditCard: 'Credit card payment',
      all: 'All',
    },
  },
  status: {
    title: 'Status',
    placeholder: 'No selected',
    values: {
      'in-progress': 'In Progress',
      future: 'Future',
      pending: 'Pending',
      finished: 'Finished',
      cancelled: 'Cancel',
      archived: 'Archived',
    },
  },
  pickupTime: {
    title: 'Pickup time',
    values: {
      selectTime: 'Select time',
      today: 'Today',
      tomorrow: 'Tomorrow',
      thisWeek: 'This Week',
      thisMonth: 'This Month',
      customTime: 'Custom time',
    },
    from: 'From',
    to: 'To',
  },
  drivers: {
    title: 'Drivers',
    placeholder: 'No selected',
  },
  vehicles: {
    title: 'Vehicles',
    placeholder: 'No selected',
  },
  users: {
    title: 'Users',
    placeholder: 'No selected',
  },
  dispatchers: {
    title: 'Dispatchers',
    placeholder: 'No selected',
  },
  travelAgencies: {
    title: 'Travel Agencies',
    placeholder: 'No selected',
  },
  createdTime: {
    title: 'Created time',
    values: {
      selectTime: 'Select time',
      today: 'Today',
      yesterday: 'Yesterday',
      thisWeek: 'This Week',
      thisMonth: 'This Month',
      customTime: 'Custom time',
    },
    from: 'From',
    to: 'To',
  },
  finishedTime: {
    title: 'Finished time',
    values: {
      selectTime: 'Select time',
      today: 'Today',
      yesterday: 'Yesterday',
      thisWeek: 'This Week',
      thisMonth: 'This Month',
      customTime: 'Custom time',
    },
    from: 'From',
    to: 'To',
  },
  buttons: {
    confirmFilter: 'Confirm filter',
    resetFilter: 'Reset filter',
  },
};

const journeysTable = {
  buttons: {
    createJourney: 'Schedule a New Journey',
  },
  triggers: {
    journeys: 'Journeys',
    futureJourneys: 'Future Journeys',
    pendingJourneys: 'Pending Journeys',
  },
};

const Table = {
  columns: {
    status: 'Status',
    scheduledTime: 'Scheduled time',
    clientName: 'Client name',
    vehicleDriver: 'Vehicle driver',
    accepted: 'Accepted',
    vehicle: 'Vehicle',
    fromAddress: 'From address',
    toAddress: 'To address',
    carTypes: 'Car types',
    numberOfPessanger: 'Number of pessanger',
  },
  noResults: 'No results',
};

const journeyCreateUserDetails = {
  fields: {
    firstName: {
      name: 'First Name',
      placeholder: 'First Name',
      helperText: "Enter the passenger's first name",
    },
    lastName: {
      name: 'Last Name',
      placeholder: 'Last Name',
      helperText: "Enter the passenger's last name",
    },
    phoneNumber: {
      name: 'Phone Number',
      placeholder: 'Phone Number',
      helperText: "Enter the passenger's contact number",
    },
    email: {
      name: 'Email',
      placeholder: 'Email',
      helperText: "Enter the passenger's email",
    },
    disableNotification: {
      name: 'Disable SMS/Notification',
      helperText:
        "When this is checked, the user won't receive Sms or Notifications regarding live updates of the Journey",
    },
    journeyType: {
      name: 'Journey Type',
      helperText: 'Select the type of journey',
      placeholder: 'Select a journey type',
      values: {
        schedule: 'Schedule',
      },
    },
    fromAddress: {
      name: 'From Address',
      helperText: 'Enter the pickup location',
      placeholder: 'From Address',
    },
    toAddress: {
      name: 'To Address',
      helperText: 'Enter the drop-off location',
      placeholder: 'To Address',
    },
    additionalStops: {
      title: 'Additional Stops',
      stopPoint: {
        name: 'Stop Point',
        placeholder: 'Stop Point',
      },
      passengers: {
        title: 'Passenger at pickup spot',
        subtitle: 'Passengers info',
        fields: {
          fullName: {
            name: 'Full Name',
            placeholder: 'Full Name',
          },
          phoneNumber: {
            name: 'Phone Number',
            placeholder: 'Phone Number',
          },
        },
      },
    },
  },
};

const createJoruneySteps = {
  userDetails: 'User Details',
  flightInformation: 'Flight Information',
  transferDetails: 'Transfer Details',
  review: 'Review',
};

const flightDetails = {
  title: 'Flight Details',
  monitoring: 'Monitoring',
  departureCard: {
    title: 'Departure',
    airline: 'Airline',
    airport: 'Airport',
    terminal: 'Terminal',
    scheduled: 'Scheduled Departure',
    flightDepartureTime: 'Original Departure Time',
    flightUpdatedDepartureTime: 'Updated Departure Time',
    tooltip: 'Departure information',
  },
  arrivalCard: {
    title: 'Arrival',
    airline: 'Airline',
    airport: 'Airport',
    terminal: 'Terminal',
    scheduled: 'Scheduled Arrival',
    flightArrivalTime: 'Original Arrival Time',
    flightUpdatedArrivalTime: 'Updated Arrival Time',
    scheduledTooltip: 'Click to override flight arrival time.',
    tooltip: 'Arrival information',
  },
  flightArrivalTimeUpdated: 'Flight Arrival Time updated.',
  flightNotAvailable: 'Flight information is not available',
  flightIsBeingTracked: 'Flight is being tracked',
  noFlightInfo: 'No flight information available.',
};

const journeyCreateFlightInfo = {
  fields: {
    flightNumber: {
      name: 'Flight Number',
      placeholder: 'Flight Number',
      helperText: {
        title: 'Flight Number must follow this format:',
        list: {
          first: '2-3 uppercase letters (airline code)',
          second: 'Followed by 1-4 digits',
          third: 'Optionally ending with an uppercase letter',
        },
        example: 'Example: AA1234B',
      },
    },
    flightArrivalTime: {
      name: 'Flight Arrival Time',
      placeholder: 'Flight Arrival Time',
      helperText: 'Enter the expected arrival time of the flight',
    },
    flightDepartureTime: {
      name: 'Flight Departure Time',
      placeholder: 'Flight Departure Time',
      helperText: 'Enter the expected departure time of the flight',
    },
    airport: {
      name: 'Airport',
      placeholder: 'Select airport',
      helperText: 'Select the airport for this journey',
    },
    isArrival: {
      arrival: 'Arrival',
      departure: 'Departure',
    },
  },
  flightDetails,
};

const createJourneyTransferDetails = {
  fields: {
    pickupTime: {
      name: 'Pickup Time',
      placeholder: 'Pickup Time',
      helperText: 'Select the time when the client should be picked up',
    },
    passengerCount: {
      name: 'Passenger Count',
      placeholder: 'Passenger Count',
      helperText: 'Select the number of passengers for this journey',
    },
    additionalServices: {
      name: 'Additional Services',
      placeholder: 'Additional Services',
      helperText: 'Select additional services for this journey',
    },
    message: {
      name: 'Message',
      placeholder: 'Message',
      helperText: 'Enter a message for the driver',
    },
    vehicleType: {
      name: 'Vehicle Type',
      placeholder: 'Select vehicle type',
      helperText: 'Select the type of vehicle for this journey',
    },
  },
  wishToAddFlightNumber: 'wish to add flight number',
  forFlightMonitoring: 'for flight monitoring',
  i: 'I',
};

const reviewUserDetails = {
  title: 'User Details',
  firstName: 'First Name',
  lastName: 'Last Name',
  phoneNumber: 'Phone Number',
  email: 'Email',
  journeyType: 'Journey Type',
  fromAddress: 'From Address',
  toAddress: 'To Address',
  additionalStops: {
    title: 'Additional Stops',
    location: 'Location',
    tableHeader: {
      fullName: 'Full Name',
      phoneNumber: 'Phone Number',
      number: 'No.',
    },
    noAdditionalStops: 'No additional stops',
  },
};

const reviewTransferDetails = {
  title: 'Transfer Details',
  pickupTime: 'Pickup Time',
  passengerCount: 'Passenger Count',
  message: 'Message',
  additionalServices: {
    title: 'Additional Services',
    tableHeader: {
      serviceName: 'Service Name',
      pricePerItem: 'Price per item',
      totalPrice: 'Total Price',
      quantity: 'Quantity',
    },
    noAdditionalServices: 'No additional services',
    loadingServices: 'Loading services information...',
    total: 'Total',
  },
};

const reviewFlightInfo = {
  title: 'Flight Information',
  flightNumber: 'Flight Number',
  flightArrivalTime: 'Flight Arrival Time',
  flightDepartureTime: 'Flight Departure Time',
  airport: 'Airport',
  departureCard: {
    title: 'Departure',
    tooltip: 'Departure information',
    airline: 'Airline',
    airport: 'Airport',
    terminal: 'Terminal',
    flightDepartureTime: 'Original Departure Time',
    flightUpdatedDepartureTime: 'Updated Departure Time',
    scheduled: 'Scheduled Departure',
  },
  arrivalCard: {
    title: 'Arrival',
    tooltip: 'Arrival information',
    airline: 'Airline',
    airport: 'Airport',
    terminal: 'Terminal',
    flightArrivalTime: 'Original Arrival Time',
    flightUpdatedArrivalTime: 'Updated Arrival Time',
    scheduled: 'Scheduled Arrival',
  },
};

const journeyCreateReview = {
  pickupTime: 'Pickup Time',
  userDetails: reviewUserDetails,
  transferDetails: reviewTransferDetails,
  flightInfo: reviewFlightInfo,
};

const journeyCreate = {
  title: 'New Journey',
  titleCreating: 'Creating...',
  userDetails: journeyCreateUserDetails,
  flightInformation: journeyCreateFlightInfo,
  transferDetails: createJourneyTransferDetails,
  review: journeyCreateReview,
  actionBtns: {
    resetJourney: 'Reset',
    continue: 'Continue',
    finish: 'Finish',
    review: 'Review',
    skipFlightInfo: {
      title: 'Skip this step',
      text: 'Skip Flight Information',
    },
  },
  steps: createJoruneySteps,
};

const journeyEditSteps = {
  editJourney: 'Edit Journey',
  preview: 'Preview',
};
const journeyEditUserDetails = {
  title: 'User Details',
  fields: {
    firstName: {
      name: 'First Name',
    },
    lastName: {
      name: 'Last Name',
    },
    phoneNumber: {
      name: 'Phone Number',
    },
    email: {
      name: 'Email',
    },
    journeyType: {
      name: 'Journey Type',
      helperText: 'Select the type of journey',
    },
    fromAddress: {
      name: 'From Address',
      helperText: 'Enter the pickup location',
    },
    toAddress: {
      name: 'To Address',
      helperText: 'Enter the drop-off location',
    },
    additionalStops: {
      name: 'Additional Stops',
      helperText: 'Add additional stops to the journey',
    },
  },
};

const journeyEditFlightDetails = {
  title: 'Flight Details',
  addFlightInformationBtn: 'Add Flight Information',
  arrivalTimeUpdated: 'Flight Arrival Time updated.',
  fields: {
    flightNumber: {
      name: 'Flight Number',
      placeholder: 'Flight Number',
      helperText: {
        title: 'Flight Number must follow this format:',
        list: {
          first: '2-3 uppercase letters (airline code)',
          second: 'Followed by 1-4 digits',
          third: 'Optionally ending with an uppercase letter',
        },
        example: 'Example: AA1234B',
      },
    },
    flightArrivalTime: {
      name: 'Flight Arrival Time',
      placeholder: 'Flight Arrival Time',
      helperText: 'Enter the expected arrival time of the flight',
    },
    flightDepartureTime: {
      name: 'Flight Departure Time',
      placeholder: 'Flight Departure Time',
      helperText: 'Enter the expected departure time of the flight',
    },
    airport: {
      name: 'Airport',
      placeholder: 'Select airport',
      helperText: 'Select the airport for this journey',
    },
  },
};

const journeyEditTransferDetails = {
  title: 'Transfer Details',
  fields: {
    pickupTime: {
      name: 'Pickup Time',
      helperText: 'Select the time when the client should be picked up',
      placeholder: 'Pickup Time',
    },
    vehicleType: {
      name: 'Vehicle Type',
      helperText: 'Select the type of vehicle for this journey',
    },
    passengerCount: {
      name: 'Passenger Count',
      helperText: 'Select the number of passengers for this journey',
    },
    additionalServices: {
      name: 'Additional Services',
      helperText: 'Select additional services for this journey',
    },
    message: {
      name: 'Message',
      helperText:
        'Add any additional notes or special requests from the client',
    },
  },
};

const journeyEdit = {
  journeyEditSteps,
  userDetails: journeyEditUserDetails,
  flightDetails: journeyEditFlightDetails,
  transferDetails: journeyEditTransferDetails,
  reviewBtn: 'Review',
};

const validation = {
  userDetails: {
    firstName: {
      required: 'First name is required',
    },
    lastName: {
      required: 'Last name is required',
    },
    fullName: {
      required: 'Full name is required',
      format: 'Full name must contain first and last name (2 words)',
    },
    phoneNumber: {
      required: 'Phone number is required',
      format: 'Invalid phone number format',
    },
    email: {
      format: 'Invalid email format',
    },
    journeyType: {
      required: 'Journey type is required',
    },
    addFlightInformation: {
      required: 'Add flight information is required',
    },
    location: {
      from: {
        required: 'From location is required',
      },
      to: {
        required: 'To location is required',
      },
      longitude: {
        required: 'Longitude is required',
      },
      latitude: {
        required: 'Latitude is required',
      },
      locationName: {
        required: 'Location name is required',
      },
      locationNameLocalized: {
        required: 'Localized location name is required',
      },
      country: {
        required: 'Country is required',
      },
    },
    additionalStops: {
      required: 'Additional stops are required',
    },
  },
  transferDetails: {
    pickupTime: {
      required: 'Pickup time is required',
    },
    vehicleType: {
      required: 'Vehicle type is required',
      min: 'At least one vehicle type is required',
    },
    passengerCount: {
      required: 'Passenger count is required',
      min: 'At least one passenger is required',
      max: 'Maximum number of passengers is 9999999',
    },
    additionalServices: {
      serviceName: {
        required: 'Service name is required',
      },
      quantity: {
        required: 'Quantity is required',
      },
    },
    message: {
      max: 'Message maximum is 5000 characters',
    },
  },
  flightInformation: {
    flightNumber: {
      required: 'Flight number is required',
      format: 'Flight number must follow this format: AA1234B',
    },
    airport: {
      required: 'Airport is required',
    },
  },
};

const notificationsTable = {
  columns: {
    title: 'Title',
    description: 'Description',
    time: 'Time',
  },
  noInformation: 'This journey has no notifications',
};

export default {
  journey: {
    journeyCreate,
    journeyEdit,
    journeyAction: {
      editJourney: 'Edit Journey',
      cancelModal,
      exportToCalendar: 'Export to Calendar',
      assignJourneyToDriverSheet,
      setFinishModal,
      archiveJourney: 'Archive Journey',
      approveJourney: 'Approve Journey',
      duplicateJourney: 'Duplicate',
      updateStatusModal,
    },
    journeyDetails,
    tabs: {
      tabLabels: {
        people: 'People',
        vehicle: 'Vehicle',
        flightInfo: 'Flight Info',
        timeline: 'Timeline',
        notifications: 'Notifications',
        payment: 'Payment',
      },
      peopleTab,
      vehicleTab,
      flightInfoTab,
      paymentTab,
    },
  },
  journeysTableFilterSheet,
  journeysTable,
  Table,
  validation,
  notificationsTable,
};
