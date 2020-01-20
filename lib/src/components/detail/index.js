import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { WebView } from 'react-native-webview';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// == 自定义导航组件
import NavigationBar from '../../common/NavigationBar';
import ViewUtil from '../../util/ViewUtil';
import { THEME_COLOR, TRENDING_URL } from '../../util/Global';
import NavigationUtil from '../../routers/utils';
// == 处理 android 物理返回
import BackPress from '../../common/BackPress';

class DetailPage extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const { state } = navigation;
    const { params } = state;
    const title = params.full_name || params.fullName;
    const url = this.url = params.html_url || TRENDING_URL + params.fullName;
    this.state = {
      title,
      url,
      // == 是否可以返回到上一页【保存 webview 导航状态的】
      canGoBack: false
    };
    // == 处理 android 物理返回
    this.backPress = new BackPress({ backPress: () => this.onBack() });
  }

  componentDidMount() {
    this.backPress.componentDidMount();
  }

  componentWillUnmount() {
    this.backPress.componentWillUnmount();
  }

  // == 此处没有写为剪头函数，上面传递的时候写为箭头函数
  // == 处理 android 物理返回
  onBackPress() {
    this.onBack();
    return true;
  }

  // == 自定义导航左边返回
  onBack() {
    if (this.state.canGoBack) {
      // == webview 返回
      this.webView.goBack();
    } else {
      // == 通过同层路由跳转 this.props.navigation
      NavigationUtil.goBack(this.props.navigation);
    }
    return true;
  }

  // == 导航状态发生变化事件
  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack,
      url: navState.url
    });
  }

    
  // == 自定义导航右边按钮
  renderRightButton() {
    return (
      <View style={styles.rightNavigatior}>
        <TouchableOpacity
          onPress={() => {}}
          style={styles.rightNavigatior}
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

  render() {
    // == 标题过长的情况防止重合
    const titleLayoutStyle = this.state.title.length > 20 ? {paddingRight: 30} : null;
    // == 自定义导航栏【包含状态栏】
    let navigationBar = (
      <NavigationBar 
          title={this.state.title}
          titleLayoutStyle={titleLayoutStyle}
          statusBar={{
              backgroundColor: THEME_COLOR,
              barStyle: 'light-content'
          }}
          leftButton={ViewUtil.getLeftBackButton(() => this.onBack() )}
          rightButton={this.renderRightButton()}
          style={{backgroundColor: THEME_COLOR}}
      />
    );

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.container}>
          {navigationBar}
          <WebView
            ref={webView => this.webView = webView }
            source={{uri: this.state.url}}
            // == 初始显示加载进度条
            startInLoadingState={true}
            // == 导航发生改变的事件
            onNavigationStateChange={ e => this.onNavigationStateChange(e) }
          />
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
