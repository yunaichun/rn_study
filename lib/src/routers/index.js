import { createSwitchNavigator } from 'react-navigation';
/* 最新版本 createStackNavigator 从  react-navigation 库分离出来了 */
import { createStackNavigator } from 'react-navigation-stack';

// == 引入 redux
import { connect } from 'react-redux';
import { 
    createReduxContainer,
    createNavigationReducer,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

// == 引入入口路由页面
import WelcomePage from '../components/welcome/index';
import HomePage from '../components/home/index';
import DetailPage from '../components/detail/index';
import WebViewPage from '../components/webview/index';
import AboutPage from '../components/about/AboutPage';

// == 欢迎页导航
const WelcomePageStack = createStackNavigator({
    // 欢迎页
    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: {
            header: null
        }
    },
});

// == 首页导航
const InitinalPageStack = createStackNavigator({
    // == 首页
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            header: null
        }
    },
    // == 详情页
    DetailPage: {
        screen: DetailPage,
        navigationOptions: {
            // == 隐藏顶部自带导航
            header: null
        }
    },
    // == webview 页面
    WebViewPage: {
        screen: WebViewPage,
        navigationOptions: {
            header: null
        }
    },
    // == 关于页面
    AboutPage: {
        screen: AboutPage,
        navigationOptions: {
            header: null
        }
    },
});

// == 入口路由
const AppSwitchNavigator = createSwitchNavigator(
    {
        Welcome: WelcomePageStack,
        InitinalPage: InitinalPageStack,
    },
    {
        initialRouteName: 'Welcome',
        navigationOptions: {
            header: null
        }
    }
);


/* 参考地址：https://github.com/react-navigation/redux-helpers */
// == component
const mapStateToProps = (state) => ({
    state: state.nav,
});
const App = createReduxContainer(AppSwitchNavigator);
const AppWithNavigationState = connect(mapStateToProps)(App);
// == reducer
const navReducer = createNavigationReducer(AppSwitchNavigator);
// == middleware
const navMiddleware = createReactNavigationReduxMiddleware(
    state => state.nav
);

export {
    AppWithNavigationState,
    navReducer,
    navMiddleware,
};
