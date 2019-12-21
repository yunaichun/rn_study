import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';

// == 引入 redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { themeAction } from '../../actions';
import { NavigationActions } from "react-navigation";

class TrendingPage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>TrendingPage</Text>
        <Button
          title="改变主题色"
          onPress={()=>{
            const { themeActions } = this.props;
            themeActions.onThemeChange('red');
          }}
        />
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
)(TrendingPage);
