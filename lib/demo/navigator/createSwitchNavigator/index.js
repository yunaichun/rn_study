/* 最新版本 createBottomTabNavigator 从  react-navigation 库分离出来了 */
import { createBottomTabNavigator } from 'react-navigation-tabs';
/* 矢量图标 【https://github.com/oblador/react-native-vector-icons】 */
import Ionicons from 'react-native-vector-icons/Ionicons';

import Page1 from '../pages/page1';
import Page2 from '../pages/page2';
import Page3 from '../pages/page3';

import React from 'react';
import {
    Ionicons,
    Platform,
} from 'react-native';

const AppStack = createStackNavigator({
    Home: {
        screen: HomePage
    },
    Page1: {
        screen: Page1
    }
});
const AuthStack = createStackNavigator({
    Login: {
        screen: Login
    },
},{
    navigationOptions: {
        // header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
    }
});

/* createSwitchNavigator(RouteConfigs, SwitchNavigatorConfig):
    1、RouteConfigs(必选，同createStackNavigator的RouteConfigs)：路由配置对象是从路由名称到路由配置的映射，告诉导航器该路由呈现什么。
    2、SwitchNavigatorConfig (可选)：配置导航器的路由; 
*/
export default createSwitchNavigator(
    {
        Auth: AuthStack,
        App: AppStack,
    },
    /* SwitchNavigatorConfig
        几个被传递到底层路由以修改导航逻辑的选项：
        1、initialRouteName -第一次加载时初始选项卡路由的 routeName。
        2、resetOnBlur - 切换离开屏幕时，重置所有嵌套导航器的状态。 默认为true。
        3、paths - 提供 routeName 到 path 配置的映射, 它重写 routeConfigs 中设置的路径。
        4、backBehavior - 控制 “返回” 按钮是否会导致 Tab 页切换到初始 Tab 页? 如果是, 设置为 initialRoute, 否则 none。 默认为none行为。
    */
    {
        initialRouteName: 'Auth',
    }
);
