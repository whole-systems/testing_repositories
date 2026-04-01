export default {
  driversTable: {
    fullName: 'Nom complet',
    phoneNumber: 'Numéro de téléphone',
    status: 'Statut',
  },
  addDriverForm: {
    openBtn: 'Conducteur',
    title: 'Ajouter un conducteur',
    fields: {
      firstName: {
        name: 'Prénom',
        placeholder: 'Prénom',
      },
      lastName: {
        name: 'Nom',
        placeholder: 'Nom',
      },
      email: {
        name: 'Email',
        placeholder: 'Email',
      },
      phoneNumber: {
        name: 'Numéro de téléphone',
        placeholder: 'Numéro de téléphone',
      },
    },
    addDriverBtn: 'Ajouter un conducteur',
  },
  editDriverForm: {
    openBtn: 'Modifier',
    title: 'Modifier le conducteur',
    fields: {
      firstName: {
        name: 'Prénom',
        placeholder: 'Prénom',
      },
      lastName: {
        name: 'Nom',
        placeholder: 'Nom',
      },
      vehicle: {
        name: 'Véhicule',
        placeholder: 'Sélectionner un véhicule',
      },
    },
    editDriverBtn: 'Modifier le conducteur',
    deleteDriverModal: {
      title: 'Êtes-vous absolument sûr ?',
      description:
        'Cette action ne peut pas être annulée. Cela supprimera définitivement ce véhicule et supprimera les données du véhicule de nos serveurs.',
      cancelBtn: 'Annuler',
      deleteBtn: 'Supprimer le conducteur',
    },
    assignVehicleBtn: 'Assigner un véhicule',
    unAssignVehicleBtn: 'Désassigner le véhicule',
  },
  driver: {
    driverInfoCard: {
      title: 'Informations du conducteur',
      status: 'Statut',
      name: 'Nom',
      phoneNumber: 'Numéro de téléphone',
      email: 'Email',
      description: 'Description',
    },
    vehicleInfoCard: {
      title: 'Informations du véhicule',
      make: 'Marque',
      model: 'Modèle',
      color: 'Couleur',
      year: 'Année',
      numberOfSits: 'Nombre de places',
      registrationNumber: "Numéro d'immatriculation",
      type: 'Type',
      carPriceUSD: 'Prix du véhicule (USD)',
      pricePerKM: 'Prix par KM',
      pricePerMin: 'Prix par minute',
      minPrice: 'Prix minimum',
    },
  },
};
