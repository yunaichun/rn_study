/* 最新版本 createStackNavigator 从  react-navigation 库分离出来了 */
import { createStackNavigator } from 'react-navigation-stack';

import HomePage from '../pages/home';
import Page1 from '../pages/page1';
import Page2 from '../pages/page2';
import Page3 from '../pages/page3';
import { AppMaterialTopTabNavigator } from '../createMaterialTopTabNavigator/index';
import { AppBottomTabNavigator } from '../createBottomTabNavigator/index';
import { AppDrawerNavigator } from '../createDrawerNavigator/index';
import { AppSwitchNavigator } from '../createSwitchNavigator/index';

import React from 'react';
import {
    Button,
} from 'react-native';

/* createStackNavigator(RouteConfigs, StackNavigatorConfig):
    1、RouteConfigs(必选)：路由配置对象是从路由名称到路由配置的映射，告诉导航器该路由呈现什么。
    2、StackNavigatorConfig(可选)：配置导航器的路由(如：默认首屏，navigationOptions，paths等)样式(如，转场模式mode、头部模式等)。
*/
export const AppStackNavigator = createStackNavigator(
    /* RouteConfigs 参数配置
        1、screen(必选)：指定一个 React 组件作为屏幕的主要显示内容，当这个组件被createStackNavigator加载时，它会被分配一个navigation prop。
        2、path(可选)：用来设置支持schema跳转时使用
        3、navigationOptions(可选)：用以配置全局的屏幕导航选项如：title、headerRight、headerLeft等；
    */
    {
        // 入口页面【也可以通过 initialRouteName 配置】
        HomePage: {
            screen: HomePage,
            /* 此处的 navigationOptions 可以在组件内部设置
                navigationOptions: {
                    // 导航上的标题
                    title: 'Home',
                    // 这里设置返回此页面的返回按钮文案，有长度限制
                    headerBackTitle: '返回哈哈' 
                } 
            */
        },
        Page1: {
            screen: Page1,
            // 动态设置navigationOptions
            navigationOptions: ({ navigation }) => ({
                title: `${navigation.state.params.name}页面名`
            })
        },
        Page2: {
            screen: Page2,
            // 在这里定义每个页面的导航属性，静态配置
            navigationOptions: {
                title: "This is Page2.",
            }
        },
        Page3: {
            screen: Page3,
            // 在这里定义每个页面的导航属性，动态配置
            navigationOptions: (props) => {
                /* navigation 功能 【通过 props 获取】
                一、navigation（屏幕导航属性） 包含以下功能【可以在组件中调用！！！！！】
                    1、navigate：跳转到其他界面；
                    2、state：屏幕的当前state；【 存储在路由中的值 】
                    3、setParams：改变路由的params；
                    4、goBack：关闭当前屏幕；
                    5、dispatch：向路由发送一个action；
                    6、addListener：订阅导航生命周期的更新；
                    7、isFocused：true 标识屏幕获取了焦点；
                    8、getParam：获取具有回退的特定参数；
                    9、dangerouslyGetParent：返回父导航器；
                
                二、使用 navigate 进行界面之间的跳转【可以在组件中调用！！！！！】
                    navigation.navigate({routeName, params, action, key}) 或 navigation.navigate(routeName, params, action)
                    1、routeName：要跳转到的界面的路由名，也就是在导航其中配置的路由名；
                    [2]、params：要传递给下一个界面的参数；!!!!!!!!
                    3、action：如果该界面是一个navigator的话，将运行这个sub-action；
                    4、key：要导航到的路由的可选标识符。 如果已存在，将后退到此路由；
                
                三、StackNavigator 的 navigation 的额外功能【http://www.devio.org/2018/12/15/react-navigation3x/】
                    1、push - 导航到堆栈中的一个新的路由
                    2、pop - 返回堆栈中的上一个页面
                    3、popToTop - 跳转到堆栈中最顶层的页面
                    4、replace - 用新路由替换当前路由
                    5、reset - 擦除导航器状态并将其替换为多个操作的结果
                    6、dismiss - 关闭当前栈

                    import { NavigationActions, StackActions } from 'react-navigation'
                    const resetAction = StackActions.reset({
                       index: 1,
                       actions: [
                           NavigationActions.navigate({ routeName: 'WelcomePage'}),
                           NavigationActions.navigate({ routeName: 'HomePage'})
                        ]
                    });
                    this.props.navigation.dispatch(resetAction);  
                */
                const { navigation } = props;
                const { state, setParams } = navigation;
                const { params } = state;
                return {
                    /* 导航上的标题 */
                    title: params.title ? params.title : '静态配置-从home过来的',
                    /* 设置右边为按钮 */
                    headerRight: (
                        <Button
                            title={ params.mode === 'edit' ? '保存' : '编辑' }
                            onPress={() =>
                                setParams({ mode: params.mode === 'edit' ? '' : 'edit' })}
                        />
                    ),
                }
            }
        },
        Top: {
            screen: AppMaterialTopTabNavigator,
            // 在这里定义每个页面的导航属性，静态配置
            navigationOptions: {
                title: "MaterialTopTabNavigator",
            } 
        },
        Bottom: {
            screen: AppBottomTabNavigator,
            // 在这里定义每个页面的导航属性，静态配置
            navigationOptions: {
                title: "AppBottomTabNavigator",
            }  
        },
        Drawer: {
            screen: AppDrawerNavigator,
            // 在这里定义每个页面的导航属性，静态配置
            navigationOptions: {
                title: "AppDrawerNavigator",
            }  
        },
        Switch: {
            screen: AppSwitchNavigator
        }
    },
    /* StackNavigatorConfig 参数配置
        一、用于路由配置的参数：
        1、initialRouteKey - 初始路由的可选标识符。
        2、initialRouteName: 设置默认的页面组件，必须是上面已注册的页面组件。
        3、initialRouteParams: 初始路由的参数。
        [4]、navigationOptions: 导航器本身的导航选项，用于配置父导航器
        [5]、defaultNavigationOptions: 用于屏幕的默认导航选项
        6、disableKeyboardHandling: 如果为true，则导航到新屏幕时键盘不会自动关闭。默认为false。在Web平台中，这将被忽略。
        7、paths: 用来设置支持schema跳转时使用，具体使用会在下文的有关Schema章节中讲到。
        二、用于导航样式配置的参数：
        1、mode: 页面切换模式: 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
        2、card: 普通app常用的左右切换。
        3、modal: 上下切换。
        4、headerMode: 导航栏的显示模式: screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏。
        5、float: 无透明效果, 默认。
        6、screen: 有渐变透明效果, 如微信QQ的一样。
        7、none: 隐藏导航栏。
        8、headerBackTitleVisible : 提供合理的默认值以确定后退按钮标题是否可见，但如果要覆盖它，则可以使用true或` false 在此选项中。
        9、fade-in-place: 标题组件交叉淡入淡出而不移动，类似于iOS的Twitter，Instagram和Facebook应用程序。 这是默认值。
        10、uikit: iOS的默认行为的近似值。 headerTransitionPreset: 指定在启用headerMode：float时header应如何从一个屏幕转换到另一个屏幕。
        11、cardStyle: 样式（iOS上页面切换会有白色渐变蒙层，想去掉则可以这样设置，cardStyle: { opacity: null },切换页面时的页面边框也在这里可以设置）。
        12、onTransitionStart: 页面切换开始时的回调函数 (我们可以在这里注册一些通知，告知我们切面切换的状态，方便后面处理页面切换事件)。
        13、onTransitionEnd: 页面切换结束时的回调函数。
    */
   /* navigationOptions（屏幕导航选项） 参数配置
        1、title: 可以作为headerTitle的备选字段(当没设置headerTitle时会用该字段作为标题)，也可以作为TabNavigator的tabBarLabel以及DrawerNavigator的drawerLabel。
        2、header: 自定义导航条，可以通过设置null来隐藏导航条；
        3、headerTitle: 标题；
        4、headerTitleAllowFontScaling: 标题是否允许缩放，默认true；
        5、headerBackTitle: 定义在iOS上当前页面进入到下一页面的回退标题，可以通过设置null来禁用它；
        6、headerTruncatedBackTitle: 当回退标题不能显示的时候显示此属性的标题，比如回退标题太长了；
        7、headerBackImage：React 元素或组件在标题的后退按钮中显示自定义图片。 当组件被调用时，它会在渲染时收到许多 props 如：（tintColor，title）。 默认为带有 react-navigation/views/assets/back-icon.png 这张图片的组件，后者是平台的默认后图标图像（iOS上为向左的符号，Android上为箭头）。
        8、headerRight: 定义导航栏右边视图；
        9、headerLeft: 定义导航栏左边视图；
        10、headerStyle: 定义导航栏的样式，比如背景色等；
        11、headerTitleStyle: 定义标题的样式；
        12、headerLeftContainerStyle：自定义 headerLeft 组件容器的样式，例如，增加 padding。
        13、headerRightContainerStyle：自定义 headerRight 组件容器的样式,，例如，增加 padding。
        14、headerTitleContainerStyle：自定义 headerTitle 组件容器的样式, 例如，增加 padding。
        15、headerBackTitleStyle: 定义返回标题的样式；
        16、headerPressColorAndroid：颜色为材料波纹 (Android >= 5.0)；
        17、headerTintColor: 定义导航条的tintColor，会覆盖headerTitleStyle中的颜色；
        18、headerTransparent：默认为 false。如果 true, 则标头将不会有背景, 除非您显式提供 headerStyle 或 headerBackground。
        19、headerBackground：与headerTransparent一起使用，以提供在标题后台呈现的组件。 例如，您可以使用模糊视图来创建半透明标题。
        20、gesturesEnabled: 定义是否能侧滑返回，iOS默认true，Android默认false；
        21、gestureResponseDistance: 定义滑动返回的有效距离，水平状态下默认：25，垂直状态默认135；
        22、gestureDirection: 设置关闭手势的方向。默认从左向右，可以设置从右到左的滑动操作。
    */
    {
        // 用于屏幕的默认导航选项
        defaultNavigationOptions: {
            // 自定义导航条，可以通过设置null来隐藏导航条；
            // header: null, 
        }
    }
);
