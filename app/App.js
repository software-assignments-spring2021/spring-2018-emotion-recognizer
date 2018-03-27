import React from 'react';

const Component = React.Component;

//routing boilerplate
import { StackNavigator } from 'react-navigation';

//view imports
import { Login as LoginScreen } from './Login';
import { Signup as SignupScreen } from './Signup';

const RootStack = StackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    Signup: {
      screen: SignupScreen,
    },
  },
  {
    initialRouteName: 'Login',
  }
);

export default class App extends Component {

  render() {
    return (
      /*<Text style={{marginTop: 30}}>
        This is not a drill!
      </Text>*/

      <RootStack />
    );
  }
}
