import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';

const Component = React.Component;

import { constants } from 'expo';

import { Login } from './Login';

//routing imports
import { NativeRouter } from 'react-router-native';


export default class App extends Component {

  render() {
    return (
      < Login/>
    )
  }
}
