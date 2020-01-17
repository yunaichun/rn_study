import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  Button,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

// == 引入 redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { themeAction } from '../../actions';
import { NavigationActions } from "react-navigation";

// == 自定义导航组件
import NavigationBar from '../../common/NavigationBar';

const THEME_COLOR = '#678';

class MemberPage extends React.Component {

  // == 导航栏右边按钮
  getRightButton() {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {}}
        >
          <View style={{padding: 5, marginRight: 8}}>
            <Feather 
              name={'search'}
              size={24}
              style={{color: 'white'}}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  // == 导航栏左边按钮
  getLeftButton() {
    return (
      <TouchableOpacity
        style={{padding: 8, paddingLeft: 12}}
        onPress={() => {}}
      >
        <Ionicons 
          name={'ios-arrow-back'}
          size={26}
          style={{color: 'white'}}
        />
      </TouchableOpacity>
    );
  }

  render() {
    // == 自定义导航栏【包含状态栏】
    let navigationBar = (
      <NavigationBar 
          title={'我的'}
          statusBar={{
              backgroundColor: THEME_COLOR,
              barStyle: 'light-content'
          }}
          style={{backgroundColor: THEME_COLOR}}
          leftButton={this.getLeftButton()}
          rightButton={this.getRightButton()}
      />
  );
    return (
      <SafeAreaView  style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.container}>
          {navigationBar}
          <Button
            title="改变主题色"
            onPress={()=>{
              const { themeActions } = this.props;
              themeActions.onThemeChange('blue');
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
)(MemberPage);