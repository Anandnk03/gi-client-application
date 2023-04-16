import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// import 'firebase/compat/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyD1QSHF5QAqWSPRfvcF1HI6AkPxRad4dgM',
  authDomain: 'exptrackerapp.firebaseapp.com',
  projectId: 'exptrackerapp',
  storageBucket: 'exptrackerapp.appspot.com',
  messagingSenderId: '922475543432',
  appId: '1:922475543432:web:a6a7caa9c7da3524add83d',
  measurementId: 'G-23F3M4403S',
};

firebase.initializeApp(firebaseConfig);
// firebase.analytics();
