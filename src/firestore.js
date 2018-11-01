import * as firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyC0kTgBw9n8PjS8HGr0qPzNvTe9tZmQZI4",
  authDomain: "asm-checklist-app.firebaseapp.com",
  databaseURL: "https://asm-checklist-app.firebaseio.com",
  projectId: "asm-checklist-app",
  storageBucket: "asm-checklist-app.appspot.com",
  messagingSenderId: "641578860131"
};

// firebase init
firebase.initializeApp(config);

// firestore init


const settings = {timestampsInSnapshots: true};
firebase.firestore().settings(settings);

firebase.firestore().enablePersistence()
  .then()
  .catch(function (err) {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code === 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
  });


const fs = firebase.firestore();

export default fs;