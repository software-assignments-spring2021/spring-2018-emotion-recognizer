import React from 'react';
import {Alert, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, AppRegistry } from 'react-native';
import './global-design-constants.js';
//design imports
import Icon from 'react-native-vector-icons/FontAwesome';
import { Overlay, FormLabel, FormInput, Button, icon } from 'react-native-elements';

//console.log('firebase from Signup.js:',firebase);

class Onboarding2 extends React.Component {
    //set up the title of this screen
    static navigationOptions = {
        title: "Onboarding 2"
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
            These people are&nbsp; 
            <Text style={styles.boldText}> 
            sad:
        </Text>
        </Text>

        <View style={{flex:1, flexDirection: 'row', alignItems: 'center'}}>
            <View>
                <Image style={styles.image}
                    source={{ uri: global.sadKidImgUrl }}
                />

                <Image style={styles.image}
                    source={{ uri: global.sadGirlImgUrl }}
                />

                <Image style={styles.image}
                    source={{ uri: global.sadKidImgUrl2 }}
                />
            </View>

            <Button style={styles.button}
                title={"Next"}
                color={global.secondaryGreen}
            />
        </View>

      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightblue',
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
    borderColor: 'white',
    borderRadius: 10,
    borderWidth: 10,
    width: 150,
    height: 200,
    justifyContent: 'center',
    marginBottom: 10,
  },
  button: {
    width: 100,
    height: 30,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5,
  }
})


export { Onboarding2 };