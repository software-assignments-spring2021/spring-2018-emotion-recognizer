
import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import {initFirebase} from './InitFirebase';
const firebaseApp = new initFirebase();

const Component = React.Component;

//design imports
import Icon from 'react-native-vector-icons/FontAwesome';
import { Overlay, FormLabel, FormInput, Button, icon } from 'react-native-elements';

const remote = 'https://images.unsplash.com/photo-1502210600188-51a3adffa4aa?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=59d5264e02cb977d8e7a0acbb1e52ded&auto=format&fit=crop&w=634&q=80';
const lightText = "#e4e4e4";
const darkText = "#364652";
const mainColor = "#3989E1";
const secondaryGreen = "#30E849";
const secondaryRed = "#E83A30";

//console.log('firebaseApp from Signup.js:',firebaseApp);

class Signup extends Component {

  signUp() {
    console.log(this.state);
    firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
    throw error;
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
       source={{ uri: remote }}
     >
     </Image>

     <Text style={{
            color: lightText,
            fontSize: 48,
            fontWeight: "bold",
            margin: 15,
            marginBottom: 40,
          }}> Sign Up

        </Text>

          <TextInput
            placeholder='Email'
            placeholderTextColor={darkText}
            shake={true}
            style={{
                width: '50%',
                padding: 10,
                borderWidth: 1,
                borderColor: "#999",
                borderRadius:3,
                backgroundColor: "rgba(204,204,204, .8)",
                color: darkText,
            }}
            onChangeText={(email) => this.setState({email})}
        />

        <TextInput
            placeholder='Name'
            placeholderTextColor={darkText}
            shake={true}
            style={{
                width: '50%',
                padding: 10,
                borderWidth: 1,
                borderColor: "#999",
                borderRadius:3,
                backgroundColor: "rgba(204,204,204, .8)",
                color: darkText,
            }}
            onChangeText={(name) => this.setState({name})}
        />

        <TextInput
            placeholder='Username'
            placeholderTextColor={darkText}
            shake={true}
            style={{
                width: '50%',
                padding: 10,
                borderWidth: 1,
                borderColor: "#999",
                borderRadius:3,
                backgroundColor: "rgba(204,204,204, .8)",
                color: darkText,
            }}
            onChangeText={(username) => this.setState({username})}
        />

        <TextInput
            placeholder='Password'
            placeholderTextColor={darkText}
            shake={true}
            style={{
                width: '50%',
                padding: 10,
                margin: 40,
                borderWidth: 1,
                borderColor: "#999",
                borderRadius: 3,
                backgroundColor: "rgba(204,204,204, .8)",
                color: darkText,
            }}
            onChangeText={(password) => this.setState({password})}
        />

        <Button
            title={"Sign up"}
            color={"#364652"}
            buttonStyle={{
                backgroundColor: "rgba(255,255,255, .6)",
                width: 300,
                height: 45,
                borderColor: "transparent",
                borderWidth: 1,
                borderRadius: 5
            }}
            onPress={() => this.signUp()}
        />


        <Text style={{
            color: lightText,
            margin: 15
          }}> or

        </Text>



                <Button
            title={"Sign up with google"}
            color={"#364652"}
            buttonStyle={{
                backgroundColor: "rgba(255,255,255, .6)",
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
