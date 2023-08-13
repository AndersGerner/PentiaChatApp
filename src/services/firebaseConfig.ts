// firebaseSetup.ts

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCN1s1H9B8yknttdiRPuItcHvdI_txfmow',
  authDomain: 'pentiachatapp-af224.firebaseapp.com',
  projectId: 'pentiachatapp-af224',
  storageBucket: 'pentiachatapp-af224.appspot.com',
  messagingSenderId: '150056297933',
  appId: '1:150056297933:web:4c02bbf5cd3013d121d084',
  measurementId: 'G-712QFE4B94',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const firestore = firebase.firestore();
export const auth = firebase.auth();
