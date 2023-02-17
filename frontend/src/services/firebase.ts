import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDN8W7fJvNjUfTOiBR7j6wUZdrbtqLc-Ls",
  authDomain: "hackhub-6eb09.firebaseapp.com",
  projectId: "hackhub-6eb09",
  storageBucket: "hackhub-6eb09.appspot.com",
  messagingSenderId: "672501871651",
  appId: "1:672501871651:web:70817644994c2f3493ad96"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
// export const messaging = getMessaging(app);
