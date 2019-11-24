import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    RefreshControl,
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
    }
});

export default FlatListDemo;
