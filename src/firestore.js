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

export const db = firebase.firestore();

export const fs = {

  switchCheck: (docRef, state) => {
    db.collection('products')
      .doc(docRef)
      .update({'checked': state})
  },

  switchAdd: (docRef, state) => {
    db.collection('products')
      .doc(docRef)
      .update({'onList': state})
  },

  delete: (docRef) => {
    db.collection('products')
      .doc(docRef)
      .delete()
  },

  addDoc: (data) => {
    db.collection('products')
      .add(data)
      .then(() => {console.log('Documento creado con éxito')})
      .catch(() => {console.error('Ha habido un error al crear el documento')})
  },

  refresh: () => {
    const batch = db.batch();
    db.collection('products')
      .where('onList', '==', true)
      .get().then(items => {
        items.docs.forEach(doc => {
          batch.update(doc.ref, {'onList': false, 'checked': false})
        })
        batch.commit()
          .then(() => {console.log('El batch se ha realizado con éxito')})
          .catch(() => {console.error('Ha habido un error con el batch')})
      })
  }
}

export default db;