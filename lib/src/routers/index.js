/* 最新版本 createStackNavigator 从  react-navigation 库分离出来了 */
import { createStackNavigator } from 'react-navigation-stack';
/* 最新版本 createMaterialTopTabNavigator、createBottomTabNavigator 从  react-navigation 库分离出来了 */
import { createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation-tabs';
import { createSwitchNavigator } from 'react-navigation';

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
const HomePageStack = createStackNavigator({
    // 首页
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            header: null
        }
    },
    // 详情页
    DetailPage: {
        screen: DetailPage,
        navigationOptions: {
            // header: null
        }
    },
});

// == 入口路由
const AppSwitchNavigator = createSwitchNavigator(
    {
        Welcome: WelcomePageStack,
        HomePage: HomePageStack,
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
const middleware = createReactNavigationReduxMiddleware(
    state => state.nav
);

export {
    AppWithNavigationState,
    navReducer,
    middleware,
};
