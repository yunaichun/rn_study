/* 最新版本 createBottomTabNavigator 从  react-navigation 库分离出来了 */
import { createBottomTabNavigator } from 'react-navigation-tabs';
/* 矢量图标 【https://github.com/oblador/react-native-vector-icons】 */
import Ionicons from 'react-native-vector-icons/Ionicons';

import Page1 from '../pages/page1';
import Page2 from '../pages/page2';
import Page3 from '../pages/page3';

import React from 'react';
import {
    Platform,
} from 'react-native';


/* createBottomTabNavigator(RouteConfigs, BottomTabNavigatorConfig):
    1、RouteConfigs(必选)：路由配置对象是从路由名称到路由配置的映射，告诉导航器该路由呈现什么。
    2、BottomTabNavigatorConfig(可选)：配置导航器的路由(如：默认首屏，navigationOptions，paths等)样式(如，转场模式mode、头部模式等)。
 */
export const AppBottomTabNavigator = createBottomTabNavigator(
    /* RouteConfigs 参数配置
        1、screen(必选)：指定一个 React 组件作为屏幕的主要显示内容，当这个组件被TabNavigator加载时，它会被分配一个navigation prop。
        2、path(可选)：用来设置支持schema跳转时使用，具体使用会在下文的有关Schema章节中讲到；
        3、navigationOptions(可选)：用以配置全局的屏幕导航选项如：title、headerRight、headerLeft等；
     */
    {
        Page1: {
            screen: Page1,
            navigationOptions: {
                tabBarLabel: '最热',
                tabBarIcon: ({tintColor, horizontal, focused}) => (
                    <Ionicons
                        name={'ios-home'}
                        size={26}
                        style={{color: tintColor}}
                    />
                ),
            }
        },
        Page2: {
            screen: Page2,
            navigationOptions: {
                tabBarLabel: '趋势',
                tabBarIcon: ({tintColor, horizontal, focused}) => (
                    <Ionicons
                        name='ios-people'
                        size={26}
                        style={{color: tintColor}}
                    />
                ),
            }
        },
        Page3: {
            screen: Page3,
            /* navigationOptions（屏幕导航选项）参数配置
                1、title: 可以用作headerTitle和tabBarLabel的备选的通用标题。
                2、tabBarVisible: 显示或隐藏TabBar，默认显示；
                3、tabBarIcon: 设置TabBar的图标；
                4、tabBarLabel: 设置TabBar的标签；
                5、tabBarOnPress: Tab被点击的回调函数，它的参数是一保函一下变量的对象：
                6、navigation: navigation prop ；
                7、defaultHandler: tab按下的默认处理程序；
                8、tabBarButtonComponent：React组件，它包装图标和标签并实现onPress。 默认情况下是TouchableWithoutFeedback的一个封装，使其其表现与其它可点击组件相同，tabBarButtonComponent: TouchableOpacity 将使用 TouchableOpacity 来替代；
                9、tabBarAccessibilityLabel：选项卡按钮的辅助功能标签。 当用户点击标签时，屏幕阅读器会读取这些信息。 如果您没有选项卡的标签，建议设置此项；
                10、tabBarTestID：用于在测试中找到该选项卡按钮的 ID； 
            */
            navigationOptions: {
                tabBarLabel: '收藏',
                tabBarIcon: ({tintColor, horizontal, focused}) => (
                    <Ionicons
                        name='ios-chatboxes'
                        size={26}
                        style={{color: tintColor}}
                    />
                ),
            }
        },
    },
    /* BottomTabNavigatorConfig 参数配置
        1、tabBarComponent：指定createBottomTabNavigator的TabBar组件，如果不指定在iOS上默认使用TabBarBottom，在Android平台上默认使用TabBarTop。
           tabBarBottom与TabBarTop都是react-navigation所支持的组件，要自定义TabBar可以重写这两个组件也可以根据需要自己实现一个；
        2、tabBarOptions: 配置TaBar下文会详细讲解；
        3、initialRouteName : 默认页面组件，createBottomTabNavigator显示的第一个页面；
        4、order: 定义tab顺序的routeNames数组。
        5、paths: 提供routeName到path config的映射，它覆盖routeConfigs中设置的路径。
        6、backBehavior: 后退按钮是否会导致标签切换到初始tab？ 如果是，则设切换到初始tab，否则什么也不做。 默认为切换到初始tab。
        7、tabBarOptions（tab配置）
     */
    /* tabBarOptions （tab配置） 参数配置
        1、activeTintColor: 设置TabBar选中状态下的标签和图标的颜色；
        2、inactiveTintColor: 设置TabBar非选中状态下的标签和图标的颜色；
        3、showIcon: 是否展示图标，默认是false；
        4、showLabel: 是否展示标签，默认是true；
        5、upperCaseLabel - 是否使标签大写，默认为true。
        6、tabStyle: 设置单个tab的样式；
        7、indicatorStyle: 设置 indicator(tab下面的那条线)的样式；
        8、labelStyle: 设置TabBar标签的样式；
        9、iconStyle: 设置图标的样式；
        10、style: 设置整个TabBar的样式；
        11、allowFontScaling: 设置TabBar标签是否支持缩放，默认支持；
        12、safeAreaInset：覆盖的forceInset prop，默认是{ bottom: 'always', top: 'never' }，可选值：top | bottom | left | right ('always' | 'never')；
     */
    {
        tabBarOptions: {
            // 设置TabBar选中状态下的标签和图标的颜色；
            activeTintColor: Platform.OS === 'ios' ? '#e91e63' : '#fff',
        }
    }
);
