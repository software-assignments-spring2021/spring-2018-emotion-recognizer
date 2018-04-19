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
    alignItems: 'center',
  },
  text: {
    color: global.white,
    fontSize: 30,
    marginTop: 15,
    marginBottom: 55,
    fontWeight: '700',
  },
  bgImage: {
     backgroundColor: global.lightGrey,
     position: 'absolute',
     width: '100%',
     height: '100%',
     justifyContent: 'center',
 },
  boldText: {
    color: global.white,
    fontSize: 45,
    marginTop: 55,
    marginBottom: 25,
    fontWeight:'900',
  },
  smallText: {
    color: global.white,
    fontSize: 25,
    marginTop: 15,
    marginBottom: 5,
    fontWeight:'500',
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
  movingImage: {
    borderColor: global.white,
    width: 400,
    height: 200,
    justifyContent: 'center',
    marginBottom: 30,
  },
  button: {
    width: 165,
    height: 30,
    marginBottom: 15,
    marginTop: 15,
  }
});


class Congratulations extends React.Component {
    //set up the title of this screen
    static navigationOptions = {
        title: "Tutorial Complete"
    };

    //this constructor method is called before the componentWillMount method
    //use it to set up the starting state of the component
    constructor(props) {
        super(props); // call the parent class's (React.Component) constructor first before anything else

    } //constructor


  render() {
    return (
      <View style={styles.container}>

        <Image
          style={styles.bgImage}
          source={{ uri: global.confetti2 }}
        />

        <Text style={styles.boldText}>
            Congraulations!
        </Text>

        <Text style={styles.text}>
            You completed the tutorial.
        </Text>

        <Image style={styles.movingImage}
            source={{ uri: global.congrats }}
          />

        <Button
          style={styles.button}
          title="Play the game!"
          titleStyle={{fontWeight: "700" }}
          onPress = {() => this.props.navigation.navigate('SmileGame', {navigation: this.props.navigation})}
        />

        <Text style={styles.smallText}>
            -----or------
        </Text>

        <Button style={styles.button}
            title={"Match your face!"}
            onPress = {() => this.props.navigation.navigate('SmileGame', {navigation: this.props.navigation})}
        />

      </View>

    );
  }
}

export { Congratulations };
