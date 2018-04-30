import React from 'react';
import {StyleSheet, Text, View, Image, TouchableHighlight, Animated, Dimensions} from 'react-native';
import './global-design-constants.js';
//design imports
import { Button} from 'react-native-elements';

const styles = StyleSheet.create({

  shadow: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: global.darkGreySemiTransparent,
  },

  messageBox: {
    zIndex: 2,
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

   text: {
     color: global.darkGrey,
     fontSize: 20,
     fontFamily: 'open-sans-bold',
     margin: 10
   },
});

class Popover extends React.Component {
  constructor ( props ) {
    super( props );
    this.message = props.message;
    this.hide = props.hide;
  }

  render() {
    return (
      <View style={styles.shadow}>
        <View style={styles.messageBox}>
          <Text style={styles.text}>
            {this.message}
          </Text>
          <Button
            buttonStyle={styles.button}
            title={"Ok"}
            fontFamily='open-sans-bold'
            color={global.mainBlue}
            onPress = {() => this.hide() }
          />
        </View>
      </View>
    );
  }
}

export { Popover };
