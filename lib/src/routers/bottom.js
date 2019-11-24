/* 引入导航器 */
import { createAppContainer } from 'react-navigation';
/* 最新版本 createBottomTabNavigator 从  react-navigation 库分离出来了 */
import { createBottomTabNavigator } from 'react-navigation-tabs';
/* 矢量图标 【https://github.com/oblador/react-native-vector-icons】 */
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import HotPage from '../components/hot/index';
import TrendingPage from '../components/trending/index';
import FavoritePage from '../components/favorite/index';
import MemberPage from '../components/member/index';

import React from 'react';
import {
    Platform,
} from 'react-native';

export const AppBottomTabNavigator = createBottomTabNavigator(
    {
        HotPage: {
            screen: HotPage,
            navigationOptions: {
                tabBarLabel: '最热',
                tabBarIcon: ({tintColor, horizontal, focused}) => (
                    <MaterialIcons
                        name={'whatshot'}
                        size={26}
                        style={{color: tintColor}}
                    />
                ),
            }
        },
        TrendingPage: {
            screen: TrendingPage,
            navigationOptions: {
                tabBarLabel: '趋势',
                tabBarIcon: ({tintColor, horizontal, focused}) => (
                    <Ionicons
                        name='md-trending-up'
                        size={26}
                        style={{color: tintColor}}
                    />
                ),
            }
        },
        FavoritePage: {
            screen: FavoritePage,
            navigationOptions: {
                tabBarLabel: '收藏',
                tabBarIcon: ({tintColor, horizontal, focused}) => (
                    <MaterialIcons
                        name='favorite'
                        size={26}
                        style={{color: tintColor}}
                    />
                ),
            }
        },
        MemberPage: {
            screen: MemberPage,
            navigationOptions: {
                tabBarLabel: '我的',
                tabBarIcon: ({tintColor, horizontal, focused}) => (
                    <Entypo
                        name='user'
                        size={26}
                        style={{color: tintColor}}
                    />
                ),
            }
        },
    },
    {
        tabBarOptions: {
            // 设置TabBar选中状态下的标签和图标的颜色；
            activeTintColor: Platform.OS === 'ios' ? '#e91e63' : '#fff',
        }
    }
);

export const AppBottomTabNavigatorContainer = createAppContainer(AppBottomTabNavigator);
