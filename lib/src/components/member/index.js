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

class MemberPage extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick(menu) {
    console.log(menu);
    let RouteName;
    let params = {};
    switch (menu) {
      case MORE_MENU.Tutorial:
        RouteName = 'WebViewPage';
        params.title = '教程';
        params.url = 'https://coding.m.imooc.com/classindex.html?cid=89';
          break;
      case MORE_MENU.About:
        RouteName = 'AboutPage';
        break;
      case MORE_MENU.About_Author:
        RouteName = 'AboutMePage';
        break;
    }
    if (RouteName) {
      NavigationUtil.goPage(RouteName, params);
    }
  }

  getItem(menu) {
    return ViewUtil.getMenuItem(
      () => this.onClick(menu),
      menu,
      THEME_COLOR
    );
  }

  render() {
    // == 自定义导航栏【包含状态栏】
    let navigationBar = (
      <NavigationBar 
          title={'我的'}
          statusBar={{
              backgroundColor: THEME_COLOR,
              barStyle: 'light-content'
          }}
          style={{backgroundColor: THEME_COLOR}}
      />
    );

    return (
      <SafeAreaView style={styles.container}>
        <View style={{flex: 1}}>
          {navigationBar}
        </View>
        <ScrollView>
          <TouchableOpacity
              style={styles.item}
              onPress={() => this.onClick(MORE_MENU.About)}
          >
            <View style={styles.about_left}>
              <Ionicons
                  name={MORE_MENU.About.icon}
                  size={40}
                  style={{
                      marginRight: 10,
                      color: THEME_COLOR,
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
          {this.getItem(MORE_MENU.Tutorial)}
          {/*趋势管理*/}
          <Text style={styles.group_title}>趋势管理</Text>
          {/*自定义语言*/}
          {this.getItem(MORE_MENU.Custom_Language)}
          {/*语言排序*/}
          <View style={LINE_STYLE}/>
          {this.getItem(MORE_MENU.Sort_Language)}

          {/*最热管理*/}
          <Text style={styles.group_title}>最热管理</Text>
          {/*自定义标签*/}
          {this.getItem(MORE_MENU.Custom_Key)}
          {/*标签排序*/}
          <View style={LINE_STYLE}/>
          {this.getItem(MORE_MENU.Sort_Key)}
          {/*标签移除*/}
          <View style={LINE_STYLE}/>
          {this.getItem(MORE_MENU.Remove_Key)}

          {/*设置*/}
          <Text style={styles.group_title}>设置</Text>
          {/*自定义主题*/}
          {this.getItem(MORE_MENU.Custom_Theme)}
          {/*关于作者*/}
          <View style={LINE_STYLE}/>
          {this.getItem(MORE_MENU.About_Author)}
          <View style={LINE_STYLE}/>
          {/*反馈*/}
          {this.getItem(MORE_MENU.Feedback)}
          <View style={LINE_STYLE}/>
          {this.getItem(MORE_MENU.CodePush)}
        </ScrollView>
      </SafeAreaView>
    );
  }
};

export default connect(
  state => ({
      nav: state.nav,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f4',
  },
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
