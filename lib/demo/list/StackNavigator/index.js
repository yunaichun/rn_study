/* 最新版本 createStackNavigator 从  react-navigation 库分离出来了 */
import { createStackNavigator } from 'react-navigation-stack';

import HomePage from './homePage';
import FlatListDemo from '../FlatList/index';


export const AppStackNavigator = createStackNavigator(
    {
        HomePage: {
            screen: HomePage,
        },
        FlatListDemo: {
            screen: FlatListDemo,
            navigationOptions: {
                title: 'FlatListDemo'
            }
        }
    }
);
