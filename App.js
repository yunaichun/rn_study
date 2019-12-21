import React from 'react';
// == 引入react-navigation
import { createAppContainer } from 'react-navigation';
// == 引入redux
import { Provider } from 'react-redux';
import store from './lib/src/store';

// == 一、flex 布局
// import Index from './lib/demo/flex/index';
// const AppContainer = () => <Index/>;

// == 二、引入stack、top、bottom导航路由
// import { AppStackNavigator } from './lib/demo/navigator/createStackNavigator/index';
// const AppContainer = createAppContainer(AppStackNavigator);

// == 三、引入switch导航路由 
// import { AppSwitchNavigator } from './lib/demo/navigator/createSwitchNavigator/index';
// const AppContainer = createAppContainer(AppSwitchNavigator);

// == 四、高性能列表组件 
// import { AppStackNavigator } from './lib/demo/list/StackNavigator/index';
// const AppContainer = createAppContainer(AppStackNavigator);

// == 五、当前项目
import { AppWithNavigationState } from './lib/src/routers/index';
const AppContainer = createAppContainer(AppWithNavigationState);

const App = () => {
  return (
    <Provider
    store={store}
    >
      <AppContainer/>
    </Provider>
  );
};

export default App;

