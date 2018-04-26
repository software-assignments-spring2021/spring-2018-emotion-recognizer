import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import { Pie, SmoothLine } from 'react-native-pathjs-charts';
import {initFirebase} from './InitFirebase';
const firebase = new initFirebase();

//design imports
import {Button, Card, TouchableOpacity } from 'react-native-elements';


//hard code sample games
const games = [
 {
    name: 'Happy Or Sad',
    shortDesc: 'Check how well you know the difference between happy and sad with this quiz',
    path: 'SmileGame',
    level: 1
 },
 {
    name: '4 Emotions Quiz',
    shortDesc: 'Check how well you\'ve learned all emotions with this quiz',
    path: 'SmileGame2',
    level: 2
 },
 {
    name: 'Match the face',
    shortDesc: 'Repeat after the game and make the same face',
    path: '',
    level: 3
 },
];

const pieData = [{
   "name": "Happy",
   "population": 7694980
 },
  {
   "name": "Sad",
   "population": 2584160
 }, {
   "name": "Excited",
   "population": 6590667,
   "color": {'r':223,'g':154,'b':20}
 }, {
   "name": "Angry",
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


const smoothData = [
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

];

  const smoothOptions = {



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

      //set starting values of email and password
      this.state = {
      };

      //hack to get access to the navigation from within the firebase.auth().onAuthStateChanged callback
      global.navigation = this.props.navigation;
      const { navigation } = this.props; //pull navigation from the props into its own variable

      //figure it whether user is already logged-in
      const user = firebase.auth().currentUser;
      if (user) {
        // User is signed in.
        console.log("User " + user.email + " is signed in..");

        //keep a reference to this user's info
        this.state = {
          user: user,
          gamesStatus: true,
          analyticsStatus: false
        };

      } else {
        // No user is signed in.
        console.log("No user is signed in!");
        navigation.pop();

      }


    } // constructor


  //show the selected view in the top nav bar
  ShowHideView () {
     console.log("button pressed");
     if (this.state.gamesStatus === true) {
       this.setState({gamesStatus: false, analyticsStatus: true});
       console.log("state change: showing analytics");
     } else {
        this.setState({gamesStatus: true, analyticsStatus: false});
        console.log("state change: showing games");
     }
   }

  render() {
    console.log("rendering UI");
    console.log("gamesStatus: " + this.state.gamesStatus);
    console.log("analyticsStatus: " + this.state.analyticsStatus);
    return (

   <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.pageTabs}>
         <View style={styles.pageTab}>
         <Button
            title="Games"
            buttonStyle={[styles.topButton, this.state.gamesStatus && styles.topButtonActive]}
            color={global.darkGrey}
            onPress={this.ShowHideView.bind(this)}
            >
         </Button>
         </View>
         <Text style={styles.tabDivider}></Text>
         <View style={styles.pageTab}>
            <Button
               title="Analytics"
               buttonStyle={[styles.topButton, this.state.analyticsStatus && styles.topButtonActive]}
               color={global.darkGrey}
               onPress={this.ShowHideView.bind(this)}
               >
            </Button>
         </View>
      </View>

      { this.state.gamesStatus ? <View style={styles.gamesView}>
         <Text style={styles.mainViewHeader}>Games</Text>

         <Card containerStyle={styles.gameCard}>
             <View>
                <Text style={styles.itemHeader}>Learn Emotions</Text>
                <Text style={styles.paragraph}>Go through faces to learn how emotions look and to prepare for the games</Text>
             </View>
             <View>

             </View>
             <View>
                 <Button
                   buttonStyle={styles.playButton}
                   color={global.lightGrey}
                   title="Learn Now"
                   onPress={() => this.props.navigation.navigate('Onboarding1', {navigation: this.props.navigation})}
                   >
                 </Button>
             </View>
          </Card>

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
                      <Button
                        buttonStyle={styles.playButton}
                        color={global.lightGrey}
                        title="Play Now"
                        onPress={() => this.props.navigation.navigate(u.path, {navigation: this.props.navigation})}
                        >
                      </Button>
                   </View>
                </Card>
               );
            })
         }

      </View> : null
      }

      { this.state.analyticsStatus ?
         <View style={styles.analyticsView}>
            <Text style={styles.mainViewHeader}>Analytics</Text>
            <View style={styles.chartStyles}>
               <Text style={styles.graphHeader}>Total Answers</Text>

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
            <View style={styles.chartStyles}>
               <Text style={styles.graphHeader}>Scores Over Time</Text>

               <SmoothLine data={smoothData} options={smoothOptions} xKey="x" yKey="y"/>
               <Text style={styles.graphSubHeader}>Games Played</Text>
            </View>
         </View> : null
      }
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
   topButton: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      width: 180,
   },
   topButtonActive: {
      backgroundColor: global.backgroundGreen,
      width: 180,
      borderRadius: 5,
      margin: 0,
   },
   tabDivider: {
      borderWidth: 1,
      borderColor: global.darkGrey,
      height: 40
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
      fontFamily: 'montserrat-bold',
      margin: 20,
      textAlign: 'center',
   },
   gameCard: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'stretch',
      borderRadius: 5,
      alignSelf: 'stretch',
      padding: 20,
      paddingBottom: 5,
      backgroundColor: global.backgroundGreen,
   },
   itemHeader: {
      color: global.darkGrey,
      alignSelf: 'flex-start',
      fontFamily: 'open-sans-bold',
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
      fontFamily: 'open-sans',
      fontSize: 13,
   },
   playButton: {
      backgroundColor: global.mainBlue,
      margin: 10,
      padding: 10,
      marginTop: 15,
      width: 120,
      alignSelf: 'center',
      borderRadius: 3,
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
      marginTop: 30,
      marginBottom: 50,
   },
   chartStyles: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
   },
   graphHeader: {
      fontSize: 15,
      color: global.mainBlue,
      textAlign: 'center',
      fontFamily: 'montserrat-bold',
   },
   graphSubHeader: {
      color: global.darkGrey,
      fontSize: 12,
      fontFamily: 'open-sans',
   },


});

export { Dashboard };
