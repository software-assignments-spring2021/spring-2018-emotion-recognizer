import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import { Pie, SmoothLine } from 'react-native-pathjs-charts';
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

const pieData = [{
   "name": "Washington",
   "population": 7694980
 },
  {
   "name": "Oregon",
   "population": 2584160
 }, {
   "name": "Minnesota",
   "population": 6590667,
   "color": {'r':223,'g':154,'b':20}
 }, {
   "name": "Alaska",
   "population": 7284698
 }
];

 const pieOptions = {
   margin: {
     top: 20,
     left: 20,
     right: 20,
     bottom: 20
   },
   width: 350,
   height: 350,
   color: '#2980B9',
   r: 50,
   R: 150,
   legendPosition: 'topLeft',
   animate: {
     enabled: true,
     type: 'oneByOne',
     duration: 200,
     fillTransition: 3
   },
   label: {
     fontFamily: 'Arial',
     fontSize: 8,
     fontWeight: true,
     color: '#ECF0F1'
   }
};

let data = [
    [{
      "x": -10,
      "y": -1000
    }, {
      "x": -9,
      "y": -729
    }, {
      "x": -8,
      "y": -512
    }, {
      "x": -7,
      "y": -343
    }, {
      "x": -6,
      "y": -216
    }, {
      "x": -5,
      "y": -125
    }, {
      "x": -4,
      "y": -64
    }, {
      "x": -3,
      "y": -27
    }, {
      "x": -2,
      "y": -8
    }, {
      "x": -1,
      "y": -1
    }, {
      "x": 0,
      "y": 0
    }, {
      "x": 1,
      "y": 1
    }, {
      "x": 2,
      "y": 8
    }, {
      "x": 3,
      "y": 27
    }, {
      "x": 4,
      "y": 64
    }, {
      "x": 5,
      "y": 125
    }, {
      "x": 6,
      "y": 216
    }, {
      "x": 7,
      "y": 343
    }, {
      "x": 8,
      "y": 512
    }, {
      "x": 9,
      "y": 729
    }, {
      "x": 10,
      "y": 1000
    }],
    [{
      "x": -10,
      "y": 100
    }, {
      "x": -9,
      "y": 81
    }, {
      "x": -8,
      "y": 64
    }, {
      "x": -7,
      "y": 49
    }, {
      "x": -6,
      "y": 36
    }, {
      "x": -5,
      "y": 25
    }, {
      "x": -4,
      "y": 16
    }, {
      "x": -3,
      "y": 9
    }, {
      "x": -2,
      "y": 4
    }, {
      "x": -1,
      "y": 1
    }, {
      "x": 0,
      "y": 0
    }, {
      "x": 1,
      "y": 1
    }, {
      "x": 2,
      "y": 4
    }, {
      "x": 3,
      "y": 9
    }, {
      "x": 4,
      "y": 16
    }, {
      "x": 5,
      "y": 25
    }, {
      "x": 6,
      "y": 36
    }, {
      "x": 7,
      "y": 49
    }, {
      "x": 8,
      "y": 64
    }, {
      "x": 9,
      "y": 81
    }, {
      "x": 10,
      "y": 100
    }]
  ]

  let options = {
    width: 280,
    height: 280,
    color: '#2980B9',
    margin: {
      top: 20,
      left: 45,
      bottom: 25,
      right: 20
    },
    animate: {
      type: 'delayed',
      duration: 200
    },
    axisX: {
      showAxis: true,
      showLines: true,
      showLabels: true,
      showTicks: true,
      zeroAxis: false,
      orient: 'bottom',
      label: {
        fontFamily: 'Arial',
        fontSize: 14,
        fontWeight: true,
        fill: '#34495E'
      }
    },
    axisY: {
      showAxis: true,
      showLines: true,
      showLabels: true,
      showTicks: true,
      zeroAxis: false,
      orient: 'left',
      label: {
        fontFamily: 'Arial',
        fontSize: 14,
        fontWeight: true,
        fill: '#34495E'
      }
    }
  };

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

   <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.pageTabs}>
         <View style={styles.pageTab}><Text style={styles.tabText}>Games</Text></View>
         <View style={styles.pageTab}><Text style={styles.tabText}>Analytics</Text></View>
      </View>

      <View style={styles.gamesView}>
         <Text style={styles.mainViewHeader}>Games</Text>

            {
            games.map((u, i) => {
               return (
                 <Card key={i} containerStyle={styles.gameCard}>
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
         <Text style={styles.mainViewHeader}>Analytics</Text>
            <View>
            <Pie data={pieData}

             options={pieOptions}
             accessorKey="population"
             margin={{ top: 20, left: 20, right: 20, bottom: 20 }}
             color="#2980B9"
             pallete={
               [
                 { 'r': 25, 'g': 99, 'b': 201 },
                 { 'r': 24, 'g': 175, 'b': 35 },
                 { 'r': 190, 'g': 31, 'b': 69 },
                 { 'r': 100, 'g': 36, 'b': 199 },
                 { 'r': 214, 'g': 207, 'b': 32 },
                 { 'r': 198, 'g': 84, 'b': 45 }
               ]
             }
             r={50}
             R={150}
             legendPosition="topLeft"
             label={{
               fontFamily: 'Arial',
               fontSize: 8,
               fontWeight: true,
               color: '#ECF0F1'
             }}
             />
         </View>
         <View>
            <SmoothLine data={data} options={options} xKey="x" yKey="y" />
         </View>
      </View>
   </ScrollView>


);

  }
}

styles = StyleSheet.create({
  container: {
      justifyContent: 'flex-start',
      alignItems: 'stretch',
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
      flex: 2,
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
      alignItems: 'center',
      borderRadius: 5,
      alignSelf: 'stretch',
      padding: 20,
      paddingBottom: 5,
      backgroundColor: global.backgroundGreen,
   },
   itemHeader: {
      color: global.darkGrey,
      alignSelf: 'flex-start',
      //fontFamily: 'open-sans-bold',
      fontSize: 14,
      paddingBottom: 5,
   },
   levelNum: {
      alignSelf: 'flex-end',
      textAlign: 'right',
      fontSize: 12,
   },
   paragraph: {
      color: global.darkGrey,
      //fontFamily: 'open-sans',
      fontSize: 13,
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
   analyticsView: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
   },


});

export { Dashboard };
