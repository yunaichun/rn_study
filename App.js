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
// import Demo from './lib/demo/01/AppCopy';
import Demo from './lib/demo/01/flex';

const App: () => React$Node = () => {
  return (
    <View style={{marginTop: 20,}}>
      <Demo/>
    </View>
  );
};

export default App;
