import React from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
  Text,
} from 'react-native';

// == redux 相关
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavigationActions } from "react-navigation";
import { hotAction } from '../../actions';

// == 全局导航类
import NavigationUtil from '../../routers/utils';

class HotItem extends React.Component {

  componentDidMount() {
    this.loadData();
  }

  // == 加载数据
  loadData() {
    const { hotAction, tabBarLabel } = this.props;
    hotAction.onLoadHotData(tabBarLabel);
  }

  // == 渲染每一条
  _renderItem({ item, index }) {
    console.log(item);
    return (
        <View style={styles.item}>
            <Text style={styles.text}>{JSON.stringify(item)}</Text>
        </View>
    )
  }

  render() {
    const { tabBarLabel, hot } = this.props;
    let store = hot[tabBarLabel];
    if (!store) {
      store = {
        isLoading: false,
        items: []
      };
    }
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{tabBarLabel}</Text>
        <FlatList 
          data={store.items}
          renderItem={(data) => this._renderItem(data)}
          keyExtractor={ item => `${item.id}`}
          refreshControl={
            <RefreshControl
                title='loading'
                titleColor={'red'}
                tintColor={'red'}
                colors={['red']}
                refreshing={store.isLoading}
                onRefresh={() => {
                  this.loadData();
                }}
            />
          }
        />
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
    },
    item: {},
    text: {}
});

export default connect(
  state => ({
      nav: state.nav,
      hot: state.hot
  }),
  dispatch => {
      return {
          hotAction: bindActionCreators(hotAction, dispatch),
          navAction: {
            back: () => dispatch(NavigationActions.back()),
            init: () => dispatch(NavigationActions.init()),
            navigate: (payload) => dispatch(NavigationActions.navigate(payload)),
            setParams: (payload) => dispatch(NavigationActions.setParams(payload))
          }
      };
  }
)(HotItem);
