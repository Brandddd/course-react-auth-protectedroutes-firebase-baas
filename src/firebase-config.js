// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; //CONEXION HACIA LA AUTENTICACION 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkQOVMvvREDZhi60ZRYIkWTdYtbangilY",
  authDomain: "react-firebase-app-780a8.firebaseapp.com",
  projectId: "react-firebase-app-780a8",
  storageBucket: "react-firebase-app-780a8.appspot.com",
  messagingSenderId: "207063873777",
  appId: "1:207063873777:web:05c47f816bb579064bd150"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);    //SE EJECUTA Y PONE LA CONEXION CON EL BACKEND FIREBASE
export const auth = getAuth(app)              //PERMITE LA CREACION DE LOS USUARIOS YA SEA CON GOOGLE U OTRA PLATAFORMA