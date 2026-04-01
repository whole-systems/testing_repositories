const cancelModal = {
  openModalBtn: 'Annuler le trajet',
  title: 'Annuler le trajet',
  description:
    'Êtes-vous sûr de vouloir annuler ce trajet ? Une fois annulé, il ne peut pas être rétabli.',
  confirmBtn: 'Annuler le trajet',
  reasonFieldPlaceholder: 'Raison',
};

const setFinishModal = {
  openBtn: 'Marquer comme terminé',
  title: 'Marquer comme terminé',
  description: 'Êtes-vous sûr de vouloir marquer ce trajet comme terminé ?',
  confirmBtn: 'Marquer comme terminé',
};

const updateStatusModal = {
  title: 'Mettre à jour le statut',
  description:
    'Êtes-vous sûr de vouloir mettre à jour le statut de ce trajet ?',
  confirmBtn: 'Mettre à jour le statut',
  placeholder: 'Sélectionner un statut',
  confirmationTitle: "Confirmer l'action",
  finishConfirmation:
    'Êtes-vous sûr de vouloir marquer le trajet comme terminé ?',
  cancelConfirmation: 'Êtes-vous sûr de vouloir annuler le trajet ?',
  cancelBtn: 'Annuler',
  statusDescriptions: {
    PENDING: "Le trajet attend d'être assigné par le dispatcher.",
    PENDING_UPDATE_ACCEPTED:
      "Mise à jour du trajet acceptée, en attente d'assignation par le dispatcher.",
    PENDING_DRIVER_ACCEPTANCE:
      'En attente que le chauffeur accepte le trajet. (après assignation par le dispatcher)',
    PENDING_SCHEDULED_JOURNEY:
      'Trajet programmé en attente de début. (après assignation du chauffeur)',
    FINISHED: 'Le trajet est terminé.',
    CANCELLED_BY_USER: "Le trajet a été annulé par l'utilisateur.",
    CANCELLED_BY_TRAVEL_AGENT: "Le trajet a été annulé par l'agent de voyage.",
    ARCHIVED: 'Le trajet a été archivé. (uniquement pour les trajets annulés)',
  },
  statusErrors: {
    noDispatcher: 'Impossible de changer le statut : Aucun dispatcher assigné',
    noDriver: 'Impossible de changer le statut : Aucun chauffeur assigné',
    notCancelled:
      "Impossible de changer le statut : Le trajet doit d'abord être annulé",
    alreadyFinished:
      'Impossible de changer le statut : Le trajet est déjà terminé',
    alreadyArchived: 'Impossible de changer le statut : Le trajet est archivé',
  },
};

const assignJourneyToDriverSheet = {
  openModalBtnAssign: 'Assigner le trajet au chauffeur',
  openModalBtnReAssign: 'Réassigner le trajet au chauffeur',
  openModalBtnConfirm: 'Confirm',
  title: 'Assigner le trajet au chauffeur',
  infoFields: {
    carTypeAndExclusivity: {
      label: 'Type de véhicule & Exclusivité',
      carType: 'Type de véhicule',
      exclusivity: 'Exclusivité',
    },
    services: {
      label: 'Services',
    },
    passengersCount: {
      label: 'Nombre de passagers',
    },
    message: {
      label: 'Message',
    },
  },
  fields: {
    requestDriverApproval: "Demander l'approbation du chauffeur",
    vehicle: {
      name: 'Véhicule',
      placeholder: 'Sélectionner un véhicule',
    },
    drivers: {
      label: 'Chauffeurs',
      placeholder: 'Sélectionner des chauffeurs',
    },
    driver: {
      name: 'Chauffeur',
      placeholder: 'Sélectionner un chauffeur',
    },
    priceUsd: {
      name: 'Prix USD',
      placeholder: 'Prix USD',
    },
    price: {
      name: 'Prix (optionnel)',
      placeholder: 'Prix (optionnel)',
    },
    currencyCode: {
      name: 'Devise',
      placeholder: 'Devise',
    },
  },
  confirmBtnAssign: 'Assigner le trajet',
  confirmBtnReAssign: 'Réassigner le trajet',
  confirmBtnConfirm: 'Confirm',
};

