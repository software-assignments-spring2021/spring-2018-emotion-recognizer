import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import './global-design-constants.js';
//design imports
import { Button} from 'react-native-elements';

//console.log('firebase from Signup.js:',firebase);

const styles = StyleSheet.create({
  container: {
    backgroundColor: global.secondaryGreen,
    flex: 1,
    alignItems: 'center',
  },
  bgImage: {
     backgroundColor: global.lightGreySemiTransparent,
     position: 'absolute',
     width: '100%',
     height: '100%',
     justifyContent: 'center',
  },
  boldText: {
    color: global.white,
    justifyContent: 'center',
    fontSize: 42,
    marginTop: 55,
    marginBottom: 25,
    fontFamily: 'montserrat-bold'
  },
  text: {
    color: global.white,
    justifyContent: 'center',
    fontSize: 24,
    marginBottom: 55,
    fontFamily: 'montserrat-bold'
  },
  movingImage: {
    width: 390,
    height: 300,
    justifyContent: 'center',
    marginBottom: 5,
    marginTop: 10
  },
  nextStepsArea: {
     marginTop: 35,
     alignItems: 'center',
  },
  button: {
    width: 210,
    height: 40,
    borderColor: global.transparent,
    borderWidth: 0,
    borderRadius: 5,
    backgroundColor: global.backgroundWhite,
   },
   smallText: {
     color: global.white,
     fontSize: 20,
     fontFamily: 'open-sans-bold',
     margin: 10
   },
});


class Congratulations2 extends React.Component {
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

        <Image
          style={styles.bgImage}
          source={global.confetti}
        />

     <View>
        <Text style={styles.boldText}>
            You completed the game!
        </Text>

     </View>

        <Image style={styles.movingImage}
            source={{ uri: 'https://media.giphy.com/media/3o6fIUZTTDl0IDjbZS/giphy-downsized.gif' }}
          />


       <View style={styles.nextStepsArea}>
           <Button
             buttonStyle={styles.button}
             title="Back to home"
             fontFamily='open-sans-bold'
             color={global.mainBlue}
             onPress = {() => this.props.navigation.navigate('Dashboard', {navigation: this.props.navigation})}
           />
           <Text style={styles.smallText}>
               ----- or ------
           </Text>
           <Button
               buttonStyle={styles.button}
               title={"Match your face!"}
               fontFamily='open-sans-bold'
               color={global.mainBlue}
               onPress = {() => this.props.navigation.navigate('SmileGame', {navigation: this.props.navigation})}
           />
       </View>

      </View>

    );
  }
}

export { Congratulations2 };
