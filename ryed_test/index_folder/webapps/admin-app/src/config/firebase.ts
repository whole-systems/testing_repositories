import { firebaseConfig } from '@/config/firebase.config';
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseMessaging = getMessaging(firebaseApp);
