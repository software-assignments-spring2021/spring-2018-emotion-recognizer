import * as firebase from 'firebase';
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB2EvVasHywMAgEO30nOUBerazLu61yMc8 ",
  authDomain: "moodio-f230e.firebaseapp.com",
  databaseURL: "https://moodio-f230e.firebaseio.com/",
  storageBucket: "moodio-f230e.appspot.com"
};

const app = firebase.initializeApp(firebaseConfig);

/*
A Firebase App can use multiple Firebase services. Each service can be accessed from the firebase namespace:

    firebase.auth() - Authentication (https://firebase.google.com/docs/auth/?authuser=0)
    firebase.storage() - Cloud Storage (https://firebase.google.com/docs/storage/?authuser=0)
    firebase.database() - Realtime Database (https://firebase.google.com/docs/database/?authuser=0)
    firebase.firestore() - Cloud Firestore (https://firebase.google.com/docs/firestore/?authuser=0)

*/

export class initFirebase {
  constructor () {
    return app;
  }
}
