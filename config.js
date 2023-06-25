import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA5BdTLIA06i6YrPbAHtZ_kHY7fm6DLp2U",
  authDomain: "projeto-munin.firebaseapp.com",
  projectId: "projeto-munin",
  storageBucket: "projeto-munin.appspot.com",
  messagingSenderId: "741930464420",
  appId: "1:741930464420:web:f0833af9ada5997cb6a231",
  measurementId: "G-48X3PT2RJW"

}

if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export { firebase , db, };