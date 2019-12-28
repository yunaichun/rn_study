import React from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
  Text,
  ActivityIndicator
} from 'react-native';

// == redux 相关
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavigationActions } from "react-navigation";
import { hotAction } from '../../actions';

// == 全局导航类
import NavigationUtil from '../../routers/utils';

// == 引入组件
import HotItem from './item';

class HotPage extends React.Component {

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
    return <HotItem item={item} onSelect={() => {
      NavigationUtil.goPage('DetailPage');
    }}/>
  }

  // == 上拉刷新时底部布局样式
  _setFooterStyle() {
    let { tabBarLabel, hot } = this.props;
    let store = hot[tabBarLabel];
    if (!store) {
      store = {
        isLoading: false,
        items: [],
        page: 1,
        pagesize: 5
      };
    }
    let { items, page, pagesize } = store;

    if (items.length > page * pagesize) {
      return (
        <View style={styles.indicatorContainer}>
            <ActivityIndicator
                size={'large'}
                color={'red'}
                animating={true}
                style={styles.indicator}
            />
            <Text>正在加载中</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.nomore}>
            <Text>没有更多了</Text>
        </View>
      )
    }
  }

  // == 上拉加载更多
  _pullUpRefresh() {
    const { hotAction, tabBarLabel } = this.props;
    setTimeout(function() {
      hotAction.onPullUpHotData(tabBarLabel);
    });
  }
  
  render() {
    let { tabBarLabel, hot } = this.props;
    let store = hot[tabBarLabel];
    if (!store) {
      store = {
        isLoading: false,
        items: [],
        page: 1,
        pagesize: 5
      };
    }
    let { items, page, pagesize, isLoading } = store;
    let data = [... items];
    if (data.length > page * pagesize) {
      data = data.slice(0, page * pagesize);
    }

    return (
      <View style={styles.container}>
        <FlatList 
          data={data}
          renderItem={(data) => this._renderItem(data)}
          keyExtractor={ item => `${item.id}`}
          refreshControl={
            <RefreshControl
                title='loading'
                titleColor={'red'}
                tintColor={'red'}
                colors={['red']}
                refreshing={isLoading}
                onRefresh={() => {
                  this.loadData();
                }}
                
            />
          }
          // 底部自定义样式
          ListFooterComponent={() => this._setFooterStyle()}
          // 上拉加载更多
          onEndReached={() => {
              this._pullUpRefresh();
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
    tabName: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    indicatorContainer: {
      alignItems: 'center'
    },
    indicator: {
        color: 'red',
        margin: 10
    },
    nomore: {
      marginBottom: 16,
      marginTop: 16,
      alignItems: 'center',
      justifyContent: 'center'
    }
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
)(HotPage);
