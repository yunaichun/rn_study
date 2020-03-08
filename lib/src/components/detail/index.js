import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { WebView } from 'react-native-webview';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SafeAreaViewPlus from '../../common/SafeAreaViewPlus';

// == 自定义导航组件
import NavigationBar from '../../common/NavigationBar';
import ViewUtil from '../../util/ViewUtil';
import { THEME_COLOR, TRENDING_URL } from '../../util/Global';
import NavigationUtil from '../../routers/utils';
// == 处理 android 物理返回
import BackPress from '../../common/BackPress';
// == 通用工具
import FavoriteUtil from '../../util/FavoriteUtil';

class DetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params
    let { nowModule, item: { full_name, html_url, fullName, isFavorite } } = this.params;
    let title;
    let url;
    if (nowModule === 'hot') {
      title = full_name;
      url = html_url;
    } else {
      title = fullName;
      url = TRENDING_URL + fullName;
    }
    this.state = {
      title,
      url,
      // == 是否可以返回到上一页【保存 webview 导航状态的】
      canGoBack: false,
      isFavorite
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

  // == 导航顶部右边收藏点击事件
  onFavoriteButtonClick() {
    // == 修改状态
    const { navigation } = this.props;
    const { state } = navigation;
    const { params } = state;
    let { nowModule, item, callback } = params;
    // == 此处将传递的 item 也修改了，相当于 eventBus 的功能了
    const isFavorite = item.isFavorite = !item.isFavorite;
    this.setState({ isFavorite });
    // == 更新存储数据
    let key = item.fullName ? item.fullName : item.id.toString();
    FavoriteUtil.onFavorite(nowModule, isFavorite, key, JSON.stringify(item));
  }
    
  // == 自定义导航右边按钮
  renderRightButton() {
    return (
      <View style={styles.rightNavigatior}>
        <TouchableOpacity
          onPress={() => {
            this.onFavoriteButtonClick();
          }}
          style={styles.rightNavigatior}
        >
              <FontAwesome
                name={this.state.isFavorite ? 'star' : 'star-o'}
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
    const { theme } = this.params;
    // == 标题过长的情况防止重合
    const titleLayoutStyle = this.state.title.length > 20 ? {paddingRight: 30} : null;
    // == 自定义导航栏【包含状态栏】
    let navigationBar = (
      <NavigationBar 
          title={this.state.title}
          titleLayoutStyle={titleLayoutStyle}
          statusBar={{
              backgroundColor: theme.themeColor,
              barStyle: 'light-content'
          }}
          leftButton={ViewUtil.getLeftBackButton(() => this.onBack() )}
          rightButton={this.renderRightButton()}
          style={theme.styles.navBar}
      />
    );

    return (
      // <SafeAreaView style={{ flex: 1, backgroundColor: theme.themeColor}}>
      <SafeAreaViewPlus
        topColor={theme.themeColor}
      >
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
      </SafeAreaViewPlus>
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
