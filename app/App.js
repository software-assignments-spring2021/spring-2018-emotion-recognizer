import React from 'react';

//routing boilerplate
import { StackNavigator } from 'react-navigation';

//view imports
import { Login as LoginScreen } from './Login';
import { Signup as SignupScreen } from './Signup';
import { Onboarding1 as Onboarding1Screen} from './Onboarding1';
import { Onboarding2 as Onboarding2Screen} from './Onboarding2';
import { Onboarding3 as Onboarding3Screen} from './Onboarding3';
import { Onboarding4 as Onboarding4Screen} from './Onboarding4';
import { Onboarding5 as Onboarding5Screen} from './Onboarding5';
import { Congratulations as CongratulationsScreen} from './Congratulations';
import { Congratulations2 as Congratulations2Screen} from './Congratulations2';
import { Dashboard as DashboardScreen } from './Dashboard';
import { SmileGame as SmileGameScreen } from './SmileGame';
import { deepLinker1 as linkToAffdex } from './deepLinker1'
//import our global design settings
import './global-design-constants.js';

const RootStack = StackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: ({ navigation }) => ({
          title: 'Login',
        }),
    },
    Signup: {
      screen: SignupScreen,
      navigationOptions: ({ navigation }) => ({
          title: 'Sign Up',
        }),
    },
    Dashboard: {
      screen: DashboardScreen,
      navigationOptions: ({ navigation }) => ({
          title: 'Dashboard',
          headerLeft: null //this disables the back button to Login
        }),
    },
    Onboarding1: {
      screen: Onboarding1Screen,
      navigationOptions: ({ navigation }) => ({
          title: 'Learn Happy',
        }),
    },
    Onboarding2: {
      screen: Onboarding2Screen,
      navigationOptions: ({ navigation }) => ({
          title: 'Learn Sad',
        }),
    },
    Onboarding3: {
      screen: Onboarding3Screen,
      navigationOptions: ({ navigation }) => ({
          title: 'Learn Angry',
        }),
    },
    Onboarding4: {
      screen: Onboarding4Screen,
      navigationOptions: ({ navigation }) => ({
          title: 'Learn Scared',
        }),
    },
    Onboarding5: {
      screen: Onboarding5Screen,
      navigationOptions: ({ navigation }) => ({
          title: 'Learn Surprised',
        }),
    },
    SmileGame: {
      screen: SmileGameScreen,
      navigationOptions: ({ navigation }) => ({
          title: 'Play the Game',
        }),
    },
    Congratulations: {
      screen: CongratulationsScreen,
      navigationOptions: ({ navigation }) => ({
          title: 'Congratulations',
          headerLeft: null //this disables the back button to Login
        }),
    },
    Congratulations2: {
      screen: Congratulations2Screen,
      navigationOptions: ({ navigation }) => ({
          title: 'Congratulations',
          headerLeft: null //this disables the back button to Login
        }),
    },
    deepLinker1: {
      screen: linkToAffdex,
      navigationOptions: ({ navigation }) => ({
          title: 'Make an expression!',
        }),
    },
  },
  {
    //load up the Login component by default
    initialRouteName: 'Login',
  }
);

//handle fonts
import { AppLoading, Font } from 'expo';

export default class App extends React.Component {

  //this constructor method is called before the componentWillMount method
  //use it to set up the starting state of the component
  constructor(props) {
    super(props); // call the parent class's (React.Component) constructor first before anything else

    //set the initial state of this component
    this.state = {
      isReady: false,
    };
  } //constructor

  //this method is called just before the component is inserted/mounted into the DOM
  componentWillMount() {
    Font.loadAsync(global.fonts, global.images)
      .then( () => {
      this.setState(previousState => {
        return { isReady: true };
      });
      console.log("Fonts Sucessfully loaded");
      })
      .catch( (err) => {
        console.log(err);
      });
  } //componentWillMount

  //render this component's View onto the screen
  render() {
    // if this componenet is not ready to be displayed, return a loading View
    console.log(this.state);

    let screen;
    if (!this.state.isReady) {
      //fonts have not loaded yet
      screen = <AppLoading />;
    }
    else {
      // fonts have loaded
      screen = <RootStack />;
    }

    return (screen);
  }

}
