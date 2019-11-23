/* 最新版本 createMaterialTopTabNavigator 从  react-navigation 库分离出来了 */
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
/* 矢量图标 【https://github.com/oblador/react-native-vector-icons】 */
// import Ionicons from 'react-native-vector-icons/Ionicons';

import Page1 from '../pages/page1';
import Page2 from '../pages/page2';
import Page3 from '../pages/page3';

import React from 'react';
import {
    Button,
} from 'react-native';

/* createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig):
    1、RouteConfigs(必选)：路由配置对象是从路由名称到路由配置的映射，告诉导航器该路由呈现什么。
    2、StackNavigatorConfig(可选)：配置导航器的路由(如：默认首屏，navigationOptions，paths等)样式(如，转场模式mode、头部模式等)。
*/
export const AppMaterialTopTabNavigator = createMaterialTopTabNavigator(
    /*  RouteConfigs 参数配置
        1、screen(必选)：指定一个 React 组件作为屏幕的主要显示内容，当这个组件被TabNavigator加载时，它会被分配一个navigation prop。
        2、path(可选)：用来设置支持schema跳转时使用，具体使用会在下文的有关Schema章节中讲到；
        3、navigationOptions(可选)：用以配置全局的屏幕导航选项如：title、headerRight、headerLeft等；
    */
    {
        Page1: {
            screen: Page1,
            navigationOptions: {
                tabBarLabel: 'App',
            }
        },
        Page2: {
            screen: Page2,
            navigationOptions: {
                tabBarLabel: 'iOS',
            }
        },
        Page3: {
            screen: Page3,
            /* navigationOptions（屏幕导航选项）参数配置
                1、title: 可以用作headerTitle和tabBarLabel的备选的通用标题。
                2、swipeEnabled：是否允许tab之间的滑动切换，默认允许；
                3、tabBarIcon: 设置TabBar的图标；
                4、tabBarLabel: 设置TabBar的标签；
                5、tabBarOnPress: Tab被点击的回调函数，它的参数是一保函一下变量的对象：
                6、navigation：页面的 navigation props
                7、defaultHandler: tab press 的默认 handler
                8、tabBarAccessibilityLabel：选项卡按钮的辅助功能标签。 当用户点击标签时，屏幕阅读器会读取这些信息。 如果您没有选项卡的标签，建议设置此项；
                9、tabBarTestID：用于在测试中找到该选项卡按钮的 ID； 
            */
            navigationOptions: {
                tabBarLabel: 'Android',
            }
        }
    },
    /* TabNavigatorConfig 参数配置
        1、tabBarComponent：指定TabNavigator的TabBar组件；
        3、tabBarPosition: 用于指定TabBar的显示位置，支持’top’ 与 ‘bottom’两种方式；
        3、swipeEnabled : 是否可以左右滑动切换tab；
        4、lazy - 默认值是 false。如果是true，Tab 页只会在被选中或滑动到该页时被渲染。当为 false 时，所有的 Tab 页都将直接被渲染；（可以轻松实现多Tab 页面的懒加载）；
        5、optimizationsEnabled -是否将 Tab 页嵌套在到 中。如果是，一旦该 Tab 页失去焦点，将被移出当前页面, 从而提高内存使用率。
        6、animationEnabled : 切换页面时是否有动画效果。
        7、initialLayout : 包含初始高度和宽度的可选对象可以被传递以防止react-native-tab-view呈现中的一个帧延迟；
        [8]、tabBarOptions: 配置TaBar下文会详细讲解；
        9、initialRouteName : 默认页面组件，TabNavigator显示的第一个页面；
        10、order: 定义tab顺序的routeNames数组。
        11、paths: 提供routeName到path config的映射，它覆盖routeConfigs中设置的路径。
        12、backBehavior: 后退按钮是否会导致标签切换到初始tab？ 如果是，则设切换到初始tab，否则什么也不做。 默认为切换到初始tab。
    */
    /* tabBarOptions （tab配置） 参数配置
       1、activeTintColor: 设置TabBar选中状态下的标签和图标的颜色；
       2、inactiveTintColor: 设置TabBar非选中状态下的标签和图标的颜色；
       3、showIcon: 是否展示图标，默认是false；
       4、showLabel: 是否展示标签，默认是true；
       5、upperCaseLabel - 是否使标签大写，默认为true。
       5、tabStyle: 设置单个tab的样式；
       7、indicatorStyle: 设置 indicator(tab下面的那条线)的样式；
       8、labelStyle: 设置TabBar标签的样式；
       9、iconStyle: 设置图标的样式；
       10、style: 设置整个TabBar的样式；
       11、allowFontScaling: 设置TabBar标签是否支持缩放，默认支持；
       12、pressColor -Color for material ripple（仅支持 Android >= 5.0；
       13、pressOpacity -按下标签时的不透明度（支持 iOS 和 Android < 5.0）；
       14、scrollEnabled -是否支持 选项卡滚动
    */
    {
        // 默认页面组件，TabNavigator显示的第一个页面；
        tabBarOptions: {
            // 设置单个tab的样式
            tabStyle: {
                minWidth: 50
            },
            // 是否使标签大写，默认为true
            upperCaseLabel: false,
            // 是否支持 选项卡滚动，默认false
            scrollEnabled: true,
            // 设置TabBar选中状态下的标签和图标的颜色；
            // activeTintColor: 'white',
            // 设置TabBar非选中状态下的标签和图标的颜色；
            // inactiveTintColor: 'gray',
            // 设置整个TabBar的样式；
            style: {
                backgroundColor: '#678',
            },
            // 设置 indicator(tab下面的那条线)的样式；
            indicatorStyle: {
                height: 2,
                backgroundColor: 'white',
            },
            // 设置TabBar标签的样式；
            labelStyle: {
                fontSize: 13,
                marginTop: 6,
                marginBottom: 6,
            },//文字的样式
        },
    }
)
