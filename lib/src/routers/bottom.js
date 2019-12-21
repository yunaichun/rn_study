import React from 'react';
// == 引入 redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { themeAction } from '../actions';
import { NavigationActions } from "react-navigation";

/* 引入导航器 */
import { createAppContainer } from 'react-navigation';
/* 最新版本 createBottomTabNavigator 从  react-navigation 库分离出来了 */
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
/* 矢量图标 【https://github.com/oblador/react-native-vector-icons】 */
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

// == 引入首页底部导航路由页面
import HotPage from '../components/hot/index';
import TrendingPage from '../components/trending/index';
import FavoritePage from '../components/favorite/index';
import MemberPage from '../components/member/index';

// == 首页-底部-4个 tab 导航
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

// == 底部导航容器
export class AppBottomTabNavigator extends React.Component {
    constructor(props) {
        super(props);
        console.log('redux注入的props', this.props);
        // 禁止黄色警告
        console.disableYellowBox = true;
    }
    
    // == 根据需要动态设置底部导航
    _setDynamicTabs () {
        // == 性能优化: tab 存在不再重复创建
        if (this.tabs) {
            return this.tabs;
        }
        const { HotPage, TrendingPage, FavoritePage, MemberPage } = BOTTOM_TABS;
        // == 动态配置 tab 属性
        // HotPage.navigationOptions.tabBarLabel = '最好';
        const tabs = { HotPage, TrendingPage, FavoritePage, MemberPage };
        const Navigator = createBottomTabNavigator(
            tabs,
            { tabBarComponent: (props) => {
                return <TabBarComponent theme={this.props.theme} {...props} />
            } }
        );
        const NavigatorContainer = createAppContainer(Navigator);
        return this.tabs = NavigatorContainer;
    }

    render() {
        const NavigatorContainer = this._setDynamicTabs();
        return <NavigatorContainer/>
    }
}

// == tabBarComponent：指定 createBottomTabNavigator 的 TabBar 组件
// == 如果不指定在 iOS 上默认使用 TabBarBottom ，在Android平台上默认使用 TabBarTop 。
// == TabBarBottom 与 TabBarTop 都是 react-navigation 所支持的组件，
// == 要自定义 TabBar 可以重写这两个组件也可以根据需要自己实现一个；
class TabBarComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <BottomTabBar
                {...this.props}
                activeTintColor={this.props.theme}
            />
        );
    }
}

export const AppBottomTabNavigatorContainer = connect(
    state => ({
        nav: state.nav,
        theme: state.theme.theme,
    }),
    dispatch => {
        return {
            themeActions: bindActionCreators(themeAction, dispatch),
            navAction: {
                back: () => dispatch(NavigationActions.back()),
                init: () => dispatch(NavigationActions.init()),
                navigate: (payload) => dispatch(NavigationActions.navigate(payload)),
                setParams: (payload) => dispatch(NavigationActions.setParams(payload))
            }
        };
    }
)(AppBottomTabNavigator);

// == 以下二点注意事项: 
// == 一、
// == 当前路由的数组 routes 和当前路由的 index, 可通过以下方法获取
// == const { navigation } = this.props;
// == const { state, setParams } = navigation;
// == const { routes, index } = state;
// == const { theme } = routes[index].params;
// ==== 但是使用 redux 之后，this.props.nav 接管了 this.props.navigation.state ====
// {
//   "index": 1,
//   "isTransitioning": false,
//   "routes": [
//     {
//       "key": "HotPage",
//       "routeName": "HotPage"
//     },
//     {
//       "key": "TrendingPage",
//       "params": {
//         "theme": {
//           "tintColor": "red",
//           "updateTime": 1574611922112
//         }
//       },
//       "routeName": "TrendingPage"
//     },
//     {
//       "key": "FavoritePage",
//       "routeName": "FavoritePage"
//     },
//     {
//       "key": "MemberPage",
//       "routeName": "MemberPage"
//     }
//   ]
// }
// == 二、
// == navigation 路由参数数据设置
// navigation.setParams({
//   theme: {
//     tintColor: 'red',
//     updateTime: new Date().getTime()
//   }
// });
// ==== 但是使用 redux 之后，this.props.navAction.setParams 接管了 this.props.navigation.setParams ====
// navAction.setParams({
//   theme: {
//     tintColor: 'red',
//     updateTime: new Date().getTime()
//   }
// });
