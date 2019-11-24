/* 引入导航器 */
import { createAppContainer } from 'react-navigation';
/* 最新版本 createBottomTabNavigator 从  react-navigation 库分离出来了 */
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
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

/**
 * 首页-底部-4个 tab 导航
 */
const BOTTOM_TABS = {
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
};

/**
 * 底部导航容器
 */
export class AppBottomTabNavigatorContainer extends React.Component {
    constructor(props) {
        super(props);
        // 禁止黄色警告
        console.disableYellowBox = true;
    }
    /**
     * 根据需要获取动态底部导航
     */
    _getDynamicTabs () {
        const { HotPage, TrendingPage, FavoritePage, MemberPage } = BOTTOM_TABS;
        // 动态配置 tab 属性
        // HotPage.navigationOptions.tabBarLabel = '最好';
        const tabs = { HotPage, TrendingPage, FavoritePage, MemberPage };
        const AppBottomTabNavigator = createBottomTabNavigator(
            tabs,
            { tabBarComponent: TabBarComponent }
        );
        const NavigatorContainer = createAppContainer(AppBottomTabNavigator);
        return NavigatorContainer;
    }
    render() {
        const NavigatorContainer = this._getDynamicTabs();
        return <NavigatorContainer/>
    }
}

/* 
tabBarComponent：指定 createBottomTabNavigator 的 TabBar 组件，
如果不指定在 iOS 上默认使用 TabBarBottom ，在Android平台上默认使用 TabBarTop 。
TabBarBottom 与 TabBarTop 都是 react-navigation 所支持的组件，
要自定义 TabBar 可以重写这两个组件也可以根据需要自己实现一个；
 */
class TabBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.theme = {
            tintColor: props.activeTintColor,
            updateTime: new Date().getTime()
        }
    }
    render() {
        // 在某个页面调用 setParams 可以设置此时路由的参数
        const { navigation } = this.props;
        const { state, setParams } = navigation;
        /*取出当前路由的数组，和当前路由的 index
            {
                "index": 1,
                "isTransitioning": false,
                "routes": [
                    {
                        "key": "HotPage",
                        "routeName": "HotPage"
                    },
                    {
                        "key": "TrendingPage",
                        "params": {
                            "theme": {
                                "tintColor": "red",
                                "updateTime": 1574611922112
                            }
                        },
                        "routeName": "TrendingPage"
                    },
                    {
                        "key": "FavoritePage",
                        "routeName": "FavoritePage"
                    },
                    {
                        "key": "MemberPage",
                        "routeName": "MemberPage"
                    }
                ]
            }
        */
        const { routes, index } = state;
        if (routes[index].params) {
            const { theme } = routes[index].params;
            // 以最新的更新时间为准，防止被其他 tab 覆盖
            if (theme && theme.updateTime > this.theme.updateTime) {
                this.theme = theme;
            }
        }
        return (
            <BottomTabBar
                {...this.props}
                activeTintColor={this.theme.tintColor || this.props.activeTintColor}
            />
        );
    }
}
