import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';
/* 引入导航器 */
import { createAppContainer } from 'react-navigation';
/* 最新版本 createMaterialTopTabNavigator 从  react-navigation 库分离出来了 */
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// == redux 相关
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavigationActions } from "react-navigation";
import { languageAction } from '../../actions';
import { FLAG_LANGUAGE } from '../../service/Language/index';

// == 最热模块
import HotPage from './page';
import NavigationBar from '../../common/NavigationBar';
import NavigationUtil from '../../routers/utils';
import { THEME_COLOR } from '../../util/Global';

// == 首页-最热模块-顶部导航
class Index extends React.Component {
    constructor(props) {
        super(props);
        // == 加载标签
        const { onLoadData } = this.props.languageAction;
        onLoadData(FLAG_LANGUAGE.flag_hot);
    }
    
    // == 根据需要获取动态顶部 tab 切换导航
    _setDynamicTabs () {
        const tabs = {};
        const { hot, theme } = this.props;
        hot.forEach((item, index) => {
            // == 选中状态才会添加
            if(item.checked) {
                tabs[`tab${index}`] = {
                    // 一般直接写组件，也可以写函数返回一个组件。这样在这里就可以给路由传递参数
                    screen: props => <HotPage {...props} tabBarLabel={item.name}/>,
                    navigationOptions: {
                        tabBarLabel: item.name,
                    }
                };
            }
        });
        const AppMaterialTopTabNavigator = hot.length ? createMaterialTopTabNavigator(
            tabs,
            {
                tabBarOptions: {
                    upperCaseLabel: false,
                    scrollEnabled: true,
                    style: {
                        backgroundColor: theme.themeColor
                    }, // 设置整个TabBar的样式
                    tabStyle: styles.tabStyle, // 设置单个tab的样式
                    labelStyle: styles.labelStyle, // 设置TabBar标签的样式
                    indicatorStyle: styles.indicatorStyle, // 设置 indicator(tab下面的那条线)的样式
                },
                lazy: true
            }
        ) : null;
        const NavigatorContainer = hot.length 
        ? createAppContainer(AppMaterialTopTabNavigator)
        : null;
        return NavigatorContainer;
    }

    // == 渲染顶部导航右侧搜索按钮
    renderRightButton() {
        return <TouchableOpacity
            onPress={() => {
                // AnalyticsUtil.track("SearchButtonClick");
                NavigationUtil.goPage('SearchPage');
            }}
        >
            <View style={{padding: 5, marginRight: 8}}>
                <Ionicons
                    name={'ios-search'}
                    size={24}
                    style={{
                        marginRight: 8,
                        alignSelf: 'center',
                        color: 'white',
                    }}/>
            </View>
        </TouchableOpacity>
    }

    render() {
        const { theme } = this.props;
        // == 自定义导航栏【包含状态栏】
        let navigationBar = (
            <NavigationBar 
                title={'最热'}
                statusBar={{
                    backgroundColor: theme.themeColor,
                    barStyle: 'light-content'
                }}
                style={{backgroundColor: theme.themeColor}}
                rightButton={this.renderRightButton()}
            />
        );
        // == 顶部 tab 切换导航
        const NavigatorContainer = this._setDynamicTabs();

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.themeColor}}>
                {navigationBar}
                {NavigatorContainer && <NavigatorContainer/>}
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
        nav: state.nav,
        hot: state.language.hot,
        theme: state.theme.theme,
    }),
    dispatch => {
        return {
            languageAction: bindActionCreators(languageAction, dispatch),
            navAction: {
              back: () => dispatch(NavigationActions.back()),
              init: () => dispatch(NavigationActions.init()),
              navigate: (payload) => dispatch(NavigationActions.navigate(payload)),
              setParams: (payload) => dispatch(NavigationActions.setParams(payload))
            }
        };
    }
  )(Index);
  