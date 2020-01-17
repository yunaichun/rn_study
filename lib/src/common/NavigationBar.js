import React from 'react';
import { 
    ViewPropTypes,
    StyleSheet,
    Platform,
    StatusBar,
    View,
    Text,
} from 'react-native';
import PropTypes from 'prop-types';

// == 导航栏在 iOS 中的高度
const NAV_BAR_HEIGHT_IOS = 44;
// == 导航栏在 Android 中的高度
const NAV_BAR_HEIGHT_ANDROID = 50;
// == 状态栏的高度
const STATUS_BAR_HEIGHT = 20;

class NavigationBar extends React.Component {
    // == 设置默认属性
    static defaultProps = {
        statusBar: {
            // == 多个页面设置，只有第一个页面设置有效
            barStyle: 'light-content',
            // == 默认不隐藏
            hidden: false
        }
    }

    getButtonElement(data) {
        return (
            <View style={styles.navBarButton}>
                {data ? data : null}
            </View>
        );
    }

    render() {
        // == 顶部状态栏
        let statusBar = !this.props.statusBar.hidden ? (
            <View style={styles.statusBar}>
                <StatusBar {...this.props.statusBar}/>
            </View>
        ) : null;

        // == 中间标题【numberOfLines - 显示 1 行、ellipsizeMode - 省略号样式】
        let titleView = this.props.titleView ? this.props.titleView : (
            <Text ellipsizeMode="head" numberOfLines={1} style={styles.title}>
                {this.props.title}
            </Text>
        );

        // == 导航栏三部分
        let content = this.props.hide ? null : (
            <View style={styles.navBar}>
                {this.getButtonElement(this.props.leftButton)}
                <View style={[styles.navBarTitleContainer, this.props.titleLayoutStyle]}>
                    {titleView}
                </View>
                {this.getButtonElement(this.props.rightButton)}
            </View>
        );
        
        return (
            <View style={[styles.container, this.props.style]}>
                {statusBar}
                {content}
            </View>
        );
    }
}

const StatusBarShape = {
    // == 是否隐藏状态栏
    hidden: PropTypes.bool,
    // == 状态栏文本的颜色
    barStyle: PropTypes.oneOf(['light-content', 'default']),
    // == 状态栏背景颜色
    backgroundColor: PropTypes.string
}

// == 类型检查
NavigationBar.propTypes = {
    // == 是否显示导航
    hide: PropTypes.bool,
    // == 整体样式
    style: ViewPropTypes.style,
    // == 字符串标题
    title: PropTypes.string,
    // == 元素标题
    titleView: PropTypes.element,
    // == 元素标题样式
    titleLayoutStyle: ViewPropTypes.style,
    // == 状态栏
    statusBar: PropTypes.shape(StatusBarShape),
    // == 右边按钮
    rightButton: PropTypes.element,
    // == 左边按钮
    leftButton: PropTypes.element,
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2196f3',
    },
    statusBar: {
        // == 状态栏高度【安卓系统已经保留】【因为使用 SafeAreaView 所以不用设置高度了】
        // height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0
        height: 0
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // == 导航栏高度
        height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID 
    },
    navBarTitleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        // == 绝对布局 - 不受左侧和右侧按钮的影响
        position: 'absolute',
        left: 40,
        right: 40,
        top: 0,
        bottom: 0,
    },
    title: {
        fontSize: 20,
        color: 'white',
    },
    navBarButton: {
        alignItems: 'center',
    }
});

export default NavigationBar;
