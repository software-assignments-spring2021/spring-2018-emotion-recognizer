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
    backgroundColor: global.backgroundYellow,
    flex: 1,
    alignItems: 'center',
  },
  text: {
    color: global.darkGrey,
    justifyContent: 'center',
    fontSize: 50,
    margin: 15,
    marginTop: 15,
    marginBottom: 5,
  },
  textButton: {
    color: global.darkGrey,
    fontSize: 20,
    margin: 5,
    marginTop: 5,
    marginBottom: 15,
    borderColor: global.white,
    textShadowColor: global.white,
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
  icon: {
    color: global.white,
  },
  button: {
    width: 100,
    height: 30,
    borderColor: global.transparent,
    borderWidth: 0,
    borderRadius: 5,
  }
});


class Onboarding1 extends React.Component {
    //set up the title of this screen
    static navigationOptions = {
        title: "Learn Happy!"
    };

    //this constructor method is called before the componentWillMount method
    //use it to set up the starting state of the component
    constructor(props) {
        super(props); // call the parent class's (React.Component) constructor first before anything else
        this.state = { uri: global.happyKidImgUrl };
        this.count = 0;
    } //constructor


    changePicture = () => {
    this.count++;
    if(this.count === 1) {
        this.setState({
            uri: global.happyGuyImgUrl
        });
    }
    else if (this.count === 2) {
        this.setState({
            uri: global.happyGirlImgUrl2
        });
    }
    else {
        this.setState({
            uri: global.happyKidImgUrl
        });
        this.count = 0;
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.text}>
            This is a    &nbsp;
            <Text style={styles.boldText}>
            happy face!
        </Text>
        </Text>
        <Image
                source={this.state}
                style={styles.image}
            />
        <TouchableHighlight onPress={() => this.changePicture(this.count)} underlayColor="white">
            <Text style = {styles.textButton}>
                Touch here to see more faces!
                </Text>
        </TouchableHighlight>

        <Button
          style={styles.button}
          title="Next"
          onPress={() => this.props.navigation.navigate('Onboarding2', {navigation: this.props.navigation})}
        />

      </View>

    );
  }
}

export { Onboarding1 };