const journeyDetails = {
  title: 'Détails du trajet',
  timing: {
    title: 'Horaires',
    scheduledPickup: 'Heure de prise en charge prévue',
  },
  location: {
    title: 'Localisation',
    from: 'De',
    to: 'À',
  },
  journeyMetrics: {
    title: 'Métriques du trajet',
    totalJourneyTime: 'Durée totale du trajet',
    rideToJourneyTime: 'Temps de conduite',
    price: 'Prix',
  },
  additionalStops: {
    title: 'Arrêts supplémentaires',
  },
  additionalServices: {
    title: 'Services supplémentaires',
  },
  message: {
    title: 'Message',
  },
};

const peopleTab = {
  userInfoCard: {
    title: 'Informations utilisateur',
    name: 'Nom',
    phone: 'Téléphone',
  },
  ordererInfoCard: {
    title: 'Informations du commanditaire',
    name: 'Nom',
    phone: 'Téléphone',
    company: 'Entreprise',
  },
  driverInfoCard: {
    title: 'Informations du chauffeur',
    name: 'Nom',
    phone: 'Téléphone',
    noAssigned: 'Aucun chauffeur assigné',
  },
};

const vehicleTab = {
  title: 'Informations du véhicule',
  make: 'Marque',
  model: 'Modèle',
  year: 'Année',
  color: 'Couleur',
  registrationNumber: "Numéro d'immatriculation",
  numberOfSeats: 'Nombre de places',
  noInformation: 'Aucune information de véhicule disponible',
};

const flightInfoTab = {
  title: 'Informations de vol',
  departureCard: {
    title: 'Départ',
    airline: 'Compagnie aérienne',
    airport: 'Aéroport',
    terminal: 'Terminal',
    scheduled: 'Départ prévu',
    flightDepartureTime: 'Heure de départ initiale',
    flightUpdatedDepartureTime: 'Heure de départ mise à jour',
  },
  arrivalCard: {
    title: 'Arrivée',
    airline: 'Compagnie aérienne',
    airport: 'Aéroport',
    terminal: 'Terminal',
    scheduled: 'Arrivée prévue',
    flightArrivalTime: "Heure d'arrivée initiale",
    flightUpdatedArrivalTime: "Heure d'arrivée mise à jour",
  },
  noInformation: 'Aucune information de vol disponible',
};

const journeysTableFilterSheet = {
  mainTitle: 'Filtrer',
  payment: {
    title: 'Paiement',
    placeholder: 'Non sélectionné',
    values: {
      delayedPayment: 'Paiement différé',
      paidByCreditCard: 'Paiement par carte de crédit',
      all: 'Tous',
    },
  },
  status: {
    title: 'Statut',
    placeholder: 'Non sélectionné',
    values: {
      'in-progress': 'En cours',
      future: 'Futur',
      pending: 'En attente',
      finished: 'Terminé',
      cancelled: 'Annulé',
      archived: 'Archivé',
    },
  },
  pickupTime: {
    title: 'Temps de collecte',
    values: {
      selectTime: 'Sélectionner le temps',
      today: "Aujourd'hui",
      tomorrow: 'Demain',
      thisWeek: 'Cette semaine',
      thisMonth: 'Ce mois',
      customTime: 'Temps personnalisé',
    },
    from: 'De',
    to: 'À',
  },
  drivers: {
    title: 'Chauffeurs',
    placeholder: 'Non sélectionné',
  },
  vehicles: {
    title: 'Véhicules',
    placeholder: 'Non sélectionné',
  },
  users: {
    title: 'Utilisateurs',
    placeholder: 'Non sélectionné',
  },
  createdTime: {
    title: 'Temps créé',
    values: {
      selectTime: 'Sélectionner le temps',
      today: "Aujourd'hui",
      yesterday: 'Hier',
      thisWeek: 'Cette semaine',
      thisMonth: 'Ce mois',
      customTime: 'Temps personnalisé',
    },
    from: 'De',
    to: 'À',
  },
  finishedTime: {
    title: 'Temps terminé',
    values: {
      selectTime: 'Sélectionner le temps',
      today: "Aujourd'hui",
      yesterday: 'Hier',
      thisWeek: 'Cette semaine',
      thisMonth: 'Ce mois',
      customTime: 'Temps personnalisé',
    },
    from: 'De',
    to: 'À',
  },
  buttons: {
    confirmFilter: 'Confirmer le filtre',
    resetFilter: 'Réinitialiser le filtre',
  },
};

