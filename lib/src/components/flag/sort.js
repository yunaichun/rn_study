import React, { Component } from 'react';
import {
    SafeAreaView,
    Alert,
    TouchableHighlight,
    StyleSheet,
    View,
    Text,
    ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SortableListView from 'react-native-sortable-listview'
import SafeAreaViewPlus from '../../common/SafeAreaViewPlus';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { languageAction } from '../../actions/index';
import LanguageStore, { FLAG_LANGUAGE } from '../../service/Language/index';

import NavigationUtil from '../../routers/utils';
import NavigationBar from '../../common/NavigationBar';
import BackPressComponent from '../../common/BackPress';
import ViewUtil from '../../util/ViewUtil';
import ArrayUtil from '../../util/ArrayUtil';
import { THEME_COLOR } from '../../util/Global';

class SortKeyPage extends Component {
    constructor(props) {
        super(props);
        // == 取出参数
        this.params = this.props.navigation.state.params;
        // == 处理 android 物理返回键
        this.backPress = new BackPressComponent({backPress: (e) => this.onBackPress(e)});
        // == 创建 store 实例
        this.languageStore = new LanguageStore(this.params.flag);
        // == 存放已经选择的标签集合
        this.state = {
            // == 初始化的时候即获取数据，不用在 componentDidMount 生命周期再获取了
            checkedArray: [],
        }
    }

    // == props 改变的时候触发
    static getDerivedStateFromProps(nextProps, prevState) {
        console.log(111111, nextProps, prevState)
        const checkedArray = SortKeyPage._keys(nextProps, prevState);
        if (prevState.keys !== checkedArray) {
            return {
                checkedArray: checkedArray,
            }
        }
        // == 必须要有返回值（返回的是 this.state ）
        return null;
    }

    componentDidMount() {
        this.backPress.componentDidMount();
        // == 如果 props 中标签为空则从本地存储中获取标签
        if (SortKeyPage._keys(this.props).length === 0) {
            let { onLoadData } = this.props.languageAction;
            onLoadData(this.params.flag);
        }
        this.setState({
            checkedArray: SortKeyPage._keys(this.props),
        })
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }

    /**
     * 静态方法：筛选出为 checked 的标签
     * @param props
     * @param state
     * @returns {*}
     * @private
     */
    static _keys(props, state) {
        // == 如果 state 中有 checkedArray 则使用 state 中的 checkedArray
        if (state && state.checkedArray && state.checkedArray.length) {
            return state.checkedArray;
        }
        // == 否则从原始数据中获取 checkedArray
        const flag = SortKeyPage._flag(props);
        let dataArray = props.language[flag] || [];
        let keys = [];
        for (let i = 0, j = dataArray.length; i < j; i++) {
            let data = dataArray[i];
            // == 筛选出 checked 为 true 的数据
            if (data.checked) keys.push(data);
        }
        return keys;
    }

    static _flag(props) {
        const { flag } = props.navigation.state.params;
        return flag === FLAG_LANGUAGE.flag_hot ? 'hot' : 'trending';
    }

    // == 顶部导航左侧返回方法
    onBackPress(e) {
        this.onBack();
        return true;
    }

    // == 保存修改
    onBack() {
        // == 如果排序前数组和排序后数组一样，则直接返回
        if (!ArrayUtil.isEqual(SortKeyPage._keys(this.props), this.state.checkedArray)) {
            Alert.alert('提示', '要保存修改吗？', [
                {
                    text: '否', onPress: () => {
                        NavigationUtil.goBack(this.props.navigation)
                    }
                }, 
                {
                    text: '是', onPress: () => {
                        this.onSave(true);
                    }
                }
            ]);
        } else {
            NavigationUtil.goBack(this.props.navigation);
        }
    }

    // == 顶部导航右侧保存按钮
    onSave(hasChecked) {
        // == 优化：如果没有排序则直接返回
        if (!hasChecked) {
            // == 判断为 checked 的标签与 state 数组
            if (ArrayUtil.isEqual(SortKeyPage._keys(this.props), this.state.checkedArray)) {
                NavigationUtil.goBack(this.props.navigation);
                return;
            }
        }
        // == 更新本地数据
        this.languageStore.save(this.getSortResult());
        // == 更新store
        const { onLoadData } = this.props.languageAction;
        onLoadData(this.params.flag);
        NavigationUtil.goBack(this.props.navigation);
    }

    // == 获取排序后的标签结果
    getSortResult() {
        const flag = SortKeyPage._flag(this.props);
        // == 拷贝原始数组【包含 checked 和非 checked 数据】
        let sortResultArray = ArrayUtil.clone(this.props.language[flag]);
        // == 原始 checked 的数组【与 this.state.checkedArray】
        const originalCheckedArray = SortKeyPage._keys(this.props);
        // == 遍历原始 checked 的数组，找到其在原始位置
        for (let i = 0, j = originalCheckedArray.length; i < j; i++) {
            let item = originalCheckedArray[i];
            // == 找到要替换的元素所在位置
            let index = this.props.language[flag].indexOf(item);
            // == 进行替换
            sortResultArray.splice(index, 1, this.state.checkedArray[i]);
        }
        return sortResultArray;
    }

    // == 渲染拖拽区域
    renderView() {
        return (
            <SortableListView
                style={{ flex: 1 }}
                data={this.state.checkedArray}
                // == 排序
                order={Object.keys(this.state.checkedArray)}
                // == 被拖拽移动
                onRowMoved={e => {
                    this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0])
                    this.forceUpdate()
                }}
                // == 渲染一行
                renderRow={row => <SortCell data={row} {...this.params}/>}
            />
        );
    }

    render() {
        const { theme } = this.params;
        let title = this.params.flag === FLAG_LANGUAGE.flag_trending ? '语言排序' : '标签排序';
        let navigationBar = <NavigationBar
            title={title}
            leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
            style={{ backgroundColor: theme.themeColor, }}
            rightButton={ViewUtil.getRightButton('保存', () => this.onSave())}
        />;
        return (
            // <SafeAreaView style={{flex: 1, backgroundColor: theme.themeColor}}>
            <SafeAreaViewPlus
                topColor={theme.themeColor}
            >
                <View style={{flex: 1, backgroundColor: '#fff'}}>
                    {navigationBar}
                    {this.renderView()}
                </View>
            </SafeAreaViewPlus>       
        );
    }
}

// == 可拖拽组件的每一行
class SortCell extends Component {
    
    render() {
        const { theme } = this.props;
        return (
            <TouchableHighlight
                // == 按下去颜色
                underlayColor={'#eee'}
                style={this.props.data.checked ? styles.item : styles.hidden}
                {...this.props.sortHandlers}
            >
                <View style={{marginLeft: 10, flexDirection: 'row'}}>
                    <MaterialCommunityIcons
                        name={'sort'}
                        size={16}
                        style={{marginRight: 10, color: theme.themeColor}}
                    />
                    <Text>{this.props.data.name}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    line: {
        flex: 1,
        height: 0.3,
        backgroundColor: 'darkgray',
    },
    item: {
        backgroundColor: "#F8F8F8",
        borderBottomWidth: 1,
        borderColor: '#eee',
        height: 50,
        justifyContent: 'center'
    },
    hidden: {
        height: 0
    },
});

export default connect(
    state => ({
        // == 最热模块/趋势模块数据全部取出来
        language: state.language,
    }), 
    dispatch => ({
        languageAction: bindActionCreators(languageAction, dispatch),
    })
)(SortKeyPage);
