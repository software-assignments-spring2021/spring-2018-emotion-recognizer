import React from 'react';

const Component = React.Component;

//routing boilerplate
import { StackNavigator } from 'react-navigation';

import * as firebase from 'firebase';
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB2EvVasHywMAgEO30nOUBerazLu61yMc8 ",
  authDomain: "moodio-f230e.firebaseapp.com",
  databaseURL: "https://moodio-f230e.firebaseio.com/",
  storageBucket: "moodio-f230e.appspot.com"
};

/*
A Firebase App can use multiple Firebase services. Each service can be accessed from the firebase namespace:

    firebase.auth() - Authentication (https://firebase.google.com/docs/auth/?authuser=0)
    firebase.storage() - Cloud Storage (https://firebase.google.com/docs/storage/?authuser=0)
    firebase.database() - Realtime Database (https://firebase.google.com/docs/database/?authuser=0)
    firebase.firestore() - Cloud Firestore (https://firebase.google.com/docs/firestore/?authuser=0)

*/

//test for jenkins

const firebaseApp = firebase.initializeApp(firebaseConfig);

//view imports
import { Login as LoginScreen } from './Login';
import { SwipeCards } from './SwipeCards';

// const RootStack = StackNavigator(
//   {
//     Login: {
//       screen: LoginScreen,
//     },
//     Card: {
//       screen: CardScreen,
//     },
//   },
//   {
//     initialRouteName: 'Login',
//   }
// );

export default class App extends Component {

  render() {
    return (
      /*<Text style={{marginTop: 30}}>
        This is not a drill!
      </Text>*/
      <SwipeCards style={{flex: 1}} />
      //<RootStack />
    );
  }
}

export { firebaseApp };
