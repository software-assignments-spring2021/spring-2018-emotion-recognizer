
'use strict';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';

export class NoMoreCards extends React.Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return (
      <View style={styles.noMoreCards}>
        <Text>No more cards</Text>
      </View>
    )
  }
}
 
const cards = [
  //see if images are ok to use
  {name: '1', image: 'https://unsplash.com/photos/4K2lIP0zc_k'},
  {name: '2', image: 'https://unsplash.com/photos/FaiZNiofP-U'},
  {name: '3', image: 'https://unsplash.com/photos/u3WmDyKGsrY'},
  {name: '4', image: 'https://unsplash.com/photos/VBoa34qcW4w'},
  {name: '5', image: 'https://unsplash.com/photos/lVCHfXn3VME'},
  {name: '6', image: 'https://unsplash.com/photos/HRZUzoX1e6w'},
  {name: '7', image: 'https://unsplash.com/photos/-DqEUX1QSVc'},
  {name: '8', image: 'https://unsplash.com/photos/v-NBXj3Yv5o'},
  {name: '9', image: 'https://unsplash.com/photos/UMe87yYt2JU'},
]
 
const cards2 = [
  {name: '10', image: 'https://unsplash.com/photos/NPmR0RblyhQ'},
  {name: '11', image: 'https://unsplash.com/photos/7KHCNCddn2U'},
  {name: '12', image: 'https://unsplash.com/photos/W82dYwtQrTk'},
  {name: '13', image: 'https://unsplash.com/photos/MlT0BQk4Qdk'},
]
 
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: cards,
      outOfCards: false
    }
  }
 
  handleYup (card) {
    console.log("happy")
  }
 
  handleNope (card) {
    console.log("sad")
  }
 
  cardRemoved (index) {
    console.log(`The index is ${index}`);
 
    let CARD_REFRESH_LIMIT = 3
 
    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);
 
      if (!this.state.outOfCards) {
        console.log(`Adding ${cards2.length} more cards`)
 
        this.setState({
          cards: this.state.cards.concat(cards2),
          outOfCards: true
        })
      }
 
    }
 
  }
 
  render() {
    return (
      <Card
        cards={this.state.cards}
        loop={false}
 
        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        showYup={true}
        showNope={true}
 
        handleYup={this.handleYup}
        handleNope={this.handleNope}
        cardRemoved={this.cardRemoved.bind(this)}
      />
    )
  }
}
 
const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1,
    elevation: 1,
  },
  thumbnail: {
    width: 300,
    height: 300,
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export { Card };
