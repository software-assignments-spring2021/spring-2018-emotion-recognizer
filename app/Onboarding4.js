import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import './global-design-constants.js';
//design imports
import { Button } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';


const styles = StyleSheet.create({
  container: {
    backgroundColor: global.backgroundGreen,
    flex: 1,
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
  moreImagesButton: {
    backgroundColor: global.darkGrey,
    margin: 20,
    padding: 15,
    borderColor: global.transparent,
    borderWidth: 0,
    borderRadius: 5,
  },
   nextEmotSection: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 35
   },
   nextText: {
      fontSize: 18,
      textAlign: 'center',
      margin: 10,
      color: global.darkGrey,
      fontFamily: 'open-sans'
   },
   nextButton: {
     width: 200,
     height: 40,
     backgroundColor: global.backgroundWhite,
     borderColor: global.transparent,
     borderWidth: 0,
     borderRadius: 5,
    },
});


class Onboarding4 extends React.Component {
    //set up the title of this screen
    static navigationOptions = {
        title: "Learn Scared!"
    };

    //this constructor method is called before the componentWillMount method
    //use it to set up the starting state of the component
    constructor(props) {
        super(props); // call the parent class's (React.Component) constructor first before anything else
        this.state = { uri: global.scared };
        this.count = 1;
    } //constructor


    changePicture = () => {
    this.count++;
    if(this.count === 1) {
        this.setState({
            uri: global.scared
        });
    }
    else if (this.count === 2) {
        this.setState({
            uri: global.scared2
        });
    }
    else if (this.count === 3) {
        this.setState({
            uri: global.scared3
        });
    }
    else if (this.count === 4) {
        this.setState({
            uri: global.scared4
        });
    }
    else {
        this.setState({
            uri: global.scared5
        });
        this.count = 0;
    }
  }

  render() {
    return (
      <View style={styles.container}>

         <Text style={styles.headerText}>
            This is a
         </Text>
         <Text style={styles.boldText}>
            Scared face
         </Text>
         <Image
                 source={this.state.uri}
                 style={styles.image}
            />

          <Button
            buttonStyle={styles.moreImagesButton}
            title="Touch here to see more faces!"
            color={global.white}
            fontFamily='open-sans'
            onPress={() => this.changePicture(this.count)}>
         </Button>

         <View style={styles.nextEmotSection}>
            <Text style={styles.nextText}>Ready to move on?</Text>
            <Button
              buttonStyle={styles.nextButton}
              title="Next Emotion"
              color={global.darkGrey}
              fontFamily='open-sans'
              onPress={() => this.props.navigation.navigate('Onboarding5', {navigation: this.props.navigation})}
            />
       </View>

      </View>

    );
  }
}

export { Onboarding4 };
