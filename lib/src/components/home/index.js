import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import { AppBottomTabNavigatorContainer } from '../../routers/bottom';

class HomePage extends React.Component {
  render() {
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

export default HomePage;