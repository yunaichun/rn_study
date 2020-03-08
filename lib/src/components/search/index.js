import React from 'react';
import {
    SafeAreaView,
    Platform,
    DeviceInfo,
    FlatList,
    RefreshControl,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-easy-toast'

// == redux 相关
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavigationActions } from "react-navigation";
import { searchAction, languageAction } from '../../actions';
import LanguageStore, { FLAG_LANGUAGE } from '../../service/Language/index';

// == 全局导航类
import NavigationUtil from '../../routers/utils';
import NavigationBar from '../../common/NavigationBar';
import ViewUtil from '../../util/ViewUtil';

// == 引入组件
import HotItem from '../hot/item';

// == 通用工具
import BackPressComponent from '../../common/BackPress';
import FavoriteUtil from '../../util/FavoriteUtil';
import ArrayUtil from '../../util/ArrayUtil';
import { WINDOW_HEIGHT } from '../../util/Global';

class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        // == 二级路由参数
        this.params = this.props.navigation.state.params;
        // == 处理 android 物理返回键
        this.backPress = new BackPressComponent({backPress: (e) => this.onBackPress(e)});
        // == 创建 store 实例
        this.languageStore = new LanguageStore(FLAG_LANGUAGE.flag_hot);
        // == 搜索一个不存在的关键字
        this.isKeyChange = false;
    }

    componentDidMount() {
        this.backPress.componentDidMount();
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }

    // == 处理安卓物料返回
    onBackPress() {
        const { searchAction, languageAction } = this.props;
        // == 退出时取消搜索
        searchAction.onSearchCancel();
        // == 失去焦点
        this.refs.input.blur();
        // == 返回
        NavigationUtil.goBack(this.props.navigation);
        // == 点击底部添加的话，重新加载标签
        if (this.isKeyChange) {
            languageAction.onLoadData(FLAG_LANGUAGE.flag_hot);
        }
        return true;
    }

    // == 加载数据
    _loadData = () =>  {
        const { searchAction: { onSearch }, language: { hot } } = this.props;
        this.searchToken = new Date().getTime()
        onSearch(this.inputKey, this.searchToken, hot, () => { this.isKeyChange = false; });
    }

    // == 上拉刷新时底部布局样式
    _setFooterStyle = () =>  {
        const { theme, search } = this.props;
        let { items, page, pagesize, firstRequest } = search;
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
        const { searchAction: { onLoadMoreData } } = this.props;
        onLoadMoreData(this.inputKey, function() {
            _this.refs['toast'].show('没有更多了');
        });
    }

    // == 自定义顶部导航
    renderTitleView() {
        const { search: { inputKey }, theme } = this.props;
        const placeholder = inputKey || "请输入";
        return (
            <View style={{
                backgroundColor: theme.themeColor,
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <TextInput
                    ref="input"
                    placeholder={placeholder}
                    onChangeText={text => this.inputKey = text}
                    style={styles.textInput}
                >
                </TextInput>
            </View>
        );
    }

    // == 渲染每一条
    _renderItem = ({ item }) =>  {
        const { theme } = this.props;
        return (
            <HotItem
                theme={theme}
                item={item}
                // == 点击 item 跳转到详情页
                onSelect={(callback) => {
                    // == 当前在 HomePage 路由中，要跳转到并行同级路由 DetailPage
                    NavigationUtil.goPage('DetailPage', { item, nowModule: 'hot', callback, theme });
                }}
                // == 添加/取消收藏
                onFavorite={ (item, isFavorite) => {
                    FavoriteUtil.onFavorite('hot', isFavorite, item.id.toString(), JSON.stringify(item));
                }}
            />
        );
    }

    // == 渲染列表
    renderResultView() {
        let { search: { items, page, pagesize, firstRequest, isLoading, hideLoadingMore }, theme } = this.props;
        let indicatorView = hideLoadingMore ?
            <ActivityIndicator
                style={styles.centering}
                size='large'
                animating={isLoading}
            /> : null;
        
        let listView = hideLoadingMore ? null : (
            <FlatList 
                data={items.slice(0, page * pagesize)}
                renderItem={(data) => this._renderItem(data)}
                keyExtractor={ item => `${item.id}`}
                // == 设置安全距离
                contentInset={
                    {
                        bottom: 45
                    }
                }
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
        );
        let resultView = (
            <View style={{flex: 1}}>
                {indicatorView}
                {listView}
            </View>
        );
        return resultView;
    }
    
    // == 渲染底部添加标签按钮
    renderBottomButton() {
        let { search: { showBottomButton }, theme } = this.props;
        let bottomButton = showBottomButton ? (
            <TouchableOpacity
                style={[styles.bottomButton, {backgroundColor: theme.themeColor}]}
                onPress={() => {
                    this.onBottomButtonClick();
                }}
            >
                <View style={{justifyContent: 'center'}}>
                    <Text style={styles.title}>朕收下了</Text>
                </View>
            </TouchableOpacity>
        ) : null;
        return bottomButton;
    }

    // == 底部收藏按钮
    onBottomButtonClick() {
        const { hot } = this.props.language;
        let key = this.inputKey;
        console.log(222222222, hot);
        if (ArrayUtil.checkKeyIsExist(hot, key)) {
            this.toast.show(key + '已经存在');
        } else {
            key = {
                "path": key,
                "name": key,
                "checked": true
            };
            hot.unshift(key);
            // == 添加至标签库
            this.languageStore.save(hot);
            this.toast.show(key.name + '保存成功');
            // == 以便点击返回的时候保存更改
            this.isKeyChange = true;
        }
    }

    // == 点击右侧搜索或取消
    onRightButtonClick() {
        // == 收起键盘
        this.refs.input.blur();
        const { searchAction: { onSearchCancel }, search } = this.props;
        if (search.showText === '搜索') {
            this._loadData();
        } else {
            onSearchCancel(this.searchToken);
        }
    }

    render() {
        const { theme } = this.props;
        // == 自定义导航栏【包含状态栏】
        let navigationBar = (
            <NavigationBar 
                statusBar={{
                    backgroundColor: theme.themeColor,
                    barStyle: 'light-content'
                }}
                titleView={ this.renderTitleView() }
                style={{backgroundColor: theme.themeColor}}
                leftButton={ViewUtil.getLeftBackButton(() => this.onBackPress())}
                rightButton={ViewUtil.getRightButton(this.props.search.showText, () => this.onRightButtonClick())}
            />
        );

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.themeColor}}>
                {navigationBar}
                <View style={styles.container}>
                    {this.renderResultView()}
                </View>
                {this.renderBottomButton()}
                <Toast ref={toast => this.toast = toast} position={'center'}/>
            </SafeAreaView>
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
    },
    // == 底部收下按钮
    bottomButton: {
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.9,
        height: 40,
        position: 'absolute',
        left: 10,
        top: WINDOW_HEIGHT - 45 - (DeviceInfo.isIPhoneX_deprecated ? 34 : 0),
        right: 10,
        borderRadius: 3
    },
    // == 居中加载进度条
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    // == 关键字输入框
    textInput: {
        flex: 1,
        height: (Platform.OS === 'ios') ? 26 : 36,
        borderWidth: (Platform.OS === 'ios') ? 1 : 0,
        borderColor: "white",
        alignSelf: 'center',
        paddingLeft: 5,
        marginRight: 10,
        marginLeft: 5,
        borderRadius: 3,
        opacity: 0.7,
        color: 'white'
    },
});

export default connect(
    state => ({
        nav: state.nav,
        theme: state.theme.theme,
        search: state.search,
        language: state.language,
    }),
    dispatch => {
        return {
            searchAction: bindActionCreators(searchAction, dispatch),
            languageAction: bindActionCreators(languageAction, dispatch),
            navAction: {
                back: () => dispatch(NavigationActions.back()),
                init: () => dispatch(NavigationActions.init()),
                navigate: (payload) => dispatch(NavigationActions.navigate(payload)),
                setParams: (payload) => dispatch(NavigationActions.setParams(payload))
            }
        };
    }
)(SearchPage);
