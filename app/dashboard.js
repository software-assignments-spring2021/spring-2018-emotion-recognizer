import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity} from 'react-native';
import {initFirebase} from './InitFirebase';
const firebaseApp = new initFirebase();

//design imports
import {  Overlay, FormLabel, FormInput, Button, Icon } from 'react-native-elements';

class Dashboard extends React.Component {

  authenticate() {
    firebaseApp.auth().signInWithEmailAndPassword(this.state.username, this.state.password).catch(function(error) {
      throw error;
    });
  }

  render() {
    return (
      <View style={styles.container}>

      <Icon
         name='star'
         size= {30}
         color= '#FFFF4D'
         Raised
         iconStyle={styles.starStyle}
      />


   <Text style={styles.headerText}> 21 </Text>

      </View>

    );
  }
}
//TODO: firebase google authentication

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
   },
   headerText: {
       color: global.darkText,
       fontSize: 48,
       fontFamily: 'montserrat-bold',
       margin: 15,
       marginBottom: 40,
    },
    starStyle: {
      marginTop: 20,
      marginLeft: 30,
   },

});

export { Dashboard };
