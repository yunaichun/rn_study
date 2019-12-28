import React from 'react';
import { SafeAreaView } from 'react-native';

// == 顶部路由
import { AppMaterialTopTabNavigatorContainer } from '../../routers/top';

class HotPage extends React.Component {
  render() {
    return (
      <SafeAreaView  style={{flex: 1, backgroundColor: '#fff'}}>
        <AppMaterialTopTabNavigatorContainer />
      </SafeAreaView>
    );
  }
};

export default HotPage;