const journeysTable = {
  buttons: {
    createJourney: 'Planifier un Nouveau Trajet',
  },
  triggers: {
    journeys: 'Trajets',
    futureJourneys: 'Futurs Trajets',
    pendingJourneys: 'Trajets en Attente',
  },
};

const Table = {
  columns: {
    status: 'Statut',
    scheduledTime: 'Temps de collecte',
    clientName: 'Nom du Client',
    vehicleDriver: 'Chauffeur du Véhicule',
    accepted: 'Accepté',
    vehicle: 'Véhicule',
    fromAddress: 'Adresse de départ',
    toAddress: 'Adresse de destination',
    carTypes: 'Types de Voiture',
    numberOfPessanger: 'Nombre de Passagers',
  },
  noResults: 'Aucun résultat',
};

const journeyCreateUserDetails = {
  fields: {
    firstName: {
      name: 'Prénom',
      placeholder: 'Prénom',
      helperText: 'Entrez le prénom du passager',
    },
    lastName: {
      name: 'Nom',
      placeholder: 'Nom',
      helperText: 'Entrez le nom du passager',
    },
    phoneNumber: {
      name: 'Numéro de téléphone',
      placeholder: 'Numéro de téléphone',
      helperText: 'Entrez le numéro de téléphone du passager',
    },
    email: {
      name: 'Email',
      placeholder: 'Email',
      helperText: "Entrez l'email du passager",
    },
    disableNotification: {
      name: 'Désactiver SMS/Notifications',
      helperText:
        "Lorsque cette option est cochée, l'utilisateur ne recevra pas de SMS ou de notifications concernant les mises à jour en direct du trajet",
    },
    journeyType: {
      name: 'Type de trajet',
      helperText: 'Sélectionnez le type de trajet',
      placeholder: 'Sélectionnez un type de trajet',
      values: {
        schedule: 'Planifié',
      },
    },
    fromAddress: {
      name: 'Adresse de départ',
      helperText: 'Entrez le lieu de prise en charge',
      placeholder: 'Adresse de départ',
    },
    toAddress: {
      name: 'Adresse de destination',
      helperText: 'Entrez le lieu de dépose',
      placeholder: 'Adresse de destination',
    },
    additionalStops: {
      title: 'Arrêts supplémentaires',
      stopPoint: {
        name: "Point d'arrêt",
        placeholder: "Point d'arrêt",
      },
      passengers: {
        title: 'Passager au point de prise en charge',
        subtitle: 'Informations passagers',
        fields: {
          fullName: {
            name: 'Nom complet',
            placeholder: 'Nom complet',
          },
          phoneNumber: {
            name: 'Numéro de téléphone',
            placeholder: 'Numéro de téléphone',
          },
        },
      },
    },
  },
};

