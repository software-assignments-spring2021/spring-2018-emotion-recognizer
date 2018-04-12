import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity} from 'react-native';
import {initFirebase} from './InitFirebase';
const firebase = new initFirebase();

//design imports
import {Overlay, FormLabel, FormInput, Button, Icon } from 'react-native-elements';


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

class Dashboard extends React.Component {
  //this constructor method is called before the componentWillMount method
  //use it to set up the starting state of the component
  constructor(props) {
      console.log("Constructing...");

      super(props); // call the parent class's (React.Component) constructor first before anything else

      console.log(props);

      // set starting values of email and password
      // this.state = {
      // };

      //hack to get access to the navigation from within the firebase.auth().onAuthStateChanged callback
      //global.navigation = this.props.navigation;
      const { navigation } = this.props; //pull navigation from the props into its own variable

      // figure it whether user is already logged-in
      const user = firebase.auth().currentUser;
      if (user) {
        // User is signed in.
        console.log("User " + user.email + " is signed in..");

        //keep a reference to this user's info
        this.state = {
          user: user
        };

      } else {
        // No user is signed in.
        console.log("No user is signed in!");
        navigation.pop();

      }

    } // constructor




  render() {
    return (
      <View style={styles.container}>

         <Icon
            name='star'
            size= {30}
            color= { global.starYellow }
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
                        color= {global.darkGrey}
                     />
                     <Icon
                        name='check-circle'
                        size= {20}
                        color= { global.darkGrey }
                     />
                     <Icon
                        name='cog'
                        size= {20}
                        color= { global.darkGrey }
                     />
                   </View>
                 </View>
               );
            })
         }
         </Card>

      <Icon
         name='star'
         size= {30}
         color= '#FFFF4D'
         Raised
         iconStyle={styles.starStyle}
      />


   <Text style={styles.headerText}> {this.state.user.email} </Text>

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
       color: {global.darkGrey},
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
      color: global.mainBlue
   },
   sectionCard: {
      backgroundColor: global.backgroundGreen,
   },
   gameCard: {
      borderRadius: 5,
      margin: 10,
      padding: 5,
      flex: 1,
      flexDirection: 'row',
      backgroundColor: global.backgroundWhite,
   },
   itemHeader: {
      color: global.darkGrey,
      fontFamily: 'open-sans-bold',
      fontSize: 12,
   },
   paragraph: {
      color: global.darkGrey,
      fontFamily: 'open-sans',
      fontSize: 11,
   },
   levelNum: {
      color: global.mainBlue,
      fontFamily: 'open-sans-bold',
      fontSize: 21
   },

});

export { Dashboard };
