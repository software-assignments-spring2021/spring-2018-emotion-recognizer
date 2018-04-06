
import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import {initFirebase} from './InitFirebase';
const firebaseApp = new initFirebase();

//design imports
import Icon from 'react-native-vector-icons/FontAwesome';
import { Overlay, FormLabel, FormInput, Button, icon } from 'react-native-elements';

//console.log('firebaseApp from Signup.js:',firebaseApp);

class Signup extends React.Component {

    //sign up a new user via Firebase
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
            source={{ uri: global.orangeSkyImgUrl }}
        />
     

        <Text style={{
            color: global.lightText,
            fontSize: 48,
            fontWeight: "bold",
            margin: 15,
            marginBottom: 40,
        }}> Sign Up

        </Text>

        <TextInput
            placeholder='Email'
            placeholderTextColor={global.darkText}
            shake={true}
            style={{
                width: '50%',
                padding: 10,
                borderWidth: 1,
                borderColor: "#999",
                borderRadius:3,
                backgroundColor: "rgba(204,204,204, .8)",
                color: global.darkText,
            }}
            onChangeText={(email) => this.setState({
                email: email
            })}
        />

        <TextInput
            placeholder='Name'
            placeholderTextColor={global.darkText}
            shake={true}
            style={{
                width: '50%',
                padding: 10,
                borderWidth: 1,
                borderColor: "#999",
                borderRadius:3,
                backgroundColor: "rgba(204,204,204, .8)",
                color: global.darkText,
            }}
            onChangeText={(name) => this.setState({
                name: name
            })}
        />

        <TextInput
            placeholder='Username'
            placeholderTextColor={global.darkText}
            shake={true}
            style={{
                width: '50%',
                padding: 10,
                borderWidth: 1,
                borderColor: "#999",
                borderRadius:3,
                backgroundColor: "rgba(204,204,204, .8)",
                color: global.darkText,
            }}
            onChangeText={(username) => this.setState({
                username: username
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
            color: global.lightText,
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
