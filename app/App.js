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
import { Congratulations as CongratulationsScreen} from './Congratulations';
import { Dashboard as DashboardScreen } from './Dashboard';
import { SmileGame as SmileGameScreen } from './SmileGame';
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
          //headerLeft: null //this disables the back button to Login
        }),
    },
    Onboarding1: {
      screen: Onboarding1Screen,
      navigationOptions: ({ navigation }) => ({
          title: 'Onboarding1',
        }),
    },
    Onboarding2: {
      screen: Onboarding2Screen,
      navigationOptions: ({ navigation }) => ({
          title: 'Onboarding2',
        }),
    },
    Onboarding3: {
      screen: Onboarding3Screen,
      navigationOptions: ({ navigation }) => ({
          title: 'Onboarding3',
        }),
    },
    Onboarding4: {
      screen: Onboarding4Screen,
      navigationOptions: ({ navigation }) => ({
          title: 'Onboarding4',
        }),
    },
    SmileGame: {
      screen: SmileGameScreen,
      navigationOptions: ({ navigation }) => ({
          title: 'SmileGame',
        }),
    },
    Congratulations: {
      screen: CongratulationsScreen,
      navigationOptions: ({ navigation }) => ({
          title: 'Congratulations',
        }),
    },
  },
  {
    //load up the Login component by default
    initialRouteName: 'Onboarding4',
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
    Font.loadAsync(global.fonts)
      .then( () => {
      this.setState(previousState => {
        return { isReady: true };
      });
      console.log("state changed to ready");
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
