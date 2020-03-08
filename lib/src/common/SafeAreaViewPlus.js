import React, { Component } from 'react';
import {
    DeviceInfo,
    SafeAreaView,
    StyleSheet,
    View,
    ViewPropTypes
} from 'react-native';
import PropTypes from 'prop-types';

// == 全面屏适配
export default class SafeAreaViewPlus extends Component {

    // static propTypes = {
    //     ...ViewPropTypes,
    //     topColor: PropTypes.string,
    //     bottomColor: PropTypes.string,
    //     enablePlus: PropTypes.bool,
    //     topInset: PropTypes.bool,
    //     bottomInset: PropTypes.bool,
    // };
    
    static defaultProps = {
        enablePlus: true,
        topInset: true,
        bottomInset: false,
        topColor: 'transparent',
        bottomColor: '#f8f8f8',
    };

    // == 生成安全区域
    genSafeAreaViewPlus() {
        const {children, topColor, bottomColor, topInset, bottomInset} = this.props;
        return (
            <View style={[styles.container, this.props.style]}>
                {this.getTopArea(topColor, topInset)}
                {children}
                {this.getBottomArea(bottomColor, bottomInset)}
            </View>
        );
    }

    // == 生成顶部安全区域
    getTopArea(topColor, topInset) {
        return !DeviceInfo.isIPhoneX_deprecated || !topInset ? null
            : <View style={[styles.topArea, {backgroundColor: topColor}]}/>;
    }

    // == 生成底部安全区域
    getBottomArea(bottomColor, bottomInset) {
        return !DeviceInfo.isIPhoneX_deprecated || !bottomInset ? null
            : <View style={[styles.bottomArea, {backgroundColor: bottomColor}]}/>;
    }

    // == react-native 提供的安全区域组件 SafeAreaView
    genSafeAreaView() {
        return (
            <SafeAreaView style={[styles.container, this.props.style]} {...this.props}>
                {this.props.children}
            </SafeAreaView>
        );
    }

    render() {
        const {enablePlus} = this.props;
        return enablePlus ? this.genSafeAreaViewPlus() : this.genSafeAreaView();
    }
}

// == 类型检查
SafeAreaViewPlus.propTypes = {
    ...ViewPropTypes,
    // == 是否启用自定义 SafeAreaView 保护区域
    enablePlus: PropTypes.bool,
    // == 是否显示顶部安全区域
    topInset: PropTypes.bool,
    // == 是否显示底部安全区域
    bottomInset: PropTypes.bool,
    // == 顶部安全区域颜色
    topColor: PropTypes.string,
    // == 底部安全区域颜色
    bottomColor: PropTypes.string,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topArea: {
        height: 44,
    },
    bottomArea: {
        height: 34,
    }
});