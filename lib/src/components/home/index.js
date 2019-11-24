import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

class HomePage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>HomePage</Text>
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

export default HomePage;
