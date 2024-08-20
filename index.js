/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {MenuProvider} from 'react-native-popup-menu';
import App from './src/containers/App';
import {name as appName} from './app.json';

const AppWithMenuProvider = () => (
  <MenuProvider>
    <App />
  </MenuProvider>
);

AppRegistry.registerComponent(appName, () => AppWithMenuProvider);
