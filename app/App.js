import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

const Component = React.Component;

import { constants } from 'expo';


//design imports
import Icon from 'react-native-vector-icons/FontAwesome';
import {  FormLabel, FormInput, Button, icon } from 'react-native-elements';


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


const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        
        <FormInput
            placeholder='BASIC INPUT'
            icon={
                <Icon
                  name='user'
                  size={24}
                  color='black'
                />
              }
            shake={true}
            inputStyle={{
                padding: 15,
                margin: 20,
                borderWidth: 2,
                borderColor: "#000000",
            }}
        />
              
        <Button
            raised
            title={"Sign up"}
            color={"#364652"}
            buttonStyle={{
                backgroundColor: "#30e849",
                width: 300,
                height: 45,
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 5
            }}
        />      
      </View>

    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

