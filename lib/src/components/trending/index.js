import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
} from 'react-native';
/* 引入导航器 */
import { createAppContainer } from 'react-navigation';
/* 最新版本 createMaterialTopTabNavigator 从  react-navigation 库分离出来了 */
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// == 自定义导航组件
import NavigationBar from '../../common/NavigationBar';
// == 最热模块
import TrendingPage from './page';
// == 弹窗
import TrendingDialog from '../../common/TrendingDialog';

import { TimeSpans } from '../../util/TimeSpan';
const THEME_COLOR = '#678';

// == 首页-趋势模块-顶部导航
class Index extends React.Component {
    constructor(props) {
        super(props);
        // this.tabNames = ['C++', 'Node', 'Koa', 'Express', 'Vue', 'React', 'React Native', 'Flutter'];
        this.tabNames = ['C++'];
        this.state = {
            timeSpan: TimeSpans[0]
        }
    }
    
    // == 根据需要获取动态顶部 tab 切换导航
    _setDynamicTabs () {
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                // 一般直接写组件，也可以写函数返回一个组件。这样在这里就可以给路由传递参数
                screen: props => <TrendingPage {...props} tabBarLabel={item} timeSpan={this.state.timeSpan}/>,
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

    // == 导航标题
    renderTitleView() {
        return (
            <View>
                <TouchableOpacity
                    underlayColor='transparent'
                    onPress={() => this.dialog.show() }
                >
                        <View style={styles.titleView}>
                            <Text style={styles.title}>
                                趋势 {this.state.timeSpan.showText}
                            </Text>
                            <MaterialIcons
                                name={'arrow-drop-down'}
                                size={22}
                                style={styles.arrow}
                            />
                        </View>
                </TouchableOpacity>
            </View>
        );
    }

    // ==  自定义弹窗
    renderTrendingDialog() {
        return (
            <TrendingDialog
                ref={dialog => this.dialog = dialog}
                onSelect={ tab => this.onSelect(tab) }
            />
        );
    }

    // == 点击弹窗中的某个 item
    onSelect(tab) {
        this.dialog.dismiss();
        this.setState({ timeSpan: tab });
    }

    render() {
        // == 自定义导航栏【包含状态栏】
        let navigationBar = (
            <NavigationBar 
                
                statusBar={{
                    backgroundColor: THEME_COLOR,
                    barStyle: 'light-content'
                }}
                titleView={ this.renderTitleView() }
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
              {this.renderTrendingDialog()}
          </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#678',
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
    },
    titleView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: '400',
    },
    arrow: {
        color: 'white',
    }
});

export default Index;
