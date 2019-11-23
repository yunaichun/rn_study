/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
/* 通过 App 组件引入的组件【非导航组件的 demo 启用此项查看】
import App from './App';
 */
/* 引入导航器 */
import { createAppContainer } from 'react-navigation';
/* 引入导航路由 */
import { AppStackNavigator } from './lib/demo/navigator/createStackNavigator/index';

const AppContainer = createAppContainer(AppStackNavigator);

AppRegistry.registerComponent(appName, () => AppContainer);
