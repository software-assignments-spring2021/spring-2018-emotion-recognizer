
import React from 'react';
import {Alert, StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import {initFirebase} from './InitFirebase';
const firebase = new initFirebase();

//design imports
import './global-design-constants.js';
import { Button } from 'react-native-elements';

//console.log('firebase from Signup.js:',firebase);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImage: {
     backgroundColor: global.lightGrey,
     flex: 1,
     position: 'absolute',
     width: '100%',
     height: '100%',
     justifyContent: 'center',
 },
 headerCont: {
   marginBottom: 20,
   backgroundColor: global.lightGreySemiTransparent,
   borderRadius: 10,
},
 text: {
   color: global.darkGrey,
   fontSize: 48,
   fontWeight: "bold",
   margin: 15,
   marginBottom: 10,
   padding: 1
 },
 fieldText: {
   width: 300,
   padding: 15,
   margin: 15,
   borderWidth: 1,
   borderColor: global.midGrey,
   borderRadius: 3,
   backgroundColor: global.lightGreySemiTransparent,
   color: global.darkText,
 },
buttonArea: {
   marginTop: 20
},
 button: {
   backgroundColor: global.backgroundWhite,
   width: 210,
   height: 40,
   borderColor: global.transparent,
   borderWidth: 0,
   borderRadius: 5
 }
});




class Signup extends React.Component {
    //set up the title of this screen
    static navigationOptions = {
        title: "Sign Up"
    };

    //this constructor method is called before the componentWillMount method
    //use it to set up the starting state of the component
    constructor(props) {
        super(props); // call the parent class's (React.Component) constructor first before anything else

        console.log("Getting props...");
        console.log(props);

        //set starting values of email and password
        this.state = {
          email: "",
          password: ""
        };

    } //constructor

    // sign up a new user via Firebase
    signUp() {

        // debug the current state
        console.log(this.state);

        //what to do once the user signs in
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // user is signed in!
            console.log("Log in success for " + user.email + " (userId " + user.uid + ")!");
            console.log(user);

            //navigate to the Dashboard view
            this.props.navigation.navigate('Dashboard');
          }
          else {
            // user logged out!
            console.log("User logged out!");
          }
        });

        // try to create account
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
            // if error, show an alert dialog with the error message displayed
            Alert.alert(
                'Sign Up Failed',
                error.message,
                [
                    {text: "Ok, I'll fix this", onPress: () => console.log('Ok pressed')},
                    {text: 'Whatever', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
                ],
                { cancelable: false }
            );

            //debug error
            console.log(error);
            //throw error;
        });
    }

  render() {
    return (
      <View style={styles.container}>

        <Image
            style={styles.bgImage}
            source={global.turquoisSky}
        />
     <View style={styles.headerCont}>
           <Text style={styles.text}>
               Sign Up
           </Text>
        </View>

        <TextInput
            placeholder='Email'
            placeholderTextColor={global.darkGrey}
            shake={true}
            style={styles.fieldText}
            onChangeText={(email) => this.setState({
                email: email
            })}
        />

        <TextInput
            placeholder='Name'
            placeholderTextColor={global.darkGrey}
            shake={true}
            style={styles.fieldText}
            onChangeText={(name) => this.setState({
                name: name
            })}
        />

        <TextInput
            placeholder='Username'
            placeholderTextColor={global.darkGrey}
            shake={true}
            style={styles.fieldText}
            onChangeText={(username) => this.setState({
                username: username
            })}
        />

        <TextInput
            placeholder='Password'
            placeholderTextColor={global.darkGrey}
            secureTextEntry={true}
            shake={true}
            style={styles.fieldText}
            onChangeText={(password) => this.setState({
                password: password
            })}
        />
     <View style={styles.buttonArea}>

        <Button
            title={"Sign up"}
            color={global.darkGrey}
            buttonStyle={styles.button}
            onPress={() => this.signUp()}
        />



   </View>

      </View>

    );
  }
}

export { Signup };
