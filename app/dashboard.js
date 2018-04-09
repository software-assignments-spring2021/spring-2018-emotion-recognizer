import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity} from 'react-native';
import {initFirebase} from './InitFirebase';
const firebaseApp = new initFirebase();

const Component = React.Component;

//design imports
import {Overlay, FormLabel, FormInput, Button, Icon } from 'react-native-elements';

//theme colors
const lightGrey = "#e4e4e4";
const midGrey = "#9B9B9B";
const darkGrey = "#364652";

const mainBlue = "#3989E1";
const backgroundGreen = "#69F0AE";

const white = "FFFFFF";
const backgroundWhite = "rgba(255,255,255, 0.6)";

const starYellow = "FFFF4D";
const backgroundYellow = "rgba(255,255,77, 0.6)";

//hard code sample games
const games = [
 {
    name: 'Happy Or Sad',
    shortDesc: 'Click "thumbs up" for happy and "thumbs down" for sad',
    level: 1
 },
 {
    name: 'Happy',
    shortDesc: 'Click on the picture that has a happy face',
    level: 1
 },
 {
    name: 'Match the face',
    shortDesc: 'Repeat after the game and make the same face',
    level: 3
 },
];

let styles = {};

class Dashboard extends Component {

  authenticate() {
    firebaseApp.auth().signInWithEmailAndPassword(this.state.username, this.state.password).catch(function(error) {
      throw error;
    });
  }

  render() {
    return (
      <View style={styles.container}>

         <Icon
            name='star'
            size= {30}
            color= { starYellow }
            Raised
            iconStyle={styles.starStyle}
         />
         <Text style={styles.headerText}> 21 </Text>
         <Text style={styles.paragraph}> Next Level in: </Text><Text style={styles.levelHighlight}>30 Points</Text>
         <Card style={styles.sectionCard}>
            {
            games.map((u, i) => {
               return (
                 <View key={i} style={styles.gameCard}>
                   <View>
                      <Text style={styles.itemHeader}>{u.name}</Text>
                      <Text style={styles.paragraph}>{u.shortDesc}</Text>
                   </View>
                   <View>
                     <Text style={styles.levelNum}>{u.level}</Text>
                     <Icon
                        name='info-circle'
                        size= {20}
                        color= { darkGrey }
                     />
                     <Icon
                        name='check-circle'
                        size= {20}
                        color= { darkGrey }
                     />
                     <Icon
                        name='cog'
                        size= {20}
                        color= { darkGrey }
                     />
                   </View>
                 </View>
               );
            })
         }
         </Card>

      </View>

    );
  }
}

styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
   },
   headerText: {
       color: darkGrey,
       fontSize: 48,
       fontFamily: 'montserrat-bold',
       margin: 15,
       marginBottom: 40,
    },
    starStyle: {
      marginTop: 20,
      marginLeft: 30,
   },
   levelHighlight: {
      fontFamily: 'open-sans-bold',
      fontSize: 12,
      color: mainBlue
   },
   sectionCard: {
      backgroundColor: backgroundGreen,
   },
   gameCard: {
      borderRadius: 5,
      margin: 10,
      padding: 5,
      flex: 1,
      flexDirection: 'row',
      backgroundColor: backgroundWhite,
   },
   itemHeader: {
      color: darkGrey,
      fontFamily: 'open-sans-bold',
      fontSize: 12,
   },
   paragraph: {
      color: darkGrey,
      fontFamily: 'open-sans',
      fontSize: 11,
   },
   levelNum: {
      color: mainBlue,
      fontFamily: 'open-sans-bold',
      fontSize: 21
   },

});

export { Dashboard };
