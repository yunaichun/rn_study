/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  View,
} from 'react-native';
/* 引入导航器 */
import { createAppContainer } from 'react-navigation';


/* 1、脚手架生成的初始页面 */
// import Index from './lib/demo/initinalApp.js/index';
/* 2、flex 布局 */
import Index from './lib/demo/flex/index';

const App: () => React$Node = () => {
  return (
    <View style={{marginTop: 20,}}>
      <Index/>
    </View>
  );
};

export default App;
