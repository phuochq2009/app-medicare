// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const requiredKeys = ["apiKey", "authDomain", "projectId", "messagingSenderId", "appId"];
const hasConfiguredValue = (value) =>
  typeof value === "string" && value.trim() !== "" && !value.startsWith("default-");
const isFirebaseConfigured = requiredKeys.every((key) =>
  hasConfiguredValue(firebaseConfig[key])
);
const vapidKey = import.meta.env.VITE_FIREBASE_FCM_PUBLIC_KEY;

const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : null;
const messaging = app && hasConfiguredValue(vapidKey) ? getMessaging(app) : null;

export { app, messaging, getToken, onMessage };
