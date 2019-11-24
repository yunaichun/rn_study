import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import NavigationUtil from '../../routers/utils';

class HotItem extends React.Component {
  render() {
    const { tabBarLabel } = this.props; 
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{tabBarLabel}</Text>
        <Text onPress={() => {
          NavigationUtil.goPage('DetailPage');
        }}>跳转到详情页</Text>
      </View>
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

export default HotItem;
