import React from 'react';
import {StyleSheet, Text, View, Image, } from 'react-native';
import './global-design-constants.js';

import { Button } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';


import { Linking } from 'react-native';
//Linking.openURL('AffdexEmoji://');

//Expo.Linking.makeUrl('AffdexEmoji://');

class deepLinker1 extends React.component{
	Linking.openURL('AffdexEmoji://);
}

export { deepLinker1 };




