import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { WebView } from 'react-native-webview';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// == 自定义导航组件
import NavigationBar from '../../common/NavigationBar';
import ViewUtil from '../../util/ViewUtil';
import { THEME_COLOR, TRENDING_URL } from '../../util/Global';
import NavigationUtil from '../../routers/utils';

class DetailPage extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const { state } = navigation;
    const { params } = state;
    console.log(111111111, params);
    const title = params.full_name || params.fullName;
    const url = this.url = params.html_url || TRENDING_URL + params.fullName;
    this.state = {
      title,
      url,
      // == 是否可以返回到上一页【保存 webview 导航状态的】
      canGoBack: false
    };
  }

  // == 自定义导航左边返回
  onBack() {
    if (this.state.canGoBack) {
      // == webview 返回
      this.webView.goBack();
    } else {
      // == 当前在 DetailPage 路由中，要跳转到上级路由 HomePage【最热 或 趋势】
      NavigationUtil.goBack();
    }
  }

  // == 自定义导航右边按钮
  renderRightButton() {
    return (
      <View style={styles.rightNavigatior}>
        <TouchableOpacity
          onPress={() => {}}
        >
              <FontAwesome
                name={'star-o'}
                size={20}
                style={styles.star}
              />
              {
                ViewUtil.getShareButton(() => {})
              }
        </TouchableOpacity>
      </View>
    );
  }

  // == 导航状态发生变化事件
  onNavigationStateChange(navState) {
    console.log(222222, navState);
    this.setState({
      canGoBack: navState.canGoBack,
      url: navState.url
    });
  }

  render() {
    // == 自定义导航栏【包含状态栏】
    let navigationBar = (
      <NavigationBar 
          title={this.state.title}
          statusBar={{
              backgroundColor: THEME_COLOR,
              barStyle: 'light-content'
          }}
          leftButton={ViewUtil.getLeftBackButton(() => this.onBack() )}
          rightButton={this.renderRightButton()}
          style={{backgroundColor: THEME_COLOR}}
          source={{uri: this.state.url}}
      />
    );

    return (
      <View style={styles.container}>
        {navigationBar}
        <WebView
          ref={webView => this.webView = webView }
          // == 初始显示加载进度条
          startInLoadingState={true}
          // == 导航发生改变的事件
          onNavigationStateChange={ e => this.onNavigationStateChange(e) }
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    rightNavigatior: {
      flexDirection: 'row',
    },
    star: {
      color: 'white',
      marginRight: 10,
    }
});

export default DetailPage;
