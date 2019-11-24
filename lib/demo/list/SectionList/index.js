import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    SectionList,
    RefreshControl,
    ActivityIndicator,
    Button,
} from 'react-native';

const CITY_NAMES = [ 
    { data: ['北京', '上海', '广州', '深圳'], title: '一线城市' }, 
    { data: ['杭州', '苏州', '成都', '武汉'], title: '二线城市' },
    { data: ['郑州', '洛阳', '厦门'],  title: '三线城市' }
];
class SectionListDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 是否显示正在加载图标
            isLoading: false,
            data: CITY_NAMES
        };
    }
    // 渲染分类下内容
    _renderItem({ index, section, item}) {
        console.log(111, index, section, item);
        return (
            <View style={styles.item}>
                <Text style={styles.text}>{item}</Text>
            </View>
        )
    }
    // 渲染分类
    _renderSectionHeader({section}) {
        return (
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionText}>{section.title}</Text>
            </View>
        );
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
                <SectionList
                    // 数据源 【与 FlatList 不一样的地方】
                    sections={this.state.data}
                    // 渲染分类【与 FlatList 不一样的地方】
                    renderSectionHeader= {(data) => this._renderSectionHeader(data)}
                    // 渲染分类每一条
                    renderItem={(data) => this._renderItem(data)}
                    // item 与 item 之间的分割线
                    ItemSeparatorComponent={() => <View style={styles.separator}/>}
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
        backgroundColor: '#fafafa',
    },
    item: {
        height: 80,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 20,
    },
    indicatorContainer: {
        alignItems: 'center'
    },
    indicator: {
        color: 'red',
        margin: 10
    },
    sectionHeader: {
        height: 50,
        backgroundColor: '#93ebbe',
        alignItems: 'center',
        justifyContent: 'center'
    },
    sectionText: {
        color: 'red',
        fontSize: 20,
    },
    separator: {
        height: 1,
        backgroundColor: 'gray',
        flex: 1,
    }
});

export default SectionListDemo;
