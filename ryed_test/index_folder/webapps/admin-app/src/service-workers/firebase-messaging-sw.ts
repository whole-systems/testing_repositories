//@ts-nocheck

if (typeof importScripts === 'function') {
  importScripts(
    'https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js'
  );
  importScripts(
    'https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js'
  );

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env
      .VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_REACT_APP_FIREBASE_MEASUREMENT_ID,
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging(firebaseApp);

  messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message',
      payload
    );

    self.clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clients) => {
        clients.forEach((client) => {
          client.postMessage(payload);
        });
      });

    if (payload.data.type !== 'SyncNotifications') {
      const notificationTitle = payload.notification?.title || '';
      const notificationOptions = {
        body: payload.notification?.body,
        icon: '/assets/notification-icon.png',
      };
      self.registration.showNotification(
        notificationTitle,
        notificationOptions
      );
    }
  });

  self.addEventListener('install', () => {
    console.log('Service Worker installed!');
  });
}
