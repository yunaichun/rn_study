import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    RefreshControl,
    ActivityIndicator,
    Button,
} from 'react-native';

const CITY_NAMES = [ '北京', '上海', '广州', '深圳', '杭州', '苏州', '成都', '武汉', '郑州', '洛阳', '厦门' ];
class FlatListDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 是否显示正在加载图标
            isLoading: false,
            data: CITY_NAMES
        };
    }
    // 渲染每一条
    _renderItem(data) {
        console.log(111, data);
        return (
            <View style={styles.item}>
                <Text style={styles.text}>{data.item}</Text>
            </View>
        )
    }
    // 下拉刷新
    _pullDownRefresh() {
        this.setState({ isLoading: true });
        // 通过计时器模拟请求
        setTimeout(() => {
            let { data } = this.state;
            let arr = [];
            for (let i = data.length - 1; i >= 0; i--) {
                arr.push(data[i]);
            }
            this.setState({
                isLoading: false,
                data: arr
            });
        }, 2000);
    }
    // 上拉刷新时底部布局样式
    _setFooterStyle() {
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
    }
    _pullUpRefresh() {
        // 通过计时器模拟请求
        setTimeout(() => {
            let { data } = this.state;
            this.setState({
                isLoading: false,
                data: data.concat(CITY_NAMES)
            });
        }, 2000);
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.data}
                    renderItem={(data) => this._renderItem(data)}
                    // refreshing={this.state.isLoading}
                    // onRefresh={() => {
                    //     this._pullDownRefresh();
                    // }}
                    // 下拉刷新
                    refreshControl={
                        <RefreshControl
                            title='loading1'
                            titleColor={'red'}
                            tintColor={'red'}
                            colors={['red']}
                            refreshing={this.state.isLoading}
                            onRefresh={() => {
                                this._pullDownRefresh();
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: '#169',
        height: 200,
        marginRight: 15,
        marginLeft: 15,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontSize: 20,
    },
    indicatorContainer: {
        alignItems: 'center'
    },
    indicator: {
        color: 'red',
        margin: 10
    }
});

export default FlatListDemo;

/* 一、FlatList的特性
1、完全跨平台；
2、支持水平布局模式；
3、行组件显示或隐藏时可配置回调事件；
4、支持单独的头部组件；
5、支持单独的尾部组件；
6、支持自定义行间分隔线；
7、支持下拉刷新；
8、支持上拉加载；
9、支持跳转到指定行（ScrollToIndex）； 
*/


/* 二、属性
1、data: ?Array<ItemT>
为了简化起见，data属性目前只支持普通数组。如果需要使用其他特殊数据结构，例如immutable数组，请直接使用更底层的VirtualizedList组件。

2、renderItem: (info: {item: ItemT, index: number}) => ?React.Element<any>
根据行数据data渲染每一行的组件。

3、onRefresh?: ?() => void
如果设置了此选项，则会在列表头部添加一个标准的RefreshControl控件，以便实现“下拉刷新”的功能。同时你需要正确设置refreshing属性。

4、refreshing?: ?boolean
在等待加载新数据时将此属性设为true，列表就会显示出一个正在加载的符号。

5、horizontal?: ?boolean
设置为true则变为水平布局模式。

6、initialNumToRender: number
指定一开始渲染的元素数量，最好刚刚够填满一个屏幕，这样保证了用最短的时间给用户呈现可见的内容。
注意这第一批次渲染的元素不会在滑动过程中被卸载，这样是为了保证用户执行返回顶部的操作时，不需要重新渲染首批元素。

7、keyExtractor: (item: ItemT, index: number) => string
此函数用于为给定的item生成一个不重复的key。Key的作用是使React能够区分同类元素的不同个体，
以便在刷新时能够确定其变化的位置，减少重新渲染的开销。
若不指定此函数，则默认抽取item.key作为key值。若item.key也不存在，则使用数组下标。

8、ItemSeparatorComponent?: ?ReactClass<any>
行与行之间的分隔线组件。不会出现在第一行之前和最后一行之后。

9、ListFooterComponent?: ?ReactClass<any>
通过它设置尾部组件

10、ListHeaderComponent?: ?ReactClass<any>
通过它设置头部组件

11、columnWrapperStyle?: StyleObj
如果设置了多列布局（即将numColumns值设为大于1的整数），则可以额外指定此样式作用在每行容器上。

12、extraData?: any
如果有除data以外的数据用在列表中（不论是用在renderItem还是Header或者Footer中），请在此属性中指定。
同时此数据在修改时也需要先修改其引用地址（比如先复制到一个新的Object或者数组中），然后再修改其值，否则界面很可能不会刷新。

13、getItem?:
获取指定的Item；

14、getItemCount?:
用于获取总共有多少Item；

15、getItemLayout?: (data: ?Array<ItemT>, index: number) => {length: number, offset: number, index: number}
getItemLayout是一个可选的优化，用于避免动态测量内容尺寸的开销，不过前提是你可以提前知道内容的高度。如果你的行高是固定的，
getItemLayout用起来就既高效又简单，类似下面这样：
getItemLayout={(data, index) => ( {length: 行高, offset: 行高 * index, index} )}
注意如果你指定了SeparatorComponent，请把分隔线的尺寸也考虑到offset的计算之中。

16、legacyImplementation?: ?boolean
设置为true则使用旧的ListView的实现。

17、numColumns: number
多列布局只能在非水平模式下使用，即必须是horizontal={false}。此时组件内元素会从左到右从上到下按Z字形排列，类似启用了flexWrap的布局。组件内元素必须是等高的——暂时还无法支持瀑布流布局。

18、onEndReached?: ?(info: {distanceFromEnd: number}) => void
当列表被滚动到距离内容最底部不足onEndReachedThreshold的距离时调用。

19、onEndReachedThreshold?: ?number
决定当距离内容最底部还有多远时触发onEndReached回调。注意此参数是一个比值而非像素单位。比如，0.5表示距离内容最底部的距离为当前列表可见长度的一半时触发。

20、onViewableItemsChanged?: ?(info: {viewableItems: Array<ViewToken>, changed: Array<ViewToken>}) => void
在可见行元素变化时调用。可见范围和变化频率等参数的配置请设置viewabilityconfig属性

21、viewabilityConfig?: ViewabilityConfig
可参考ViewabilityHelper的源码来了解具体的配置。
*/


/* 三、方法
1、scrollToEnd(params?: object)
滚动到底部。如果不设置getItemLayout属性的话，可能会比较卡。

2、scrollToIndex(params: object)
滚动到指定位置，如果不设置getItemLayout属性的话，可能会比较卡。

3、scrollToItem(params: object)
需要线性扫描数据 - 如果可能，请使用scrollToIndex。如果不设置getItemLayout属性的话只能滚动到当前渲染窗口的某个位置。

4、scrollToOffset(params: object)
滚动到列表中的特定内容像素偏移量。

5、recordInteraction()
 */
