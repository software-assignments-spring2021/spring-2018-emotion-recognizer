
import React from 'react';
import {Alert, StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import {initFirebase} from './InitFirebase';
const firebase = new initFirebase();

//design imports
import Icon from 'react-native-vector-icons/FontAwesome';
import { Overlay, FormLabel, FormInput, Button, icon } from 'react-native-elements';

//console.log('firebase from Signup.js:',firebase);

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
            console.log(error)
            //throw error;
        });
    }

  render() {
    return (
      <View style={styles.container}>

        <Image
            style={{
                backgroundColor: '#ccc',
                flex: 1,
                position: 'absolute',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
            }}
            source={{ uri: global.orangeSkyImgUrl }}
        />

        <Text style={{
            color: global.lightGrey,
            fontSize: 48,
            fontWeight: "bold",
            margin: 15,
            marginBottom: 40,
        }}>
            Sign Up
        </Text>

        <TextInput
            placeholder='Email'
            placeholderTextColor={global.darkGrey}
            shake={true}
            style={{
                width: '50%',
                padding: 10,
                borderWidth: 1,
                borderColor: "#999",
                borderRadius:3,
                backgroundColor: "rgba(204,204,204, .8)",
                color: global.darkGrey,
            }}
            onChangeText={(email) => this.setState({
                email: email
            })}
        />

        <TextInput
            placeholder='Name'
            placeholderTextColor={global.darkGrey}
            shake={true}
            style={{
                width: '50%',
                padding: 10,
                borderWidth: 1,
                borderColor: "#999",
                borderRadius:3,
                backgroundColor: "rgba(204,204,204, .8)",
                color: global.darkGrey,
            }}
            onChangeText={(name) => this.setState({
                name: name
            })}
        />

        <TextInput
            placeholder='Username'
            placeholderTextColor={global.darkGrey}
            shake={true}
            style={{
                width: '50%',
                padding: 10,
                borderWidth: 1,
                borderColor: "#999",
                borderRadius:3,
                backgroundColor: global.backgroundWhite,
                color: global.darkGrey,
            }}
            onChangeText={(username) => this.setState({
                username: username
            })}
        />

        <TextInput
            placeholder='Password'
            placeholderTextColor={global.darkGrey}
            secureTextEntry={true}
            shake={true}
            style={{
                width: '50%',
                padding: 10,
                margin: 40,
                borderWidth: 1,
                borderColor: "#999",
                borderRadius: 3,
                backgroundColor: global.backgroundWhite,
                color: global.darkGrey,
            }}
            onChangeText={(password) => this.setState({
                password: password
            })}
        />

        <Button
            title={"Sign up"}
            color={"#364652"}
            buttonStyle={{
                backgroundColor: global.backgroundWhite,
                width: 300,
                height: 45,
                borderColor: "transparent",
                borderWidth: 1,
                borderRadius: 5
            }}
            onPress={() => this.signUp()}
        />


        <Text style={{
            color: global.lightGrey,
            margin: 15
          }}> or

        </Text>

        <Button
            title={"Sign up with google"}
            color={"#364652"}
            buttonStyle={{
                backgroundColor: global.backgroundWhite,
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

export { Signup };
