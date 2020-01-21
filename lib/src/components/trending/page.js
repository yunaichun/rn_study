import React from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  DeviceEventEmitter,
} from 'react-native';
import Toast from 'react-native-easy-toast'

// == redux 相关
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavigationActions } from "react-navigation";
import { trendingAction } from '../../actions';

// == 全局导航类
import NavigationUtil from '../../routers/utils';

// == 引入组件
import TrendingItem from './item';
import { EVENT_TYPE_TIME_SPAN_CHANGE } from '../../util/EventType';

// == 通用工具
import FavoriteUtil from '../../util/FavoriteUtil';
import {
  EVENT_TYPE_TRENDING_FAVORITE_CHANGE,
  EVENT_TYPE_BOTTOM_TAB_CHANGE,
} from '../../util/EventType';

class TrendingPage extends React.Component {
  constructor(props) {
    super(props);
    this.timeSpan = this.props.timeSpan;

    this.isFavoriteChanged = false;
  }

  componentDidMount() {
    this._loadData();
    // == 事件发射器 - 弹窗数据修改的时候只更新列表，不更新 tab
    this.timeSpanChangeListener = DeviceEventEmitter.addListener(EVENT_TYPE_TIME_SPAN_CHANGE, (timeSpan) => {
      this.timeSpan = timeSpan;
      this._loadData();
    });

    // == 事件发射器 - 收藏模块收藏状态发生改变的时候触发
    this.favoriteChangeListener = DeviceEventEmitter.addListener(EVENT_TYPE_TRENDING_FAVORITE_CHANGE, () => {
      // == 收藏模块收藏状态发生改变的时候触发
      this.isFavoriteChanged = true;
    });
    // == 事件发射器 - 每次 tab 切换的时候回调
    this.tabChangeListener = DeviceEventEmitter.addListener(EVENT_TYPE_BOTTOM_TAB_CHANGE, (data) => {
      // == tab 切换的时候、同时收藏模块收藏状态发生改变的时候
      if (data.to === 1 && this.isFavoriteChanged) {
        this._loadData();
      }
    });
  }

  componentWillUnmount() {
    if (this.timeSpanChangeListener) {
      this.timeSpanChangeListener.remove();
    }

    // == 收藏模块收藏状态改变，同时由收藏模块切换到趋势模块
    if (this.favoriteChangeListener) {
      this.favoriteChangeListener.remove();
    }
    if (this.tabChangeListener) {
      this.tabChangeListener.remove();
    }
  }

  // == 加载数据
  _loadData = () =>  {
    const { trendingAction, tabBarLabel } = this.props;
    const { searchValue } = this.timeSpan;
    trendingAction.onLoadData(tabBarLabel, searchValue, () => { this.isFavoriteChanged = false; });
  }

  // == 上拉刷新时底部布局样式
  _setFooterStyle = () =>  {
    let { items, page, pagesize, firstRequest } = this._sliceData();
    // == 页面初次加载的时候不显示上拉加载更多
    if (firstRequest) {
      return null;
    }
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
  _loadMoreData = () => {
    let _this = this;
    const { trendingAction, tabBarLabel } = this.props;
    trendingAction.onLoadMoreData(tabBarLabel, function() {
      _this.refs['toast'].show('没有更多了');
    });
  }
  
  // == 截取数据
  _sliceData = () => {
    let { tabBarLabel, trending } = this.props;
    let store = trending[tabBarLabel];
    if (!store) {
      store = {
        firstRequest: false,
        isLoading: false,
        items: [],
        page: 1,
        pagesize: 10
      };
    }
    let { items, page, pagesize, firstRequest, isLoading } = { ...store };
    return { items, page, pagesize, firstRequest, isLoading };
  }

  // == 渲染每一条
  _renderItem = ({ item }) =>  {
    return (
      <TrendingItem
        item={item}
        // == 点击 item 跳转到详情页
        onSelect={(callback) => {
          // == 当前在 HomePage 路由中，要跳转到并行同级路由 DetailPage
          NavigationUtil.goPage('DetailPage', { item, nowModule: 'trending', callback });
        }}
        // == 添加/取消收藏
        onFavorite={ (item, isFavorite) => {
          FavoriteUtil.onFavorite('trending', isFavorite, item.fullName, JSON.stringify(item));
        }}   
      />
    );
  }

  render() {
    let { items, page, pagesize, firstRequest, isLoading } = this._sliceData();

    return (
      <View style={styles.container}>
        <FlatList 
          data={items.slice(0, page * pagesize)}
          renderItem={(data) => this._renderItem(data)}
          keyExtractor={ item => `${item.fullName}`}
          refreshControl={
            <RefreshControl
                title='正在刷新中'
                titleColor={'red'}
                tintColor={'red'}
                colors={['red']}
                refreshing={isLoading}
                onRefresh={() => {
                  this._loadData();
                }}
            />
          }
          // 底部自定义样式
          ListFooterComponent={() => this._setFooterStyle()}
          // 上拉加载更多
          onEndReached={() => {
            if (firstRequest) {
              return;
            }
            setTimeout(() => {
              if (this.canLoadMore) {
                this._loadMoreData();
                this.canLoadMore = false;
              }
            }, 100);   
          }}
          onEndReachedThreshold={0.5}
          // 开始上拉【因为初始页面的时候就会调用上拉加载更多】
          onMomentumScrollBegin={() => {
            this.canLoadMore = true;
          }}
        />
        <Toast
          ref={'toast'}
          position={'center'}
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
      trending: state.trending
  }),
  dispatch => {
      return {
          trendingAction: bindActionCreators(trendingAction, dispatch),
          navAction: {
            back: () => dispatch(NavigationActions.back()),
            init: () => dispatch(NavigationActions.init()),
            navigate: (payload) => dispatch(NavigationActions.navigate(payload)),
            setParams: (payload) => dispatch(NavigationActions.setParams(payload))
          }
      };
  }
)(TrendingPage);
