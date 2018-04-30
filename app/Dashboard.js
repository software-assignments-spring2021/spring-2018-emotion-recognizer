import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import { Pie, StockLine } from 'react-native-pathjs-charts';
import {initFirebase} from './InitFirebase';
const firebase = new initFirebase();

//design imports
import {Button, Card } from 'react-native-elements';


//hard code games
const games = [
 {
    name: 'Happy Or Sad',
    shortDesc: 'Check how well you know the difference between happy and sad with this quiz',
    path: 'SmileGame',
    level: 1
 },
  {
    name: 'Angry Or Scared',
    shortDesc: 'Check how well you know the difference between angry and scared with this quiz',
    path: 'SmileGame2',
    level: 1
 },
   {
    name: 'Surprised Or Sad',
    shortDesc: 'Check how well you know the difference between surprised and sad with this quiz',
    path: 'SmileGame3',
    level: 1
 },
  {
    name: 'Scared or Happy',
    shortDesc: 'Check how well you know the difference between scared and happy with this quiz',
    path: 'SmileGame4',
    level: 1
 },
  {
    name: 'Angry or Surprised',
    shortDesc: 'Check how well you know the difference between angry and surprised with this quiz',
    path: 'SmileGame5',
    level: 1
 },
 {
    name: '5 Emotions Quiz',
    shortDesc: 'Check how well you\'ve learned all emotions with this quiz',
    path: 'SmileGameAll',
    level: 2
 },
 {
    name: 'Match the face',
    shortDesc: 'Repeat after the game and make the same face',
    path: '',
    level: 3
 },
];

//init variables for charts
const db = firebase.firestore();
let uid;



const pieOptions = {
   margin: {
      top: 20,
      left: 45,
      bottom: 25,
      right: 20
   },
   width: 350,
   height: 350,
   color: global.mainBlue,
   r: 40,
   R: 150,
   legendPosition: 'topLeft',
   animate: {
    enabled: true,
    type: 'oneByOne',
    duration: 200,
    fillTransition: 3
   },
   label: {
    fontFamily: 'open-sans',
    fontSize: 11,
    fontWeight: true,
    color: '#ECF0F1'
   },
   textAnchor:'top'
};

const smoothOptions = {
      width: 280,
      height: 280,
      color: global.backgroundGreen,
      margin: {
        top: 10,
        left: 35,
        bottom: 30,
        right: 10
      },
      animate: {
        type: 'delayed',
        duration: 200
      },
      axisX: {
        showAxis: true,
        showLines: false,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'bottom',
        tickValues: [],
        label: {
          fontFamily: 'open-sans',
          fontSize: 13,
          fontWeight: true,
          fill: global.darkGrey
        }
      },
      axisY: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'left',
        tickValues: [],
        label: {
            fontFamily: 'open-sans',
            fontSize: 13,
            fontWeight: true,
            fill: global.darkGrey
          }
      },
      strokeWidth: 2,

      showAreas: (curve: number, index: number) => index === 0,

      showPoints: (graphIndex: number, pointIndex: number) =>
        graphIndex === 1 && pointIndex === this.state.smoothDataState[1].length - 1,
      renderPoint: () => [
        // <Circle key="light" fill={global.darkGrey} cx={0} cy={0} r={10} fillOpacity={0.5} />,
        <Circle key="full" fill={global.darkGrey} cx={0} cy={0} r={7} fillOpacity={1} />,
      ],

      strokeDasharray: (curve: number, index: number) => (index === 2 ? [5] : []),
      strokeOpacity: (curve: number, index: number) => (index === 2 ? 0.3 : 1),
};

let styles = {};

class Dashboard extends React.Component {
  //this constructor method is called before the componentWillMount method
  //use it to set up the starting state of the component

  //arrange async load for chart states
  setStateAsync(state) {
    return new Promise((resolve) => {
      console.log("changing state");
      this.setState(state, resolve);
    });
  }

  constructor(props) {
      // console.log("Constructing...");

      super(props); // call the parent class's (React.Component) constructor first before anything else

      // console.log(props);

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
          analyticsStatus: false,
          pieDataState: false,
          smoothDataState: false
        };

