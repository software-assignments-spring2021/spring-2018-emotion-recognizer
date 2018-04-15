import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import {initFirebase} from './InitFirebase';
const firebase = new initFirebase();

//design imports
import {Overlay, FormLabel, FormInput, Button, Card, TouchableOpacity } from 'react-native-elements';


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

      /*
      set starting values of email and password
      this.state = {
      };

      hack to get access to the navigation from within the firebase.auth().onAuthStateChanged callback
      global.navigation = this.props.navigation;
      const { navigation } = this.props; //pull navigation from the props into its own variable

      figure it whether user is already logged-in
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
      */

    } // constructor

  render() {
    console.log("rendering UI");
    return (

   <View style={styles.container}>

      <View style={styles.pageTabs}>
         <View style={styles.pageTab}><Text style={styles.tabText}>Games</Text></View>
         <View style={styles.pageTab}><Text style={styles.tabText}>Analytics</Text></View>
      </View>

      <View style={styles.gamesView}>
         <Text style={styles.mainViewHeader}>Games</Text>

            {
            games.map((u, i) => {
               return (
                 <Card key={i} style={styles.gameCard}>
                   <View>
                     <Text style={styles.itemHeader}>{u.name}</Text>
                     <Text style={styles.paragraph}>{u.shortDesc}</Text>
                   </View>
                   <View>

                   </View>
                   <View>
                      <Button buttonStyle={styles.playButton} titleStyle={styles.playButtonText} title="Play Now" ></Button>
                   </View>
                </Card>
               );
            })
         }

      </View>

      <View style={styles.analyticsView}>
         
      </View>
   </View>


);

  }
}

styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
   },
   pageTabs: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      maxHeight: 50,
      borderBottomWidth: 1,
      borderColor: global.darkGrey,
   },
   pageTab: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 15,
   },
   tabText: {
       color: global.darkGrey,
       fontSize: 18,
       //fontFamily: 'montserrat-bold',
       margin: 10,
   },
   gamesView: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
   },
   mainViewHeader: {
      color: global.darkGrey,
      fontSize: 18,
      //fontFamily: 'montserrat-bold',
      margin: 15,
   },
   gameCard: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      borderRadius: 10,
      margin: 15,
      padding: 10,
      backgroundColor: global.backgroundWhite,
   },
   itemHeader: {
      color: global.darkGrey,
      alignSelf: 'flex-start',
      //fontFamily: 'open-sans-bold',
      fontSize: 12,
   },
   levelNum: {
      alignSelf: 'flex-end',
      textAlign: 'right',
      fontSize: 12,
   },
   paragraph: {
      color: global.darkGrey,
      //fontFamily: 'open-sans',
      fontSize: 11,
   },
   playButton: {
      backgroundColor: global.lightGrey,
      margin: 10,
      marginTop: 15,
      width: 120,
      alignSelf: 'center',
   },
   playButtonText: {
      color: global.mainBlue,
      fontSize: 13,
   },


});

export { Dashboard };
