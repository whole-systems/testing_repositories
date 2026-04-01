export default {
  driversTable: {
    fullName: 'Full name',
    phoneNumber: 'Phone number',
    status: 'Status',
  },
  addDriverForm: {
    openBtn: 'Driver',
    title: 'Add driver',
    fields: {
      firstName: {
        name: 'First name',
        placeholder: 'First name',
      },
      lastName: {
        name: 'Last name',
        placeholder: 'Last name',
      },
      email: {
        name: 'Email',
        placeholder: 'Email',
      },
      verifyEmail: {
        name: 'Verify email',
        placeholder: 'Verify email',
      },
      phoneNumber: {
        name: 'Phone number',
        placeholder: 'Phone number',
      },
    },
    addDriverBtn: 'Add driver',
  },
  editDriverForm: {
    openBtn: 'Edit',
    title: 'Edit driver',
    fields: {
      firstName: {
        name: 'First name',
        placeholder: 'First name',
      },
      lastName: {
        name: 'Last name',
        placeholder: 'Last name',
      },
      vehicle: {
        name: 'Vehicle',
        placeholder: 'Select vehicle',
      },
    },
    editDriverBtn: 'Edit Driver',
    deleteDriverModal: {
      title: 'Are you absolutely sure?',
      description:
        "This action cannot be undone. This will permanently delete this vehicle and remove vehicle's data from our servers.",
      cancelBtn: 'Cancel',
      deleteBtn: 'Delete Driver',
    },
    assignVehicleBtn: 'Assign Vehicle',
    unAssignVehicleBtn: 'Unassign Vehicle',
  },
  driver: {
    driverInfoCard: {
      title: 'Driver info',
      status: 'Status',
      name: 'Name',
      phoneNumber: 'Phone number',
      email: 'Email',
      description: 'Description',
    },
    vehicleInfoCard: {
      title: 'Vehicle info',
      make: 'Make',
      model: 'Model',
      color: 'Color',
      year: 'Year',
      numberOfSits: 'Number of sits',
      registrationNumber: 'Registration number',
      type: 'Type',
      carPriceUSD: 'Car price (USD)',
      pricePerKM: 'Price per KM',
      pricePerMin: 'Price per minute',
      minPrice: 'Min price',
    },
  },
};
