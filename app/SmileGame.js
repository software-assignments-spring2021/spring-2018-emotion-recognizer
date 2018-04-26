import React from 'react';
import {Alert, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, AppRegistry, TouchableHighlight } from 'react-native';
import './global-design-constants.js';
//design imports
import Icon from 'react-native-vector-icons/FontAwesome';
import { Overlay, FormLabel, FormInput, Button, icon } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
//GameDriver import
import { GameDriver } from './GameDriver.js';

const testData = [
  {
    name: 'happy',
    imgs: ['http://via.placeholder.com/700x700&text=happy1','http://via.placeholder.com/700x700&text=happy2','http://via.placeholder.com/700x700&text=happy3']
  },
  {
    name: 'sad',
    imgs: ['http://via.placeholder.com/700x700&text=sad1','http://via.placeholder.com/700x700&text=sad2','http://via.placeholder.com/700x700&text=sad3','http://via.placeholder.com/700x700&text=sad4']
  },
  {
    name: 'angry',
    imgs: ['http://via.placeholder.com/700x700&text=angry1','http://via.placeholder.com/700x700&text=angry2','http://via.placeholder.com/700x700&text=angry3','http://via.placeholder.com/700x700&text=angry4','http://via.placeholder.com/700x700&text=angry5']
  }
];

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
        this.count = 0;
        this.driver = new GameDriver( testData, 3, 'happy vs sad vs angry' );
        const firstQuestion = this.driver.getQuestion( this.count );
        this.state = { uri: firstQuestion.img, emotionPrompt: firstQuestion.emotion };
    } //constructor


    changePicture = () => {
      if ( !this.driver.gameOver() ) {
        this.count++;

        const currentQuestion = this.driver.getQuestion( this.count );

        this.setState({
            uri: currentQuestion.img,
            emotionPrompt: currentQuestion.emotion
        });
      }
      else {
        this.driver.reportAnswers();
        this.props.navigation.navigate('Congratulations', {navigation: this.props.navigation});
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
            {this.state.emotionPrompt}?
        </Text>
        </Text>
        <Image
                source={{uri: this.state.uri}}
                style={styles.image}
            />

        <TouchableHighlight onPress={
          () => {
            this.driver.setAnswer( this.count, true );
            this.changePicture();
          }
        } underlayColor="white">
            <Text style = {styles.textButton}>
                Yes
                </Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={
          () => {
            this.driver.setAnswer( this.count, false );
            this.changePicture();
          }
        } underlayColor="white">
            <Text style = {styles.textButtonRed}>
                No
                </Text>
        </TouchableHighlight>

      </View>

    );
  }
}

export { SmileGame };
