import React, {Component} from 'react';
import {
    SafeAreaView,
    Alert,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import CheckBox from 'react-native-check-box';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

class CustomKeyPage extends Component {
    constructor(props) {
        super(props);
        // == 取出参数
        this.params = this.props.navigation.state.params;
        // == 处理 android 物理返回键
        this.backPress = new BackPressComponent({backPress: (e) => this.onBackPress(e)});
        // == 保存用户触发的一些变更
        this.changeValues = [];
        // == 标识：页面是不是标签移除页面
        this.isRemoveKey = !!this.params.isRemoveKey;
        // == 创建 store 实例
        this.languageStore = new LanguageStore(this.params.flag);
        // == 当前页面要显示的数据
        this.state = {
            keys: []
        }
    }

    // == props 改变的时候触发
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.keys !== CustomKeyPage._keys(nextProps, null, prevState)) {
            return {
                keys: CustomKeyPage._keys(nextProps, null, prevState),
            }
        }
        // == 必须要有返回值（返回的是 this.state ）
        return null;
    }

    componentDidMount() {
        this.backPress.componentDidMount();
        // == 导航器 navigation 没传递的话，则从本地存储中获取标签
        if (CustomKeyPage._keys(this.props).length === 0) {
            let { onLoadData } = this.props.languageAction;
            onLoadData(this.params.flag);
        }
        this.setState({
            keys: CustomKeyPage._keys(this.props),
        })
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }

    /**
     * 静态方法：获取原始标签
     * @param props 导航器 navigation 传递的属性值
     * @param original 移除标签时使用，是否从 props 获取原始对的标签
     * @param state 移除标签时使用
     * @returns {*}
     */
    static _keys(props, original, state) {
        const { flag, isRemoveKey } = props.navigation.state.params;
        let key = flag === FLAG_LANGUAGE.flag_hot ? 'hot' : 'trending';
        if (isRemoveKey && !original) {
            // == 目的主要是让最热模块自定义标签默认全部不选中
            return state && state.keys && state.keys.length !== 0 && state.keys || 
                    props.language[key].map(val => {
                        // == 注意：不直接修改 props，copy 一份
                        return {
                            ...val,
                            checked: false
                        };
                    });
        } else {
            // == 取出 最热/趋势 模块数据
            return props.language[key];
        }
    }

    // == 顶部导航左侧返回方法
    onBackPress(e) {
        this.onBack();
        return true;
    }

    // == 保存修改
    onBack() {
        if (this.changeValues.length > 0) {
            Alert.alert('提示', '要保存修改吗？', [
                {
                    text: '否', onPress: () => {
                        NavigationUtil.goBack(this.props.navigation)
                    }
                }, 
                {
                    text: '是', onPress: () => {
                        this.onSave();
                    }
                }
            ]);
        } else {
            NavigationUtil.goBack(this.props.navigation)
        }
    }

    // == 顶部导航右侧保存按钮
    onSave() {
        if (this.changeValues.length === 0) {
            NavigationUtil.goBack(this.props.navigation);
            return;
        }
        let keys;
        // == 移除标签的特殊处理
        if (this.isRemoveKey) {
            if (this.changeValues.length === this.state.keys.length) {
                alert('不能将所有的标签全部移除');
                return;
            }
            for (let i = 0, l = this.changeValues.length; i < l; i++) {
                ArrayUtil.remove(keys = CustomKeyPage._keys(this.props, true), this.changeValues[i], 'name');
            }
        }
        // == 更新本地数据
        this.languageStore.save(keys || this.state.keys);
        const { onLoadData } = this.props.languageAction;
        // == 更新store
        onLoadData(this.params.flag);
        NavigationUtil.goBack(this.props.navigation);
    }

    // == 渲染可滚动区域，每行 2 个元素
    renderView() {
        let dataArray = this.state.keys;
        if (!dataArray || dataArray.length === 0) return;
        let len = dataArray.length;
        let views = [];
        for (let i = 0, l = len; i < l; i += 2) {
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(dataArray[i], i)}
                        {i + 1 < len && this.renderCheckBox(dataArray[i + 1], i + 1)}
                    </View>
                    <View style={styles.line}/>
                </View>
            )
        }
        return views;
    }

    // == 渲染 CheckBox
    renderCheckBox(data, index) {
        return <CheckBox
            style={{flex: 1, padding: 10}}
            onClick={() => this.onClick(data, index)}
            isChecked={data.checked}
            leftText={data.name}
            checkedImage={this._checkedImage(true)}
            unCheckedImage={this._checkedImage(false)}
        />
    }

    // == CheckBox 点击事件处理
    onClick(data, index) {
        data.checked = !data.checked;
        ArrayUtil.updateArray(this.changeValues, data);
        // == 更新 state 以便显示选中状态
        this.state.keys[index] = data;
        this.setState({
            keys: this.state.keys
        })
    }

    // == CheckBox 选中与未选中状态图片
    _checkedImage(checked) {
        const { theme } = this.params;
        return <Ionicons
            name={checked ? 'ios-checkbox' : 'md-square-outline'}
            size={20}
            style={{
                color: theme.themeColor,
            }}/>
    }

    render() {
        const { theme } = this.params;
        // == 自定义语言、标签、移除标签 NavigationBar 统一封装
        let title = this.isRemoveKey ? '标签移除' : '自定义标签';
        title = this.params.flag === FLAG_LANGUAGE.flag_trending ? '自定义语言' : title;
        let rightButtonTitle = this.isRemoveKey ? '移除' : '保存';
        let navigationBar = <NavigationBar
            title={title}
            leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
            style={{backgroundColor: theme.themeColor}}
            rightButton={ViewUtil.getRightButton(rightButtonTitle, () => this.onSave())}
        />;

        return (
            <SafeAreaView style={{flex: 1, backgroundColor: theme.themeColor}}>
                <View style={{flex: 1, backgroundColor: '#fff'}}>
                    {navigationBar}
                    <ScrollView>
                        {this.renderView()}
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
    },
    line: {
        flex: 1,
        height: 0.3,
        backgroundColor: 'darkgray',
    }
});

export default connect(
    state => ({
        // == 最热模块/趋势模块数据全部取出来
        language: state.language,
    }), 
    dispatch => ({
        languageAction: bindActionCreators(languageAction, dispatch),
    })
)(CustomKeyPage);
