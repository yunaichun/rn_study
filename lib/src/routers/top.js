/* 引入导航器 */
import { createAppContainer } from 'react-navigation';
/* 最新版本 createMaterialTopTabNavigator 从  react-navigation 库分离出来了 */
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
/* 矢量图标 【https://github.com/oblador/react-native-vector-icons】 */
// import Ionicons from 'react-native-vector-icons/Ionicons';

import HotItem from '../components/hot/item';

import React from 'react';
import {
    Button,
} from 'react-native';

/**
 * 首页-最热模块-顶部导航
 */
export const AppMaterialTopTabNavigator = createMaterialTopTabNavigator(
    {
        HotItem1: {
            screen: HotItem,
            navigationOptions: {
                tabBarLabel: 'HotItem1',
            }
        },
        HotItem2: {
            screen: HotItem,
            navigationOptions: {
                tabBarLabel: 'HotItem2',
            }
        },
    }
)

export const AppMaterialTopTabNavigatorContainer = createAppContainer(AppMaterialTopTabNavigator);
