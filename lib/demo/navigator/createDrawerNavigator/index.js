/* 最新版本 createDrawerNavigator 从  react-navigation 库分离出来了 */
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
/* 矢量图标 【https://github.com/oblador/react-native-vector-icons】 */
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Page1 from '../pages/page1';
import Page2 from '../pages/page2';
import Page3 from '../pages/page3';

import React from 'react';
import {
    Ionicons,
    Platform,
    ScrollView,
    SafeAreaView
} from 'react-native';

/* createDrawerNavigator(RouteConfigs, DrawerNavigatorConfig):
    1、RouteConfigs(必选)：路由配置对象是从路由名称到路由配置的映射，告诉导航器该路由呈现什么。
    2、DrawerNavigatorConfig(可选)：配置导航器的路由(如：默认首屏，navigationOptions，paths等)样式(如，转场模式mode、头部模式等)。
 */
export const AppDrawerNavigator = createDrawerNavigator(
    /* RouteConfigs 参数配置
        1、screen(必选)：指定一个 React 组件作为屏幕的主要显示内容，当这个组件被DrawerNavigator加载时，它会被分配一个navigation prop。
        2、path(可选)：用来设置支持schema跳转时使用，具体使用会在下文的有关Schema章节中讲到；
        3、navigationOptions(可选)：用以配置全局的屏幕导航选项如：title、headerRight、headerLeft等；
    */
    {
        Page1: {
            screen: Page1,
            navigationOptions: {
                drawerLabel: 'Page1',
                drawerIcon: ({tintColor}) => (
                    <MaterialIcons 
                        name="drafts" 
                        size={24}
                        style={{color: tintColor}}
                    />
                ),
            }
        },
        Page2: {
            screen: Page2,
            navigationOptions: {
                drawerLabel: 'Page2',
                drawerIcon: ({tintColor}) => (
                    <MaterialIcons
                        name="move-to-inbox"
                        size={24}
                        style={{color: tintColor}}
                    />
                ),
            }
        },
        Page3: {
            screen: Page3,
            /* navigationOptions（屏幕导航选项） 参数配置
                1、title: 可以用作headerTitle和drawerLabel的备选的通用标题。
                2、drawerLabel：侧滑标题；
                3、drawerIcon：侧滑的标题图标，这里会回传两个参数：
                    {focused: boolean, tintColor: string}：
                4、focused: 表示是否是选中状态；
                5、tintColor: 表示选中的颜色；
                6、drawerLockMode：指定抽屉的锁定模式。 这也可以通过在顶级路由器上使用screenProps.drawerLockMode 动态更新。
            */
            /* 侧边栏操作(打开、关闭、切换)
                侧边栏支持以下几种操作方式：

                navigation.openDrawer();
                navigation.closeDrawer();
                navigation.toggleDrawer();
                //或
                navigation.dispatch(DrawerActions.openDrawer());
                navigation.dispatch(DrawerActions.closeDrawer());
                navigation.dispatch(DrawerActions.toggleDrawer());
             */
            navigationOptions: {
                drawerLabel: 'Page3',
                drawerIcon: ({tintColor}) => (
                    <MaterialIcons
                        name="codesquareo"
                        size={24}
                        style={{color: tintColor}}
                    />
                ),
            }
        },
    },
    /* DrawerNavigatorConfig 参数配置
        1、drawerWidth: 设置侧边菜单的宽度；
        2、drawerPosition: 设置侧边菜单的位置，支持’left’、 ‘right’，默认是’left’；
        [3]、contentComponent: 自定义侧边栏：用于呈现抽屉导航器内容的组件，例如导航项。接收抽屉导航器的 navigation 属性 。
           默认为 DrawerItems 。
        4、contentOptions: 配置抽屉导航器内容，见下文;
        5、useNativeAnimations: 是否启用Native动画，默认启用；
        6、drawerBackgroundColor: 侧边菜单的背景；

        7、initialRouteName: 初始化哪个界面为根界面，如果不配置，默认使用RouteConfigs中的第一个页面当做根界面；
        8、order: drawer排序，默认使用配置路由的顺序；
        9、paths: 提供routeName到path config的映射，它覆盖routeConfigs中设置的路径。
        10、backBehavior: 后退按钮是否会导致标签切换到初始drawer？ 如果是，则设切换到初始drawer，否则什么也不做。 默认为切换到初始drawer。
    */
   /* DrawerItems 的 contentOptions 参数配置
        contentOptions主要配置侧滑栏item的属性，只对DrawerItems，
        例如我们刚才写的例子，就可以通过这个属性来配置颜色，背景色等。
        其主要属性有：
        1、items: 路由数组，如果要修改路由可以可以修改或覆盖它；
        2、activeItemKey: 定义当前选中的页面的key；
        3、activeTintColor: 选中item状态的文字颜色；
        4、activeBackgroundColor: 选中item的背景色；
        5、inactiveTintColor: 未选中item状态的文字颜色；
        6、inactiveBackgroundColor: 未选中item的背景色；
        7、onItemPress: 选中item的回调，这个参数属性为函数，会将当前路由回调过去；
        8、itemsContainerStyle: 定义itemitem容器的样式；
        9、itemStyle: 定义item的样式；
        10、labelStyle: 定义item文字的样式；
        11、iconContainerStyle: 定义item图标容器的样式；
        12、activeLabelStyle：选中状态下文本样式；
        13、inactiveLabelStyle：非选中状态下文本样式；
        14、iconContainerStyle ：用于设置图标容器的样式。
     */
    {
        // 初始化哪个界面为根界面，如果不配置，默认使用RouteConfigs中的第一个页面当做根界面；
        initialRouteName: 'Page1',
        // 配置抽屉导航器内容;
        contentOptions: {
            // 选中item状态的文字颜色；
            activeTintColor: '#e91e63',
        },
        // 自定义侧边栏：用于呈现抽屉导航器内容的组件，例如导航项。接收抽屉导航器的 navigation 属性 。默认为DrawerItems。
        contentComponent:(props) => (
            <ScrollView style={{backgroundColor: '#789', flex: 1}} >
                <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                    <DrawerItems {...props} />
                </SafeAreaView>
            </ScrollView>
        )
    }
);