        //get the chart data from the back end
        this.getChartData();


    } else {
        // No user is signed in.
        console.log("No user is signed in!");
        navigation.pop();

      }
    } // constructor

  //show the selected view in the top nav bar
  ShowHideView () {
     if (this.state.gamesStatus === true) {
       this.setState({gamesStatus: false, analyticsStatus: true});
       console.log("state change: showing analytics");
     } else {
        this.setState({gamesStatus: true, analyticsStatus: false});
        console.log("state change: showing games");
     }
   }

   getChartData = async () => {

      //get current user info to call their data
      uid = firebase.auth().currentUser.uid;
      let pieStuff = [];
      const smoothStuff = [[]];
      smoothStuff[0].push({x:0, y:0}, {x:0, y:110});
      const scope = this;
      //get chart information by querying db
      db.collection('users').doc(uid).get().then(function(doc) {
         let userData;
         if (doc.exists) {
           userData = doc.data();
         }
         else {
           userData = {
             emotions: [],
             testResults: []
           };
         }
         //console.log("user data: " + userData);

         //update pie chart w/ total correct, incorrect
         let totalCorrect = 0;
         let totalIncorrect = 0;

         for (const e in userData.emotions) {
           totalCorrect += userData.emotions[e].correct;
           totalIncorrect += userData.emotions[e].total - userData.emotions[e].correct;
         }

         pieStuff = [{
             "name": "Correct",
             "percent": totalCorrect
           },
            {
             "name": "Incorrect",
             "percent": totalIncorrect
           }];

          //get the quiz information to plot quizzes over time
          let totalQuizCorrect = 0;
          let totalQuizQuestions = 0;
          let quizCounter = 0;

          for (const e in userData.testResults) {
            totalQuizCorrect = userData.testResults[e].questionsCorrect;
            totalQuizQuestions = userData.testResults[e].questionsTotal;

            let percentCorrect = totalQuizCorrect/totalQuizQuestions;

            //ensure the graph is capped at 100
            if (percentCorrect === 1) {
               percentCorrect = .99;
            }

            const tempQuizObj = {
              x: 0,
              y: 0
            };

            tempQuizObj.x = quizCounter;
            tempQuizObj.y = percentCorrect * 100;

            smoothStuff[0].push(tempQuizObj);
            quizCounter++;
          }

          scope.setStateAsync({smoothDataState: smoothStuff});
          scope.setStateAsync({pieDataState: pieStuff});
     });
     await pieStuff;
   }


  render() {
    // console.log("rendering UI");
    // console.log("gamesStatus: " + this.state.gamesStatus);
    // console.log("analyticsStatus: " + this.state.analyticsStatus);
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
                   fontFamily='open-sans-bold'
                   fontSize={16}
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
                     <Text style={styles.itemHeader}>{u.name}
                        <Text style={styles.levelNum}> Level: {u.level}</Text>
                     </Text>
                     <Text style={styles.paragraph}>{u.shortDesc}</Text>
                   </View>
                   <View>

                   </View>
                   <View>
                      <Button
                        buttonStyle={styles.playButton}
                        color={global.lightGrey}
                        title="Play Now"
                        fontFamily='open-sans-bold'
                        fontSize={16}
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

               <Pie data={this.state.pieDataState}

                options={pieOptions}
                accessorKey="percent"
                margin={{ top: 20, left: 20, right: 20, bottom: 20 }}
                color="#2980B9"
                pallete={
                  [
                    { 'r': 100, 'g': 221, 'b': 23 },
                    { 'r': 232, 'g': 58, 'b': 48 },
                  ]
                }

                />
            </View>
            <View style={styles.chartStyles}>
               <Text style={styles.graphHeader}>Percent Correct Over Time</Text>

               <StockLine data={this.state.smoothDataState} options={smoothOptions} xKey="x" yKey="y"/>
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
      fontSize: 15,
      paddingBottom: 5,
   },
   levelNum: {
      alignSelf: 'flex-end',
      textAlign: 'right',
      fontFamily: 'open-sans-bold',
      fontSize: 13,
      color: global.mainBlue
   },
   paragraph: {
      color: global.darkGrey,
      fontFamily: 'open-sans',
      fontSize: 14,
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
