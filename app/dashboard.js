import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity} from 'react-native';
import {initFirebase} from './InitFirebase';
const firebase = new initFirebase();

//design imports
import {  Overlay, FormLabel, FormInput, Button, Icon } from 'react-native-elements';

class Dashboard extends React.Component {
  //set up the title of this screen
  static navigationOptions = {
    title: "Smile",
    navigationBarHidden: true,
    headerLeft: null
  };

  //this constructor method is called before the componentWillMount method
  //use it to set up the starting state of the component
  constructor(props) {
      console.log("Constructing...");

      super(props); // call the parent class's (React.Component) constructor first before anything else

      console.log(props);

      // set starting values of email and password
      // this.state = {         
      // };

      //hack to get access to the navigation from within the firebase.auth().onAuthStateChanged callback
      //global.navigation = this.props.navigation;
      const { navigation } = this.props; //pull navigation from the props into its own variable

      // figure it whether user is already logged-in
      var user = firebase.auth().currentUser;
      if (user) {
        // User is signed in.
        console.log("User " + user.email + " is signed in..");

        //keep a reference to this user's info
        this.state = {
          user: user
        };

      } else {
        // No user is signed in.
        console.log("No user is signed in!");
        navigation.pop();

      }

    } // constructor

  // method to log in via Firebase...
  // you should share a test email/password combo on your CONTRIBUTING.md document
  signOut() {
    console.log("Signing out...");

    //try to sign out of firebase
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log("Sign-out successful!");

      //navigate to log in screen
      console.log("Navigating to Log In screen..");
      this.navigation.popToTop(); // go to top of navigation stack

    }, function(error) {
      // An error happened.
      console.log("Error signing out...");
      console.log(error);
    });

  } // authenticate


  render() {
    return (
    <View>

      <View style={styles.container}>

        <Icon
          name='star'
          size= {30}
          color= '#FFFF4D'
          Raised
          iconStyle={styles.starStyle}
        />

        <Text style={styles.headerText}> 
          {this.state.user.email} 
        </Text>
      </View>

      <View style={styles.container}>
        <Button
          title={"Sign out"}
          color={"#364652"}
          buttonStyle={{
              backgroundColor: "rgba(255,255,255, .6)",
              width: 250,
              height: 45,
              borderColor: "transparent",
              borderWidth: 1,
              borderRadius: 5
          }}
          onPress={() => this.signOut()}
        />


        <Text> 
          Firebase seems to remember the previous user who logged-in...
          -AB
        </Text>

      </View>
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

  container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
   },
   headerText: {
       color: global.darkText,
       fontSize: 28,
       fontFamily: 'montserrat-bold',
       margin: 15,
       marginBottom: 40,
       width: "100%",
       height: "100%"
    },
    starStyle: {
      marginTop: 20,
      marginLeft: 30,
   },

});

export { Dashboard };
