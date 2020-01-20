import React from 'react';

// == 底部路由
import AppBottomTabNavigator from './router';
// == 将外层的 navigator 保存起来，方便内层 navigator 可以调用跳转
import NavigationUtil from '../../routers/utils';

// == redux 相关
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavigationActions } from "react-navigation";
import { themeAction } from '../../actions';

// == 处理 android 物理返回
import BackPress from '../../common/BackPress';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    // == 处理 android 物理返回
    this.backPress = new BackPress({ backPress: this.onBackPress });
  }

  componentDidMount() {
    this.backPress.componentDidMount();
  }

  componentWillUnmount() {
    this.backPress.componentWillUnmount();
  }

  // == 此处为剪头函数，上面可以直接写函数名
  onBackPress = () => {
    const { navAction, nav } = this.props;
    // == Welcome + InitinalPage
    // == nav.routes[1] 代表 InitinalPage
    // == nav.routes[1].index === 0 代表前面已经没有路由，直接 kill 应用
    if (nav.routes[1].index === 0) {
      // == 不处理物理返回
      return false;
    } else {
      // == 处理物理返回
      navAction.back();
      return true;
    }
  };
  
  render() {
    /* 将外层的 navigator 保存起来，方便内层 navigator 可以调用跳转 */
    NavigationUtil.navigation = this.props.navigation;
    return (
      <AppBottomTabNavigator />
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
)(HomePage);
