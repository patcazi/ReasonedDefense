import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";

// Your Firebase configuration from the Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAum7rziCChYa5VSpSpx3LLWVHedALWhIo",
  authDomain: "reasoneddefense.firebaseapp.com",
  projectId: "reasoneddefense",
  storageBucket: "reasoneddefense.firebasestorage.app",
  messagingSenderId: "41808702245",
  appId: "1:41808702245:web:699295ad22f4cc016308cc",
};

const app = initializeApp(firebaseConfig);
export const functions = getFunctions(app);
export const helloWorldFunction = httpsCallable(functions, 'helloWorld'); 