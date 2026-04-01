export default {
  addVehicleForm: {
    openBtn: 'Vehicle',
    title: 'New Vehicle',
    fields: {
      type: {
        name: 'Type',
        placeholder: 'Select type',
      },
      year: {
        name: 'Years',
        placeholder: 'Select year',
      },
      make: {
        name: 'Make',
        placeholder: 'Select make',
      },
      model: {
        name: 'Model',
        placeholder: 'Select model',
      },
      color: {
        name: 'Colors',
        placeholder: 'Select color',
      },
      numberOfSits: {
        name: 'Number of sits',
        placeholder: 'Select number of sits',
      },
      registeredNumber: {
        name: 'Registered number',
        placeholder: 'Registered number',
      },
      isDisabledAccessable: {
        name: 'Aisabled accessable',
      },
      isHasTv: {
        name: 'Has TV',
      },
      isChildSitAvailable: {
        name: 'Child sit available',
      },
      isPetFriendly: {
        name: 'Pet friendly',
      },
      isHeatedSeats: {
        name: 'Heated seats',
      },
    },
    addBtn: 'Add Vehicle',
  },
  editVehicleForm: {
    openBtn: 'Edit',
    title: 'Edit Vehicle',
    fields: {
      numberOfSits: {
        name: 'Number of sits',
        placeholder: 'Select number of sits',
      },
      numberOfLaugage: {
        name: 'Number of laugage',
        placeholder: 'Select number of laugage',
      },
      numberOfTrolly: {
        name: 'Number of trolly',
        placeholder: 'Select number of trolly',
      },
      description: {
        name: 'Description',
        placeholder: 'Enter description',
      },
    },
    vehicleImages: {
      front: {
        name: 'Vehicle front',
        placeholder: 'Select vehicle front',
      },
      back: {
        name: 'Vehicle back',
        placeholder: 'Select vehicle back',
      },
      profile: {
        name: 'Vehicle profile',
        placeholder: 'Select vehicle profile',
      },
      side: {
        name: 'Vehicle side',
        placeholder: 'Select vehicle side',
      },
      interior_front: {
        name: 'Interior front',
        placeholder: 'Select interior front',
      },
      interior_back: {
        name: 'Interior back',
        placeholder: 'Select interior back',
      },
    },
    editBtn: 'Confirm',
    delete: {
      deleteBtn: 'Delete Vehicle',
      modalTitle: 'Are you absolutely sure?',
      modalDescription:
        "This action cannot be undone. This will permanently delete this vehicle and remove the vehicle's data from our servers.",
      cancel: 'Cancel',
    },
  },
  vehicle: {
    vehicleInfo: {
      title: 'Vehicle Info',
      make: 'Make',
      model: 'Model',
      color: 'Color',
      year: 'Year',
      numberOfSits: 'Number of sits',
      registeredNumber: 'Registered number',
      type: 'Type',
      description: 'Description',
    },
    vehiclePricing: {
      title: 'Vehicle Pricing',
      carPriceUSD: 'Car price USD',
      pricePerKm: 'Price per KM',
      pricePerMinute: 'Price per Minute',
      minPrice: 'Min price',
    },
  },
};
