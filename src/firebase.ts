// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCB6CwoMSnyKip5s7lT9ImyQb6YpVorqlg",
  authDomain: "mock-exam-995ec.firebaseapp.com",
  projectId: "mock-exam-995ec",
  storageBucket: "mock-exam-995ec.appspot.com",
  messagingSenderId: "984387229487",
  appId: "1:984387229487:web:902f81bcf14e8c350873da",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
