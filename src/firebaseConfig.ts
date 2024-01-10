import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDeaAd4iJjJIHHcxYMnQEE6CBquJG2dEms',
    authDomain: 'pantry-a7d99.firebaseapp.com',
    projectId: 'pantry-a7d99',
    storageBucket: 'pantry-a7d99.appspot.com',
    messagingSenderId: '647231867091',
    appId: '1:647231867091:web:7c738218251af53b696c26',
};

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

export { firebaseApp, firestore };
