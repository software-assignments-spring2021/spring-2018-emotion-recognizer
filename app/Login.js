import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import {initFirebase} from './InitFirebase';

//instantiate the Firebase app
const firebaseApp = new initFirebase();

//design imports
import Icon from 'react-native-vector-icons/FontAwesome';
import {  Overlay, FormLabel, FormInput, Button, icon } from 'react-native-elements';

class Login extends React.Component {

  // method to log in via Firebase...
  // you should share a test email/password combo on your CONTRIBUTING.md document
  authenticate() {
    firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
      throw error;
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
          onPress={() => this.props.navigation.navigate('SignupScreen')}
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
