import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
} from 'react-native';
/* 引入导航器 */
import { createAppContainer } from 'react-navigation';
/* 最新版本 createMaterialTopTabNavigator 从  react-navigation 库分离出来了 */
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

// == 最热模块
import HotPage from './page';
import NavigationBar from '../../common/NavigationBar';
import { THEME_COLOR } from '../../util/Global';

// == 首页-最热模块-顶部导航
class Index extends React.Component {
    constructor(props) {
        super(props);
        // this.tabNames = ['C++', 'Node', 'Koa', 'Express', 'Vue', 'React', 'React Native', 'Flutter'];
        this.tabNames = ['C++', 'Node'];
    }
    
    // == 根据需要获取动态顶部 tab 切换导航
    _setDynamicTabs () {
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                // 一般直接写组件，也可以写函数返回一个组件。这样在这里就可以给路由传递参数
                screen: props => <HotPage {...props} tabBarLabel={item}/>,
                navigationOptions: {
                    tabBarLabel: item,
                }
            };
        });
        const AppMaterialTopTabNavigator = createMaterialTopTabNavigator(
            tabs,
            {
                tabBarOptions: {
                    upperCaseLabel: false,
                    scrollEnabled: true,
                    style: styles.container, // 设置整个TabBar的样式
                    tabStyle: styles.tabStyle, // 设置单个tab的样式
                    labelStyle: styles.labelStyle, // 设置TabBar标签的样式
                    indicatorStyle: styles.indicatorStyle, // 设置 indicator(tab下面的那条线)的样式
                }
            }
        );
        const NavigatorContainer = createAppContainer(AppMaterialTopTabNavigator);
        return NavigatorContainer;
    }

    render() {
        // == 自定义导航栏【包含状态栏】
        let navigationBar = (
            <NavigationBar 
                title={'最热'}
                statusBar={{
                    backgroundColor: THEME_COLOR,
                    barStyle: 'light-content'
                }}
                style={{backgroundColor: THEME_COLOR}}
            />
        );
        // == 顶部 tab 切换导航
        const NavigatorContainer = this._setDynamicTabs();

        return (
          <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
              <View style={{flex: 1}}>
                  {navigationBar}
                  <NavigatorContainer/>
              </View>
          </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#678'
    },
    tabStyle: {
        minWidth: 50
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: 'white',
    },
    labelStyle: {
        fontSize: 13,
        marginTop: 6,
        marginBottom: 6
    }
});

export default Index;
