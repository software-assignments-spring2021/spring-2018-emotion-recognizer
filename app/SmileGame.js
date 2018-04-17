import React from 'react';
import {Alert, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, AppRegistry, TouchableHighlight } from 'react-native';
import './global-design-constants.js';
//design imports
import Icon from 'react-native-vector-icons/FontAwesome';
import { Overlay, FormLabel, FormInput, Button, icon } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';

//console.log('firebase from Signup.js:',firebase);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: global.darkGrey,
    justifyContent: 'center',
    fontSize: 50,
    margin: 15,
    marginTop: 1,
    marginBottom: 5,
  },
  textButton: {
    color: 'green',
    fontSize: 40,
    backgroundColor: 'white',
    textDecorationColor: 'white',
    fontWeight: "bold",
    margin: 5,
    marginTop: 5,
    marginBottom: 15,
    textShadowColor: 'white',
    textShadowRadius: 10,
  },
    textButtonRed: {
    color: 'red',
    backgroundColor: 'white',
    borderRadius: 40,
    fontSize: 40,
    fontWeight: "bold",
    margin: 5,
    marginTop: 5,
    marginBottom: 15,
    textShadowColor: 'white',
  },
  boldText: {
    color: global.darkGrey,
    justifyContent: 'center',
    fontSize: 50,
    margin: 15,
    marginBottom: 10,
    fontWeight:"bold",
  },
  image: {
    borderColor: global.white,
    borderRadius: 10,
    borderWidth: 10,
    width: 300,
    height: 350,
    justifyContent: 'center',
    marginBottom: 1,
    marginTop: 15,
  },
    bgImage: {
     backgroundColor: global.lightGrey,
     flex: 1,
     position: 'absolute',
     width: '100%',
     height: '100%',
     justifyContent: 'center',
 },
  button: {
    width: 100,
    height: 30,
    borderColor: global.transparent,
    borderWidth: 5,
    borderRadius: 15,
    marginBottom: 5,
  },
});

class SmileGame extends React.Component {
    //set up the title of this screen
    static navigationOptions = {
        title: "SmileGame"
    };

    //this constructor method is called before the componentWillMount method
    //use it to set up the starting state of the component
    constructor(props) {
        super(props); // call the parent class's (React.Component) constructor first before anything else
        this.state = { uri: global.sadKidImgUrl3 };
        this.count = 0;
    } //constructor


    changePicture = () => {
    this.count++;
    if(this.count === 1) {
        this.setState({
            uri: global.smileGame1
        });
    }
    else if (this.count === 2) {
        this.setState({
            uri: global.smileGame3
        });
    }
    else if (this.count === 3) {
        this.setState({
            uri: global.smileGame2
        });
    }
    else {
        this.setState({
            uri: global.smileGame4
        });
        this.count = 0;
    }
  }

  render() {
    return (
      <View style={styles.container}>

      <Image
          style={styles.bgImage}
          source={{ uri: global.orangeSkyImgUrl }}
        />

        <Text style={styles.text}>
            Is this person   &nbsp;
            <Text style={styles.boldText}>
            happy?
        </Text>
        </Text>
        <Image
                source={this.state}
                style={styles.image}
            />

        <TouchableHighlight onPress={() => this.changePicture(this.count)} underlayColor="white">
            <Text style = {styles.textButton}>
                Yes
                </Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => this.changePicture(this.count)} underlayColor="white">
            <Text style = {styles.textButtonRed}>
                No
                </Text>
        </TouchableHighlight>

      </View>

    )
  }
}

export { SmileGame };
