import React from 'react';

const Component = React.Component;

//routing boilerplate
import { StackNavigator } from 'react-navigation';

//view imports
import { Login as LoginScreen } from './Login';
import { Signup as SignupScreen } from './Signup';
import { Dashboard as DashboardScreen } from './Dashboard';

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
    initialRouteName: 'LoginScreen',
  }
);

//handle fonts
import { AppLoading, Font } from 'expo';


export default class App extends Component {

   state = { isReady: false,}
      componentWillMount() {
            (async() => {
            await Font.loadAsync({
               'open-sans': require('./src/assets/fonts/OpenSansRegular.ttf'),
               'montserrat': require('./src/assets/fonts/MontserratRegular.ttf'),
               'open-sans-bold': require('./src/assets/fonts/OpenSansBold.ttf'),
               'montserrat-bold': require('./src/assets/fonts/MontserratBold.ttf'),
            });
            this.setState({ isReady: true});
         })();
      }


  render() {
     if (!this.state.isReady) {
       return <AppLoading />;
     }

    return (
      /*<Text style={{marginTop: 30}}>
        This is not a drill!
      </Text>*/

      <RootStack />
    );
  }
}