const createJoruneySteps = {
  userDetails: 'Détails utilisateur',
  flightInformation: 'Informations vol',
  transferDetails: 'Détails transfert',
  review: 'Récapitulatif',
};
const flightDetails = {
  title: 'Détails du vol',
  monitoring: 'Surveillance',
  departureCard: {
    title: 'Départ',
    airline: 'Compagnie aérienne',
    airport: 'Aéroport',
    terminal: 'Terminal',
    scheduled: 'Départ prévu',
    flightDepartureTime: 'Heure de départ initiale',
    flightUpdatedDepartureTime: 'Heure de départ mise à jour',
    tooltip: 'Information de départ',
  },
  arrivalCard: {
    title: 'Arrivée',
    airline: 'Compagnie aérienne',
    airport: 'Aéroport',
    terminal: 'Terminal',
    scheduled: 'Arrivée prévue',
    flightArrivalTime: "Heure d'arrivée initiale",
    flightUpdatedArrivalTime: "Heure d'arrivée mise à jour",
    scheduledTooltip: "Cliquez pour modifier l'heure d'arrivée du vol.",
    tooltip: "Information d'arrivée",
  },
  flightArrivalTimeUpdated: "L'heure d'arrivée du vol a été mise à jour.",
  flightNotAvailable: 'Les informations du vol ne sont pas disponibles',
  flightIsBeingTracked: 'Le vol est suivi',
  noFlightInfo: 'Aucune information de vol disponible.',
};
const journeyCreateFlightInfo = {
  fields: {
    flightNumber: {
      name: 'Numéro de vol',
      placeholder: 'Numéro de vol',
      helperText: {
        title: 'Le numéro de vol doit suivre ce format :',
        list: {
          first: '2-3 lettres majuscules (code compagnie)',
          second: 'Suivi de 1-4 chiffres',
          third: 'Éventuellement terminé par une lettre majuscule',
        },
        example: 'Exemple : AA1234B',
      },
    },
    flightArrivalTime: {
      name: "Heure d'arrivée du vol",
      placeholder: "Heure d'arrivée du vol",
      helperText: "Entrez l'heure d'arrivée prévue du vol",
    },
    flightDepartureTime: {
      name: 'Heure de départ du vol',
      placeholder: 'Heure de départ du vol',
      helperText: "Entrez l'heure de départ prévue du vol",
    },
    airport: {
      name: 'Aéroport',
      placeholder: 'Sélectionnez un aéroport',
      helperText: "Sélectionnez l'aéroport pour ce trajet",
    },
    isArrival: {
      arrival: 'Arrivée',
      departure: 'Départ',
    },
  },
  flightDetails,
};
const createJourneyTransferDetails = {
  fields: {
    pickupTime: {
      name: 'Heure de prise en charge',
      placeholder: 'Heure de prise en charge',
      helperText:
        "Sélectionnez l'heure à laquelle le client doit être pris en charge",
    },
    passengerCount: {
      name: 'Nombre de passagers',
      placeholder: 'Nombre de passagers',
      helperText: 'Sélectionnez le nombre de passagers pour ce trajet',
    },
    additionalServices: {
      name: 'Services additionnels',
      placeholder: 'Services additionnels',
      helperText: 'Sélectionnez des services additionnels pour ce trajet',
    },
    message: {
      name: 'Message',
      placeholder: 'Message',
      helperText: 'Entrez un message pour le chauffeur',
    },
    vehicleType: {
      name: 'Type de véhicule',
      placeholder: 'Sélectionnez le type de véhicule',
      helperText: 'Sélectionnez le type de véhicule pour ce trajet',
    },
  },
  wishToAddFlightNumber: 'souhaite ajouter un numéro de vol',
  forFlightMonitoring: 'pour le suivi du vol',
  i: 'Je',
};

const reviewUserDetails = {
  title: 'Détails utilisateur',
  firstName: 'Prénom',
  lastName: 'Nom',
  phoneNumber: 'Numéro de téléphone',
  email: 'Email',
  journeyType: 'Type de trajet',
  fromAddress: 'Adresse de départ',
  toAddress: 'Adresse de destination',
  additionalStops: {
    title: 'Arrêts supplémentaires',
    location: 'Emplacement',
    tableHeader: {
      fullName: 'Nom complet',
      phoneNumber: 'Numéro de téléphone',
      number: 'N°',
    },
    noAdditionalStops: "Pas d'arrêts supplémentaires",
  },
};

const reviewTransferDetails = {
  title: 'Détails du transfert',
  pickupTime: 'Heure de prise en charge',
  passengerCount: 'Nombre de passagers',
  message: 'Message',
  additionalServices: {
    title: 'Services additionnels',
    tableHeader: {
      serviceName: 'Nom du service',
      pricePerItem: 'Prix par article',
      totalPrice: 'Prix total',
      quantity: 'Quantité',
    },
    noAdditionalServices: 'Pas de services additionnels',
    loadingServices: 'Chargement des informations des services...',
    total: 'Total',
  },
};

