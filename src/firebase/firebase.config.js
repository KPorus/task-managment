// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9AllqanEvMAHGzYiIFsrdryRhl1g99r4",
  authDomain: "task-managment-c8770.firebaseapp.com",
  projectId: "task-managment-c8770",
  storageBucket: "task-managment-c8770.appspot.com",
  messagingSenderId: "807191721480",
  appId: "1:807191721480:web:a75d177f9038b83ae843bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;