export const env = {
  apiUrl: import.meta.env.VITE_REACT_APP_API_URL,
  port: import.meta.env.VITE_PORT,
  googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY,

  // Firebase start
  firebaseApiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
  firebaseAuthDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
  firebaseProjectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
  firebaseStorageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
  firebaseMessagingSenderId: import.meta.env
    .VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  firebaseAppId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID,
  firebaseMeasurementId: import.meta.env.VITE_REACT_APP_FIREBASE_MEASUREMENT_ID,
  firebaseVapidKey: import.meta.env.VITE_REACT_APP_FIREBASE_VAPID_KEY,
  // Firebase end
};
