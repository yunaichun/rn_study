/* 最新版本 createStackNavigator 从  react-navigation 库分离出来了 */
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator } from 'react-navigation';

import Login from '../pages/page2';
import HomePage from '../pages/home';

const LoginStack = createStackNavigator({
    Login: {
        screen: Login
    },
});
const HomeStack = createStackNavigator({
    Home: {
        screen: HomePage
    }
});

/* createSwitchNavigator(RouteConfigs, SwitchNavigatorConfig):
    1、RouteConfigs(必选，同createStackNavigator的RouteConfigs)：路由配置对象是从路由名称到路由配置的映射，告诉导航器该路由呈现什么。
    2、SwitchNavigatorConfig (可选)：配置导航器的路由; 
*/
export const AppSwitchNavigator = createSwitchNavigator(
    {
        Login: LoginStack,
        HomePage: HomeStack,
    },
    /* SwitchNavigatorConfig
        几个被传递到底层路由以修改导航逻辑的选项：
        1、initialRouteName -第一次加载时初始选项卡路由的 routeName。
        2、resetOnBlur - 切换离开屏幕时，重置所有嵌套导航器的状态。 默认为true。
        3、paths - 提供 routeName 到 path 配置的映射, 它重写 routeConfigs 中设置的路径。
        4、backBehavior - 控制 “返回” 按钮是否会导致 Tab 页切换到初始 Tab 页? 如果是, 设置为 initialRoute, 否则 none。 默认为none行为。
    */
    {
        initialRouteName: 'Login',
    }
);


/* 
应用场景：登录页面 -> 首页
效果：不能通过右滑返回
使用：需要在 rn_study/index.js引入当前页面
*/
