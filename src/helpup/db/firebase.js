// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBd3hNnZsf-EuMQEcnNEhgIlW41hFd7Mx8",
    authDomain: "helpup-78710.firebaseapp.com",
    projectId: "helpup-78710",
    storageBucket: "helpup-78710.firebasestorage.app",
    messagingSenderId: "560007687477",
    appId: "1:560007687477:web:23064c71519bafd2c6b07c",
    measurementId: "G-7MW37GTQ5Y"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
