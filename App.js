import React from 'react';
// == 引入react-navigation
import { createAppContainer } from 'react-navigation';
// == 引入redux
import { Provider } from 'react-redux';
import store from './lib/src/store';

// == demo - flex 布局
// import Index from './lib/demo/flex';
// const AppContainer = () => <Index/>;

// == demo - fetch 网络请求
import Index from './lib/demo/fetch';
const AppContainer = () => <Index/>;

// == demo - 引入 stack、top、bottom 导航路由
// import { AppStackNavigator } from './lib/demo/navigator/createStackNavigator';
// const AppContainer = createAppContainer(AppStackNavigator);

// == demo - 引入 switch 导航路由 
// import { AppSwitchNavigator } from './lib/demo/navigator/createSwitchNavigator';
// const AppContainer = createAppContainer(AppSwitchNavigator);

// == demo - 高性能列表组件 
// import { AppStackNavigator } from './lib/demo/list/StackNavigator';
// const AppContainer = createAppContainer(AppStackNavigator);

// == 当前项目
// import { AppWithNavigationState } from './lib/src/routers';
// const AppContainer = createAppContainer(AppWithNavigationState);

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;
