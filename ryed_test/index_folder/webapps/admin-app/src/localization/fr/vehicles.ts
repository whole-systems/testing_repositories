export default {
  addVehicleForm: {
    openBtn: 'Véhicule',
    title: 'Nouveau Véhicule',
    fields: {
      type: {
        name: 'Type',
        placeholder: 'Sélectionner le type',
      },
      year: {
        name: 'Années',
        placeholder: "Sélectionner l'année",
      },
      make: {
        name: 'Marque',
        placeholder: 'Sélectionner la marque',
      },
      model: {
        name: 'Modèle',
        placeholder: 'Sélectionner le modèle',
      },
      color: {
        name: 'Couleurs',
        placeholder: 'Sélectionner la couleur',
      },
      numberOfSits: {
        name: 'Nombre de sièges',
        placeholder: 'Sélectionner le nombre de sièges',
      },
      registeredNumber: {
        name: "Numéro d'immatriculation",
        placeholder: "Numéro d'immatriculation",
      },
      isDisabledAccessable: {
        name: 'Accessible aux personnes handicapées',
      },
      isHasTv: {
        name: "Équipé d'une TV",
      },
      isChildSitAvailable: {
        name: 'Siège enfant disponible',
      },
      isPetFriendly: {
        name: 'Accepte les animaux',
      },
      isHeatedSeats: {
        name: 'Sièges chauffants',
      },
    },
    addBtn: 'Ajouter un véhicule',
  },
  editVehicleForm: {
    openBtn: 'Modifier',
    title: 'Modifier le véhicule',
    fields: {
      numberOfSits: {
        name: 'Nombre de sièges',
        placeholder: 'Sélectionner le nombre de sièges',
      },
      numberOfLaugage: {
        name: 'Nombre de bagages',
        placeholder: 'Sélectionner le nombre de bagages',
      },
      numberOfTrolly: {
        name: 'Nombre de chariots',
        placeholder: 'Sélectionner le nombre de chariots',
      },
      description: {
        name: 'Description',
        placeholder: 'Entrer une description',
      },
    },
    vehicleImages: {
      front: {
        name: 'Vue avant',
        placeholder: 'Sélectionner la vue avant',
      },
      back: {
        name: 'Vue arrière',
        placeholder: 'Sélectionner la vue arrière',
      },
      profile: {
        name: 'Vue de profil',
        placeholder: 'Sélectionner la vue de profil',
      },
      side: {
        name: 'Vue latérale',
        placeholder: 'Sélectionner la vue latérale',
      },
      interior_front: {
        name: 'Intérieur avant',
        placeholder: "Sélectionner l'intérieur avant",
      },
      interior_back: {
        name: 'Intérieur arrière',
        placeholder: "Sélectionner l'intérieur arrière",
      },
    },
    editBtn: 'Confirmer',
    delete: {
      deleteBtn: 'Supprimer le véhicule',
      modalTitle: 'Êtes-vous absolument sûr ?',
      modalDescription:
        'Cette action ne peut pas être annulée. Cela supprimera définitivement ce véhicule et supprimera les données du véhicule de nos serveurs.',
      cancel: 'Annuler',
    },
  },
  vehicle: {
    vehicleInfo: {
      title: 'Informations sur le véhicule',
      make: 'Marque',
      model: 'Modèle',
      color: 'Couleur',
      year: 'Année',
      numberOfSits: 'Nombre de sièges',
      registeredNumber: "Numéro d'immatriculation",
      type: 'Type',
      description: 'Description',
    },
    vehiclePricing: {
      title: 'Tarification du véhicule',
      carPriceUSD: 'Prix du véhicule en USD',
      pricePerKm: 'Prix par KM',
      pricePerMinute: 'Prix par minute',
      minPrice: 'Prix minimum',
    },
  },
};
