//path: frontend/src/services/fireBaseConfig.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const fireBaseConfig = {
  apiKey: "AIzaSyC6m0Y7ny-tmoAmSI8Lqzi30Ae6ffbgHAo",
  authDomain: "almoxarifado-inatel.firebaseapp.com",
  projectId: "almoxarifado-inatel",
  storageBucket: "almoxarifado-inatel.firebasestorage.app",
  messagingSenderId: "296153505650",
  appId: "1:296153505650:web:9196bc189ab11dacbb47eb"
};

//inicializar o Firebase
const app = initializeApp(fireBaseConfig);

//obter a instancia do Auth e Firestore
const auth = getAuth(app);
const db = getFirestore(app);

//expotar funcs
export { auth, db };