import React from 'react';
import {StyleSheet, Text, View, Image, TouchableHighlight, Animated } from 'react-native';
import './global-design-constants.js';
//design imports
import { Button} from 'react-native-elements';

const styles = StyleSheet.create({

  shadow: {
    zIndex: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: global.darkGreySemiTransparent,
  },

  messageBox: {
    zIndex: 2,
    width: 100,
    borderRadius: 5,
    backgroundColor: global.white,
    justifyContent: 'center',
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
})

class Popover extends React.Component {
  constructor ( props ) {
    super( props );
    this.message = props.message;
    this.state = {
      visible: props.visible
    };
  }

  show () {
    this.setState( { visible: true } );
  }

  render() {
    if ( this.state.visible ) {
      return (
        <View style={styles.shadow}>
          <View style={styles.messageBox}>
            <Text style={styles.smallText}>
              {this.message}
            </Text>
            <Button
              buttonStyle={styles.button}
              title={"Ok"}
              fontFamily='open-sans-bold'
              color={global.mainBlue}
              onPress = {() => this.setState( { visible: false } ) }
            />
          </View>
        </View>
      );
    }
    else {
      return null;
    }
  }
}

export { Popover };
