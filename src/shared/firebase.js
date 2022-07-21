import { initializeApp } from 'firebase/app';
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyB1JkQutCBS2Gsv0E8MC8bOMQ41cLpuNj4",
    authDomain: "authex-e0b07.firebaseapp.com",
    projectId: "authex-e0b07",
    storageBucket: "authex-e0b07.appspot.com",
    messagingSenderId: "623888778757",
    appId: "1:623888778757:web:1d141f07aac3fe90acfe6c",
    measurementId: "G-S65P15QYPZ"
};

const app = initializeApp(firebaseConfig);


export const auth =getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;