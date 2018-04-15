import React from 'react';
import {Alert, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, AppRegistry } from 'react-native';
import './global-design-constants.js';
//design imports
import Icon from 'react-native-vector-icons/FontAwesome';
import { Overlay, FormLabel, FormInput, Button, icon } from 'react-native-elements';

//console.log('firebase from Signup.js:',firebase);

const styles = StyleSheet.create({
  container: {
    backgroundColor: global.secondaryGreen,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: global.darkText,
    fontSize: 30,
    margin: 15,
    marginBottom: 5,
  },
  boldText: {
    color: global.darkText,
    fontSize: 30,
    margin: 15,
    marginBottom: 10,
    fontWeight:"bold",
  },
  image: {
    borderColor: global.white,
    borderRadius: 10,
    borderWidth: 10,
    width: 150,
    height: 200,
    justifyContent: 'center',
    marginBottom: 10,
  },
  button: {
    width: 300,
    height: 30,
    margin: 15,
    borderColor: global.transparent,
    borderWidth: 0,
    borderRadius: 5,
  }
});


class Congratulations extends React.Component {
    //set up the title of this screen
    static navigationOptions = {
        title: "Congratulations"
    };

    //this constructor method is called before the componentWillMount method
    //use it to set up the starting state of the component
    constructor(props) {
        super(props); // call the parent class's (React.Component) constructor first before anything else

    } //constructor


  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.text}>
            Congraulations! You completed the tutorial.
        </Text>

        <Button style={styles.button}
            title={"Play the smile game"}
        />

        <Button style={styles.button}
            title={"Try it yourself"}
        />

      </View>

    );
  }
}

export { Congratulations };
