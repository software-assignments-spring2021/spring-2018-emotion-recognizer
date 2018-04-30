import React from 'react';
import {StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import './global-design-constants.js';
//design imports
import { Button} from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
//GameDriver import
import { GameDriver } from './GameDriver.js';

const testData = [
  {
    name: 'scared',
    imgs: [global.scared, global.scared2, global.scared3, global.scared4, global.scared5]
  },
  {
    name: 'happy',
    imgs: [global.happy, global.happy2, global.happy3, global.happy4, global.happy5]
  }
];

//console.log('firebase from Signup.js:',firebase);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: global.darkGrey,
    textAlign: 'center',
    fontSize: 50,
    marginTop: 15,
    fontFamily: 'montserrat'
  },
  boldText: {
    color: global.darkGrey,
    textAlign: 'center',
    fontSize: 50,
    marginBottom: 10,
    fontFamily: 'montserrat-bold'
  },
  image: {
    borderColor: global.darkGreySemiTransparent,
    borderRadius: 10,
    borderWidth: 10,
    width: 300,
    height: 350,
    justifyContent: 'center',
    marginBottom: 1,
    marginTop: 15,
  },
  bgImage: {
     backgroundColor: global.lightGreySemiTransparent,
     flex: 1,
     position: 'absolute',
     width: '100%',
     height: '100%',
     justifyContent: 'center',
   },
   answerArea: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      margin: 20
   },
   answerButton: {
     backgroundColor: global.darkGrey,
     marginTop: 20,
     width: 130,
     borderColor: global.transparent,
     borderWidth: 0,
     borderRadius: 5,
   },
});

class SmileGame4 extends React.Component {
    //set up the title of this screen
    static navigationOptions = {
        title: "SmileGame"
    };

    //this constructor method is called before the componentWillMount method
    //use it to set up the starting state of the component
    constructor(props) {
        super(props); // call the parent class's (React.Component) constructor first before anything else
        this.count = 0;
        this.driver = new GameDriver( testData, 5, 'scared vs happy' );
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
        this.props.navigation.navigate('Congratulations2', {navigation: this.props.navigation});
      }
  }

  render() {
    return (
      <View style={styles.container}>

         <Image
             style={styles.bgImage}
             source={global.orangeSkyImgUrl}
           />

        <Text style={styles.headerText}>
               Is this person
        </Text>
        <Text style={styles.boldText}>
           {this.state.emotionPrompt}?
        </Text>
        <Image
          source={ this.state.uri}
          style={styles.image}
         />

         <View style={styles.answerArea}>
            <Button
               buttonStyle={styles.answerButton}
               title="YES"
               color={global.white}
               fontFamily='open-sans-bold'
               onPress={ () => {
                   this.driver.setAnswer( this.count, true );
                   this.changePicture();
                }
               }
            >
            </Button>
            <Button
               buttonStyle={styles.answerButton}
               title="NO"
               color={global.white}
               fontFamily='open-sans-bold'
               onPress={ () => {
                   this.driver.setAnswer( this.count, false );
                   this.changePicture();
                }
               }
            >
            </Button>
         </View>

      </View>

    );
  }
}

export { SmileGame4 };
