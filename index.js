/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

/* 引入导航器 */
import { createAppContainer } from 'react-navigation';

/* 一、通过 App 组件引入的组件【非导航组件的 demo 启用此项查看】 
import AppContainer from './App';
AppRegistry.registerComponent(appName, () => AppContainer);
*/

/* 二、引入stack、top、bottom导航路由
import { AppStackNavigator } from './lib/demo/navigator/createStackNavigator/index';
const AppContainer = createAppContainer(AppStackNavigator);

AppRegistry.registerComponent(appName, () => AppContainer);
*/

/* 三、引入switch导航路由 
import { AppSwitchNavigator } from './lib/demo/navigator/createSwitchNavigator/index';
const AppContainer = createAppContainer(AppSwitchNavigator);

AppRegistry.registerComponent(appName, () => AppContainer);
*/

/* 四、高性能列表组件 */
import { AppStackNavigator } from './lib/demo/list/StackNavigator/index';
const AppContainer = createAppContainer(AppStackNavigator);
AppRegistry.registerComponent(appName, () => AppContainer);

