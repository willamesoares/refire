import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyADVSRfLgOwquReV8_jFHcsydNF0m7fx-s',
  authDomain: 'refire-dc0bd.firebaseapp.com',
  databaseURL: 'https://refire-dc0bd.firebaseio.com',
};
firebase.initializeApp(config);

const auth = firebase.auth;
const db = firebase.database();

export {
  auth,
  db
};
