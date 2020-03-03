import React from 'react';
import {
    DeviceInfo,
    View,
    Text,
    Image,
    StyleSheet,
    Platform,
} from "react-native";
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import BackPress from "../../../common/BackPress";
import NavigationUtil from "../../../routers/utils";
import ViewUtil from "../../../util/ViewUtil";
import { 
    THEME_COLOR,
    BACKGROUND_COLOR,
    WINDOW_WIDTH,
    NAV_BAR_HEIGHT_IOS,
    NAV_BAR_HEIGHT_ANDROID,
} from '../../../util/Global';

// == 头像大小
const AVATAR_SIZE = 90;
// == PARALLAX展开的高度
const PARALLAX_HEADER_HEIGHT = 270;
// == 固定在顶部的高度
const TOP = (Platform.OS === 'ios') ? 20 + (DeviceInfo.isIPhoneX_deprecated ? 24 : 0) : 0;
const STICKY_HEADER_HEIGHT = (Platform.OS === 'ios') ? NAV_BAR_HEIGHT_IOS + TOP : NAV_BAR_HEIGHT_ANDROID;

export const FLAG_ABOUT = { flag_about: 'about', flag_about_me: 'about_me' };

export default class AboutCommon {
    constructor(props, updateState) {
        this.props = props;
        this.updateState = updateState;
        this.backPress = new BackPress({ backPress: () => this.onBackPress() });
    }

    // == 用户自定义返回事件
    onBackPress() {
        NavigationUtil.goBack(this.props.navigation);
        return true;
    }

    // == 组装者模式
    componentDidMount() {
        this.backPress.componentDidMount();
        fetch('http://www.devio.org/io/GitHubPopular/json/github_app_config.json')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network Error');
            })
            .then(config => {
                if (config) {
                    // == 父级更新状态方法
                    this.updateState({
                        data: config
                    })
                }
            })
            .catch(e => {
                console(e);
            })
    }

    // == 组装者模式
    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }

    // == 分享
    onShare() {
    }

    // == 插件配置方法输出【https://github.com/i6mi6/react-native-parallax-scroll-view】
    getParallaxRenderConfig(params) {
        let config = {};
        let avatar = typeof(params.avatar) === 'string' ? {uri: params.avatar} : params.avatar;
        
        // == 渲染整体背景【demo：https://github.com/i6mi6/react-native-parallax-scroll-view/blob/master/examples/ListView/Talks.js】
        config.renderBackground = () => (
            <View key="background">
                <Image source={{
                    uri: params.backgroundImg,
                    width: WINDOW_WIDTH,
                    height: PARALLAX_HEADER_HEIGHT
                }}/>
                <View style={{
                    position: 'absolute',
                    top: 0,
                    width: WINDOW_WIDTH,
                    backgroundColor: 'rgba(0,0,0,.4)',
                    height: PARALLAX_HEADER_HEIGHT
                }}/>
            </View>
        );
        // == 渲染前景【即背景上面的文字】
        config.renderForeground = () => (
            <View key="parallax-header" style={styles.parallaxHeader}>
                <Image style={styles.avatar}
                       source={avatar} />
                <Text style={styles.sectionSpeakerText}>
                    {params.name}
                </Text>
                <Text style={styles.sectionTitleText}>
                    {params.description}
                </Text>
            </View>
        );
        // == 悬停的view【不滚动时候顶部中间的标题】
        config.renderStickyHeader = () => (
            <View key="sticky-header" style={styles.stickySection}>
                <Text style={styles.stickySectionText}>{params.name}</Text>
            </View>
        );
        // == 固定时【不滚动时候顶部两边的按钮】
        config.renderFixedHeader = () => (
            <View key="fixed-header" style={styles.fixedSection}>
                {ViewUtil.getLeftBackButton(() => NavigationUtil.goBack(this.props.navigation))}
                {ViewUtil.getShareButton(() => this.onShare())}
            </View>
        );

        return config;
    }

    // == 组装者模式
    render(contentView, params) {
        const renderConfig = this.getParallaxRenderConfig(params);
        return (
            <ParallaxScrollView
                backgroundColor={THEME_COLOR}
                contentBackgroundColor={BACKGROUND_COLOR}
                // == PARALLAX展开的高度
                parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                // == 固定在顶部的高度
                stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                // == 移动速度
                backgroundScrollSpeed={10}
                {...renderConfig}
            >
                {contentView}
            </ParallaxScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: WINDOW_WIDTH,
        height: PARALLAX_HEADER_HEIGHT
    },
    stickySection: {
        height: STICKY_HEADER_HEIGHT,
        alignItems: 'center',
        paddingTop: TOP
    },
    stickySectionText: {
        color: 'white',
        fontSize: 20,
        margin: 10
    },
    fixedSection: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        paddingRight: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: TOP
    },
    fixedSectionText: {
        color: '#999',
        fontSize: 20
    },
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop: 100
    },
    avatar: {
        marginBottom: 10,
        borderRadius: AVATAR_SIZE / 2
    },
    sectionSpeakerText: {
        color: 'white',
        fontSize: 24,
        paddingVertical: 5,
        marginBottom: 10
    },
    sectionTitleText: {
        color: 'white',
        fontSize: 16,
        marginRight: 10,
        marginLeft: 10
    },
});
