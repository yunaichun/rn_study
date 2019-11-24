import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import { AppMaterialTopTabNavigatorContainer } from '../../routers/top';

class HotPage extends React.Component {
  render() {
    return (
      <SafeAreaView  style={{flex: 1, backgroundColor: '#fff'}}>
        <AppMaterialTopTabNavigatorContainer></AppMaterialTopTabNavigatorContainer>
      </SafeAreaView>
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

export default HotPage;
