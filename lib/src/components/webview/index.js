import React, { Component } from 'react';
import { 
    StyleSheet,
    SafeAreaView,
    View,
} from 'react-native';
import { WebView }from 'react-native-webview';
import SafeAreaViewPlus from '../../common/SafeAreaViewPlus';

import BackPressComponent from '../../common/BackPress';
import NavigationBar from '../../common/NavigationBar'
import ViewUtil from '../../util/ViewUtil';
import NavigationUtil from '../../routers/utils';
import { THEME_COLOR } from '../../util/Global';

export default class WebViewPage extends Component {
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        const { title, url } = this.params;
        this.state = {
            title: title,
            url: url,
            canGoBack: false,
        };
        this.backPress = new BackPressComponent({backPress: () => this.onBackPress()});
    }

    componentDidMount() {
        this.backPress.componentDidMount();
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }

    onBackPress() {
        this.onBack();
        return true;
    }

    onBack() {
        if (this.state.canGoBack) {
            this.webView.goBack();
        } else {
            NavigationUtil.goBack(this.props.navigation);
        }
    }

    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url,
        })
    }

    render() {
        const { theme } = this.params;
        let navigationBar = <NavigationBar
            title={this.state.title}
            style={{backgroundColor: theme.themeColor}}
            leftButton={ViewUtil.getLeftBackButton(() => this.onBackPress())}
        />;

        return (
            // <SafeAreaView style={{flex: 1, backgroundColor: theme.themeColor}}>
            <SafeAreaViewPlus
                topColor={theme.themeColor}
            >
                {navigationBar}
                <WebView
                    ref={webView => this.webView = webView }
                    source={{uri: this.state.url}}
                    // == 初始显示加载进度条
                    startInLoadingState={true}
                    // == 导航发生改变的事件
                    onNavigationStateChange={ e => this.onNavigationStateChange(e) }
                />
            </SafeAreaViewPlus>
        );
    }
}

const styles = StyleSheet.create({
});
