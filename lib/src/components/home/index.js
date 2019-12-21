import React from 'react';
import {
  BackHandler,
  StyleSheet,
  View,
  Text,
} from 'react-native';

// == 底部路由
import { AppBottomTabNavigatorContainer } from '../../routers/bottom';
// == 将外层的 navigator 保存起来，方便内层 navigator 可以调用跳转
import NavigationUtil from '../../routers/utils';

// == redux 相关
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { themeAction } from '../../actions';
import { NavigationActions } from "react-navigation";

class HomePage extends React.Component {

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress = () => {
    const { navAction, nav } = this.props;
    // == nav.routes[1] 代表 routes/index.js 导航中的 HomePage 路由
    // == index 为 0 时代表路由中已经没有页面往前退了, 此时不处理物理返回
    if (nav.routes[1].index === 0) {
      return false;
    }

    navAction.back();
    return true;
  };
  
  render() {
    /* 将外层的 navigator 保存起来，方便内层 navigator 可以调用跳转 */
    NavigationUtil.navigation = this.props.navigation;
    return (
      <AppBottomTabNavigatorContainer></AppBottomTabNavigatorContainer>
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
    }
});

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
)(HomePage);