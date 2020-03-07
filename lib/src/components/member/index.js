import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomTheme from '../theme/index';

// == redux 相关
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavigationActions } from "react-navigation";
import { themeAction } from '../../actions';

import NavigationUtil from '../../routers/utils';
import NavigationBar from '../../common/NavigationBar';
import ViewUtil from '../../util/ViewUtil';
import { THEME_COLOR, LINE_STYLE } from '../../util/Global';
import { MORE_MENU } from '../../common/MoreMenu';
import { FLAG_LANGUAGE } from '../../service/Language/index';

class MemberPage extends React.Component {
  constructor(props) {
    super(props);
  }

  // == 自定义主题弹窗
  renderCustomThemeView() {
    const { customThemeViewVisible, themeActions: { onShowCustomThemeView } } = this.props;
    return (
      <CustomTheme
          visible={customThemeViewVisible}
          {...this.props}
          onClose={() => onShowCustomThemeView(false)}
      />
    );
  }

  // == 每个 item 点击事件
  onItemClick(menu) {
    const { theme } = this.props;
    let RouteName;
    let params = { theme };
    switch (menu) {
      // == 教程
      case MORE_MENU.Tutorial:
        RouteName = 'WebViewPage';
        params.title = '教程';
        params.url = 'https://coding.m.imooc.com/classindex.html?cid=89';
          break;
      // == 关于
      case MORE_MENU.About:
        RouteName = 'AboutPage';
        break;
      // == 关于作者
      case MORE_MENU.About_Author:
        RouteName = 'AboutMePage';
        break;
      // == 趋势模块自定义语言、最热模块自定义标签/移除标签
      case MORE_MENU.Custom_Language:
      case MORE_MENU.Custom_Key:
      case MORE_MENU.Remove_Key:
        RouteName = 'CustomKeyPage';
        params.isRemoveKey = menu === MORE_MENU.Remove_Key;
        params.flag = menu !== MORE_MENU.Custom_Language ? FLAG_LANGUAGE.flag_hot : FLAG_LANGUAGE.flag_trending;
        break;
      // == 趋势模块语言排序、最热模块标签排序
      case MORE_MENU.Sort_Key:
      case MORE_MENU.Sort_Language:
        RouteName = 'SortKeyPage';
        params.flag = menu !== MORE_MENU.Sort_Language ? FLAG_LANGUAGE.flag_hot : FLAG_LANGUAGE.flag_trending;
        break;
      // == 自定义主题
      case MORE_MENU.Custom_Theme:
        const { onShowCustomThemeView } = this.props.themeActions;
        onShowCustomThemeView(true);
        break;
    }
    if (RouteName) {
      NavigationUtil.goPage(RouteName, params);
    }
  }

  // == 渲染每个 item
  renderItem(menu) {
    const { theme } = this.props;
    return ViewUtil.getMenuItem(
      () => this.onItemClick(menu),
      menu,
      theme.themeColor
    );
  }

  render() {
    const { theme } = this.props;
    // == 自定义导航栏【包含状态栏】
    let navigationBar = (
      <NavigationBar 
          title={'我的'}
          statusBar={{
              backgroundColor: theme.themeColor,
              barStyle: 'light-content'
          }}
          style={theme.styles.navBar}
      />
    );

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.themeColor}}>
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          {navigationBar}
          <ScrollView>
            <TouchableOpacity
                style={styles.item}
                onPress={() => this.onItemClick(MORE_MENU.About)}
            >
              <View style={styles.about_left}>
                <Ionicons
                    name={MORE_MENU.About.icon}
                    size={40}
                    style={{
                        marginRight: 10,
                        color: theme.themeColor,
                    }}
                />
                <Text>GitHub Popular</Text>
              </View>
              <Ionicons
                name={'ios-arrow-forward'}
                size={16}
                style={{
                    marginRight: 10,
                    alignSelf: 'center',
                    color: THEME_COLOR,
                }}
              />
            </TouchableOpacity>
            <View style={LINE_STYLE}/>
            {this.renderItem(MORE_MENU.Tutorial)}
            {/*趋势管理*/}
            <Text style={styles.group_title}>趋势管理</Text>
            {/*自定义语言*/}
            {this.renderItem(MORE_MENU.Custom_Language)}
            {/*语言排序*/}
            <View style={LINE_STYLE}/>
            {this.renderItem(MORE_MENU.Sort_Language)}

            {/*最热管理*/}
            <Text style={styles.group_title}>最热管理</Text>
            {/*自定义标签*/}
            {this.renderItem(MORE_MENU.Custom_Key)}
            {/*标签排序*/}
            <View style={LINE_STYLE}/>
            {this.renderItem(MORE_MENU.Sort_Key)}
            {/*标签移除*/}
            <View style={LINE_STYLE}/>
            {this.renderItem(MORE_MENU.Remove_Key)}

            {/*设置*/}
            <Text style={styles.group_title}>设置</Text>
            {/*自定义主题*/}
            {this.renderItem(MORE_MENU.Custom_Theme)}
            {/*关于作者*/}
            <View style={LINE_STYLE}/>
            {this.renderItem(MORE_MENU.About_Author)}
            <View style={LINE_STYLE}/>
            {/*反馈*/}
            {this.renderItem(MORE_MENU.Feedback)}
            <View style={LINE_STYLE}/>
            {this.renderItem(MORE_MENU.CodePush)}
          </ScrollView>
          {this.renderCustomThemeView()}
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    padding: 10,
    height: 90,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  // == 左侧布局
  about_left: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  // == 模块名称
  group_title: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 12,
    color: 'gray'
  }
});

export default connect(
  state => ({
      nav: state.nav,
      customThemeViewVisible: state.theme.customThemeViewVisible,
      theme: state.theme.theme,
  }),
  dispatch => {
      return {
          themeActions: bindActionCreators(themeAction, dispatch),
          navAction: {
            back: () => dispatch(NavigationActions.back()),
            init: () => dispatch(NavigationActions.init()),
            navigate: (payload) => dispatch(NavigationActions.navigate(payload)),
            setParams: (payload) => dispatch(NavigationActions.setParams(payload))
          }
      };
  }
)(MemberPage);
