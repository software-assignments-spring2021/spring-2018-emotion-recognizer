import React from 'react';
import {StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import './global-design-constants.js';
//design imports
import { Button} from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
//GameDriver import
import { GameDriver } from './GameDriver.js';

import { Popover } from './Popover.js';

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
    fontFamily: 'montserrat-bold'
  },
  boldText: {
    color: global.white,
    textAlign: 'center',
    fontSize: 50,
    marginBottom: 10,
    fontFamily: 'montserrat-bold-italic'
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
     backgroundColor: global.mainBlue,
     marginTop: 20,
     width: 130,
     borderColor: global.transparent,
     borderWidth: 0,
     borderRadius: 5,
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
        this.driver = new GameDriver( this.props.navigation.state.params.testData, 5, 'happy vs sad' );
        const firstQuestion = this.driver.getQuestion( this.count );
        this.state = { uri: firstQuestion.img, emotionPrompt: firstQuestion.emotion, popped: false };
    } //constructor



    changePicture() {
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
        {
          this.state.popped ? (<Popover message="Try Again!" hide={() => this.setState( { popped: false } ) }/>) : null
        }
        <Image
          style={styles.bgImage}
          source={global.gameBg }
        />

        <Text style={styles.headerText}>
               Is this person
        </Text>
        <Text style={styles.boldText}>
           {this.state.emotionPrompt}?
        </Text>
        <Image
          source={this.state.uri}
          style={styles.image}
         />

         <View style={styles.answerArea}>
            <Button
               buttonStyle={styles.answerButton}
               title="YES"
               color={global.white}
               fontFamily='open-sans-bold'
               onPress={ () => {
                   if( this.driver.setAnswer( this.count, true ) ) {
                     this.setState({ popped: false });
                     this.changePicture();
                   }
                   else {
                     this.setState({ popped: true });
                   }
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
                   if( this.driver.setAnswer( this.count, false ) ) {
                     this.setState({ popped: false });
                     this.changePicture();
                   }
                   else {
                     this.setState({ popped: true });
                   }
                }
               }
            >
            </Button>
         </View>

      </View>

    );
  }
}

export { SmileGame };
