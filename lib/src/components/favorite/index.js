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

import { connect } from 'react-redux';

// == 最热模块
import FavoritePage from './page';
import NavigationBar from '../../common/NavigationBar';
import { THEME_COLOR } from '../../util/Global';

// == 收藏模块-顶部导航
class Index extends React.Component {
    constructor(props) {
        super(props);
        // this.tabNames = ['C++', 'Node', 'Koa', 'Express', 'Vue', 'React', 'React Native', 'Flutter'];
        this.tabNames = ['最热', '趋势'];
        this.tabMap = {
            '最热': 'hot',
            '趋势': 'trending'
        };
    }
    
    // == 根据需要获取动态顶部 tab 切换导航
    _setDynamicTabs () {
        const { theme } = this.props;
        const tabs = {};
        this.tabNames.forEach((tabName, index) => {
            let tabValue = this.tabMap[tabName]
            tabs[tabName] = {
                // 一般直接写组件，也可以写函数返回一个组件。这样在这里就可以给路由传递参数
                screen: props => <FavoritePage {...props} tabBarLabel={tabName} tabBarValue={tabValue} />,
                navigationOptions: {
                    tabBarLabel: tabName,
                }
            };
        });
        const AppMaterialTopTabNavigator = createMaterialTopTabNavigator(
            tabs,
            {
                tabBarOptions: {
                    upperCaseLabel: false,
                    // scrollEnabled: true, == 只有而咧，平分
                    style: {
                        backgroundColor: theme.themeColor
                    }, // 设置整个TabBar的样式
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
        const { theme } = this.props;
        // == 自定义导航栏【包含状态栏】
        let navigationBar = (
            <NavigationBar 
                title={'收藏'}
                statusBar={{
                    backgroundColor: theme.themeColor,
                    barStyle: 'light-content'
                }}
                style={{backgroundColor: theme.themeColor}}
            />
        );
        // == 顶部 tab 切换导航
        const NavigatorContainer = this._setDynamicTabs();

        return (
            <SafeAreaView style={{flex: 1, backgroundColor: theme.themeColor}}>
                {navigationBar}
                <NavigatorContainer/>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
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

export default connect(
    state => ({
        theme: state.theme.theme,
    }),
  )(Index);