// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFii8ivqaSqiq_vjMBEZ7TJsaEQPITA0Q",
  authDomain: "realtor-clone-react-cb850.firebaseapp.com",
  projectId: "realtor-clone-react-cb850",
  storageBucket: "realtor-clone-react-cb850.appspot.com",
  messagingSenderId: "877615024530",
  appId: "1:877615024530:web:e31e8044713372fc82194b"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore()