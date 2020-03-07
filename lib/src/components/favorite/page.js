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
import { favoriteAction } from '../../actions';

// == 全局导航类
import NavigationUtil from '../../routers/utils';

// == 引入组件
import HotItem from '../hot/item';
import TrendingItem from '../trending/item';

// == 通用工具
import FavoriteUtil from '../../util/FavoriteUtil';
import {
  EVENT_TYPE_BOTTOM_TAB_CHANGE,
  EVENT_TYPE_HOT_FAVORITE_CHANGE,
  EVENT_TYPE_TRENDING_FAVORITE_CHANGE,
} from '../../util/EventType';

class FavoritePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._loadData();
    // == 事件发射器 - 每次 tab 切换的时候回调
    this.tabChangeListener = DeviceEventEmitter.addListener(EVENT_TYPE_BOTTOM_TAB_CHANGE, (data) => {
      // == tab 切换到收藏的时候刷新页面
      if (data.to === 2) {
        this._loadData();
      }
    });
  }

  componentWillUnmount() {
    if (this.tabChangeListener) {
      this.tabChangeListener.remove();
    }
  }

  // == 加载数据
  _loadData = () =>  {
    const { favoriteAction, tabBarValue, tabBarLabel } = this.props;
    favoriteAction.onLoadData(tabBarValue);
  }

  // == 上拉刷新时底部布局样式
  _setFooterStyle = () =>  {
    const { theme } = this.props;
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
                color={theme.themeColor}
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
    const { favoriteAction, tabBarValue, tabBarLabel } = this.props;
    favoriteAction.onLoadMoreData(tabBarValue, function() {
      _this.refs['toast'].show('没有更多了');
    });
  }
  
  // == 截取数据
  _sliceData = () => {
    let { favorite, tabBarValue, tabBarLabel } = this.props;
    let store = favorite[tabBarValue];
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
    const { theme } = this.props;
    const FavoriteItem = this.props.tabBarValue === 'hot' ? HotItem : TrendingItem;
    return (
      <FavoriteItem
        theme={theme}
        item={item}
        // == 点击 item 跳转到详情页
        onSelect={(callback) => {
          // == 当前在 HomePage 路由中，要跳转到并行同级路由 DetailPage
          let nowModule = this.props.tabBarValue;
          NavigationUtil.goPage('DetailPage', { item, nowModule, callback });
        }}
        // == 添加/取消收藏
        onFavorite={ (item, isFavorite) => this.onFavorite(item, isFavorite, this.props.tabBarValue) }
      />
    );
  }

  // == 添加/取消收藏
  onFavorite( item, isFavorite, nowModule) {
    // == 一、添加/取消收藏
    let key = item.id ? item.id.toString() : item.fullName;
    FavoriteUtil.onFavorite(nowModule, isFavorite, key, JSON.stringify(item));
    // == 二、事件发射器 - 收藏状态发生变化的时候触发
    if (nowModule === 'hot') {
      DeviceEventEmitter.emit(EVENT_TYPE_HOT_FAVORITE_CHANGE);
    } else {
      DeviceEventEmitter.emit(EVENT_TYPE_TRENDING_FAVORITE_CHANGE);
    }
  }

  render() {
    const { theme } = this.props;
    let { items, page, pagesize, firstRequest, isLoading } = this._sliceData();

    return (
      <View style={styles.container}>
        <FlatList 
          data={items.slice(0, page * pagesize)}
          renderItem={(data) => this._renderItem(data)}
          // == 需要做适配 - 最热/趋势
          keyExtractor={ item => `${item.id || item.fullName}`}
          refreshControl={
            <RefreshControl
                title='正在刷新中'
                titleColor={theme.themeColor}
                tintColor={theme.themeColor}
                colors={[theme.themeColor]}
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
      favorite: state.favorite,
      theme: state.theme.theme,
  }),
  dispatch => {
      return {
        favoriteAction: bindActionCreators(favoriteAction, dispatch),
          navAction: {
            back: () => dispatch(NavigationActions.back()),
            init: () => dispatch(NavigationActions.init()),
            navigate: (payload) => dispatch(NavigationActions.navigate(payload)),
            setParams: (payload) => dispatch(NavigationActions.setParams(payload))
          }
      };
  }
)(FavoritePage);
