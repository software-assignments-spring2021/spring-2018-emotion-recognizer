import React from 'react';

//routing boilerplate
import { StackNavigator } from 'react-navigation';

//view imports
import { Login as LoginScreen } from './Login';
import { Signup as SignupScreen } from './Signup';
import { Dashboard as DashboardScreen } from './Dashboard';

//import our global design settings
import './global-design-constants.js'

const RootStack = StackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    Signup: {
      screen: SignupScreen,
    },
    Dashboard: {
      screen: DashboardScreen,
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

    this.state = { 
      isReady: false
    };

  } //constructor

  //this method is called just before the component is inserted/mounted into the DOM
  componentWillMount() {
    (async() => {

      //load all the fonts defined in global-design-constants.js
      await Font.loadAsync(global.fonts);

      //set the initial state of this component
      this.setState({ 
        isReady: true
      });

    })();

  } //componentWillMount

  //render this component's View onto the screen
  render() {

    // if this componenet is not ready to be displayed, return a loading View
    if (!this.state.isReady) {
      //return the Expo app's default AppLoading view
      return <AppLoading />;
    }

    // otherwise, show the Login component, which is the default in the RootStack
    return (
      /*<Text style={{marginTop: 30}}>
      This is not a drill!
      </Text>*/

      <RootStack />
    );
  }

}
