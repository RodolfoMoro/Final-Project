// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
 export  const firebaseConfig = {
  apiKey: "AIzaSyBv08o5hNQAF2hQ4h1ju-6X7SS6N3CCet4",
  authDomain: "fir-v9-b155f.firebaseapp.com",
  projectId: "fir-v9-b155f",
  storageBucket: "fir-v9-b155f.appspot.com",
  messagingSenderId: "162863524751",
  appId: "1:162863524751:web:29dbef15b167b50cda39fa"
};

const app = initializeApp(firebaseConfig);

 const authentication = getAuth(app);

 const firebase = getFirestore(app);

export {authentication,firebase}