const reviewFlightInfo = {
  title: 'Informations de vol',
  flightNumber: 'Numéro de vol',
  flightArrivalTime: "Heure d'arrivée du vol",
  flightDepartureTime: 'Heure de départ du vol',
  airport: 'Aéroport',
  departureCard: {
    title: 'Départ',
    tooltip: 'Informations de départ',
    airline: 'Compagnie aérienne',
    airport: 'Aéroport',
    terminal: 'Terminal',
    flightDepartureTime: 'Heure de départ initiale',
    flightUpdatedDepartureTime: 'Heure de départ mise à jour',
    scheduled: 'Départ prévu',
  },
  arrivalCard: {
    title: 'Arrivée',
    tooltip: "Informations d'arrivée",
    airline: 'Compagnie aérienne',
    airport: 'Aéroport',
    terminal: 'Terminal',
    flightArrivalTime: "Heure d'arrivée initiale",
    flightUpdatedArrivalTime: "Heure d'arrivée mise à jour",
    scheduled: 'Arrivée prévue',
  },
};

const journeyCreateReview = {
  pickupTime: 'Heure de prise en charge',
  userDetails: reviewUserDetails,
  transferDetails: reviewTransferDetails,
  flightInfo: reviewFlightInfo,
};

const journeyCreate = {
  title: 'Nouveau trajet',
  titleCreating: 'Création...',
  userDetails: journeyCreateUserDetails,
  flightInformation: journeyCreateFlightInfo,
  transferDetails: createJourneyTransferDetails,
  review: journeyCreateReview,
  actionBtns: {
    resetJourney: 'Réinitialiser',
    continue: 'Continuer',
    finish: 'Terminer',
    review: 'Récapitulatif',
    skipFlightInfo: {
      title: 'Passer cette étape',
      text: 'Passer les informations de vol',
    },
  },
  steps: createJoruneySteps,
};

const journeyEditSteps = {
  editJourney: 'Modifier le trajet',
  preview: 'Aperçu',
};

const journeyEditUserDetails = {
  title: 'Détails utilisateur',
  fields: {
    firstName: {
      name: 'Prénom',
    },
    lastName: {
      name: 'Nom',
    },
    phoneNumber: {
      name: 'Numéro de téléphone',
    },
    email: {
      name: 'Email',
    },
    journeyType: {
      name: 'Type de trajet',
      helperText: 'Sélectionnez le type de trajet',
    },
    fromAddress: {
      name: 'Adresse de départ',
      helperText: 'Entrez le lieu de prise en charge',
    },
    toAddress: {
      name: 'Adresse de destination',
      helperText: 'Entrez le lieu de dépôt',
    },
    additionalStops: {
      name: 'Arrêts supplémentaires',
      helperText: 'Ajouter des arrêts supplémentaires au trajet',
    },
  },
};
const journeyEditFlightDetails = {
  title: 'Détails du vol',
  addFlightInformationBtn: 'Ajouter les informations de vol',
  arrivalTimeUpdated: "L'heure d'arrivée du vol a été mise à jour.",
  fields: {
    flightNumber: {
      name: 'Numéro de vol',
      placeholder: 'Numéro de vol',
      helperText: {
        title: 'Le numéro de vol doit suivre ce format :',
        list: {
          first: '2-3 lettres majuscules (code de la compagnie aérienne)',
          second: 'Suivi de 1-4 chiffres',
          third: 'Possibilité de terminer par une lettre majuscule',
        },
        example: 'Exemple : AA1234B',
      },
    },
    flightArrivalTime: {
      name: "Heure d'arrivée du vol",
      placeholder: "Heure d'arrivée du vol",
      helperText: "Entrez l'heure d'arrivée prévue du vol",
    },
    flightDepartureTime: {
      name: 'Heure de départ du vol',
      placeholder: 'Heure de départ du vol',
      helperText: "Entrez l'heure de départ prévue du vol",
    },
    airport: {
      name: 'Aéroport',
      placeholder: 'Sélectionnez un aéroport',
      helperText: "Sélectionnez l'aéroport pour ce trajet",
    },
  },
};
const journeyEditTransferDetails = {
  title: 'Détails du transfert',
  fields: {
    pickupTime: {
      name: 'Heure de prise en charge',
      helperText:
        "Sélectionnez l'heure à laquelle le client doit être pris en charge",
      placeholder: 'Heure de prise en charge',
    },
    vehicleType: {
      name: 'Type de véhicule',
      helperText: 'Sélectionnez le type de véhicule pour ce trajet',
    },
    passengerCount: {
      name: 'Nombre de passagers',
      helperText: 'Sélectionnez le nombre de passagers pour ce trajet',
    },
    additionalServices: {
      name: 'Services additionnels',
      helperText: 'Sélectionnez des services additionnels pour ce trajet',
    },
    message: {
      name: 'Message',
      helperText:
        'Ajoutez des notes supplémentaires ou des demandes spéciales du client',
    },
  },
};
const journeyEdit = {
  journeyEditSteps,
  userDetails: journeyEditUserDetails,
  flightDetails: journeyEditFlightDetails,
  transferDetails: journeyEditTransferDetails,
  reviewBtn: 'Réviser',
};

const validation = {
  userDetails: {
    firstName: {
      required: 'Prénom est requis',
    },
    lastName: {
      required: 'Nom est requis',
    },
    fullName: {
      required: 'Nom complet est requis',
      format: 'Le nom complet doit contenir un prénom et un nom (2 mots)',
    },
    phoneNumber: {
      required: 'Numéro de téléphone est requis',
      format: 'Format de numéro de téléphone invalide',
    },
    email: {
      format: "Format d'email invalide",
    },
    journeyType: {
      required: 'Type de trajet est requis',
    },
    addFlightInformation: {
      required: 'Informations de vol sont requises',
    },
    location: {
      from: {
        required: 'Lieu de départ est requis',
      },
      to: {
        required: 'Lieu de destination est requis',
      },
      longitude: {
        required: 'Longitude est requis',
      },
      latitude: {
        required: 'Latitude est requise',
      },
      locationName: {
        required: 'Nom de lieu est requis',
      },
      locationNameLocalized: {
        required: 'Nom de lieu localisé est requis',
      },
      country: {
        required: 'Pays est requis',
      },
    },
    additionalStops: {
      required: 'Arrêts supplémentaires sont requis',
    },
  },
  transferDetails: {
    pickupTime: {
      required: 'Temps de collecte est requis',
    },
    vehicleType: {
      required: 'Type de véhicule est requis',
      min: 'Au moins un type de véhicule est requis',
    },
    passengerCount: {
      required: 'Nombre de passagers est requis',
      min: 'Au moins un passager est requis',
      max: 'Nombre de passagers maximum est 9999999',
    },
    additionalServices: {
      serviceName: {
        required: 'Nom du service est requis',
      },
      quantity: {
        required: 'Quantité est requise',
      },
    },
    message: {
      max: 'Message maximum est 5000 caractères',
    },
  },
  flightInformation: {
    flightNumber: {
      required: 'Numéro de vol est requis',
      format: 'Numéro de vol doit suivre ce format: AA1234B',
    },
    airport: {
      required: 'Aéroport est requis',
    },
  },
};

export default {
  journey: {
    journeyCreate,
    journeyEdit,
    journeyAction: {
      editJourney: 'Modifier le trajet',
      cancelModal,
      exportToCalendar: 'Exporter vers le calendrier',
      assignJourneyToDriverSheet,
      setFinishModal,
      updateStatusModal,
      archiveJourney: 'Archiver le trajet',
      approveJourney: 'Approuver le trajet',
      duplicateJourney: 'Dupliquer',
    },
    journeyDetails,
    tabs: {
      tabLabels: {
        people: 'Personnes',
        vehicle: 'Véhicule',
        flightInfo: 'Info vol',
        timeline: 'Chronologie',
        payment: 'Paiement',
      },
      peopleTab,
      vehicleTab,
      flightInfoTab,
    },
  },
  journeysTableFilterSheet,
  journeysTable,
  Table,
  validation,
};
