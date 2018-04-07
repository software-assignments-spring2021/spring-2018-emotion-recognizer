import React from 'react';
import {Alert, StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import {initFirebase} from './InitFirebase';

//instantiate the Firebase app
const firebaseApp = new initFirebase();

//design imports
import Icon from 'react-native-vector-icons/FontAwesome';
import {  Overlay, FormLabel, FormInput, Button, icon } from 'react-native-elements';

class Login extends React.Component {
  //set up the title of this screen
  static navigationOptions = {
    title: "Log In"
  };

  //this constructor method is called before the componentWillMount method
  //use it to set up the starting state of the component
  constructor(props) {
      super(props); // call the parent class's (React.Component) constructor first before anything else

      //set starting values of email and password
      this.state = { 
        email: "",
        password: ""
      };

  } //constructor

  // method to log in via Firebase...
  // you should share a test email/password combo on your CONTRIBUTING.md document
  authenticate() {

    // debug the current state
    console.log(this.state);

    //what to do once the user signs in
    firebaseApp.auth().onAuthStateChanged(function(user) {
      if (user) {
        // success!
        console.log("Log in success for " + user.email + "!");
        //console.log(user);

        //navigate to the Dashboard view
        console.log("Navigating to Dashboard...");
        this.props.navigation.navigate('Dashboard');
      }
      else {
        // failure!
        console.log("Log in failure!");
      }
    });

    //try to sign in
    firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
      // if error, show an alert dialog with the error message displayed
      Alert.alert(
          'Log In Failed',
          error.message,
          [
              {text: "Ok, I'll fix this", onPress: () => console.log('Ok pressed')},
              {text: 'Whatever', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
          ],
          { cancelable: false }
      );
      //debug error
      console.log(error);
    }).then((data) => {
      console.log("Then came some data...");
      console.log(data);
      this.props.navigation.navigate('Dashboard');
      //this.setState(data);
    }).catch((error)=>{
       console.log("Caught an  error...");
       console.log(error.message);
    });
  }

  //render the view for this component
  render() {

    //return a nicely-formatted JSX view
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
          source={{ uri: global.happyGirlImgUrl }}
        />

        <Text
          style={{
          color: global.lightText,
          fontSize: 48,
          fontWeight: "bold",
          margin: 15,
          marginBottom: 40,
          }}> 
            SMILE!
        </Text>

        <TextInput
            placeholder='Email'
            shake={true}
            placeholderTextColor={global.darkText}
            style= {{
                width: '50%',
                padding: 10,
                borderWidth: 1,
                borderColor: "#999",
                borderRadius:3,
                backgroundColor: "rgba(204,204,204, .8)",
                color: global.darkText,
            }}
            onChangeText={(username) => this.setState({
                email: username
            })}
        />

        <TextInput
          placeholder='Password'
          placeholderTextColor={global.darkText}
          secureTextEntry={true}
          shake={true}
          style={{
            width: '50%',
            padding: 10,
            margin: 40,
            borderWidth: 1,
            borderColor: "#999",
            borderRadius: 3,
            backgroundColor: "rgba(204,204,204, .8)",
            color: global.darkText,
          }}
          onChangeText={(password) => this.setState({
            password: password
          })}
        />

        <Button
          title={"Sign in"}
          color={"#364652"}
          buttonStyle={{
              backgroundColor: "rgba(255,255,255, .6)",
              width: 250,
              height: 45,
              borderColor: "transparent",
              borderWidth: 1,
              borderRadius: 5
          }}
          onPress={() => this.authenticate()}
        />

        <Text style={{
            color: global.lightText,
            margin: 15
          }}> or

        </Text>

        <Button
          title={"Sign up"}
          color={"#364652"}
          buttonStyle={{
              backgroundColor: "rgba(255,255,255, .6)",
              width: 250,
              height: 45,
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 5
          }}
          onPress={() => this.props.navigation.navigate('Signup')}

        />

      </View>

    );
  }
}
//TODO: firebase google authentication

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { Login };
