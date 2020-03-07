import React, {Component} from 'react'
import {
    DeviceInfo,
    Platform,
    Modal,
    TouchableHighlight,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { themeAction } from '../../actions/index';

import ThemeStore from '../../service/Theme/index';
import ThemeFactory, { ThemeFlags } from '../../util/ThemeFactory';

import { ROOT_CONTAINER } from '../../util/Global';

class CustomTheme extends Component {
    constructor(props) {
        super(props);
        // == ThemeStore 实例
        this.themeStore = new ThemeStore();
    }

    // == 每个主题样式点击事件
    onSelectTheme(themeKey) {
        // == 关闭弹窗
        this.props.onClose();
        // == 保存到本地
        this.themeStore.save(ThemeFlags[themeKey]);
        // == 更新 store
        const { onThemeChange } = this.props.themeAction;
        onThemeChange(ThemeFactory.createTheme(ThemeFlags[themeKey]));
    }

    // == 每个主题样式
    renderThemeItem(themeKey) {
        return (
            <TouchableHighlight
                style={{flex: 1}}
                underlayColor='white'
                onPress={() => this.onSelectTheme(themeKey)}
            >
                <View style={[{backgroundColor: ThemeFlags[themeKey]}, styles.themeItem]}>
                    <Text style={styles.themeText}>{themeKey}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    // == 每行展示 3 个主题
    renderThemeItems() {
        const views = [];
        for (let i = 0, keys = Object.keys(ThemeFlags), l = keys.length; i < l; i += 3) {
            const key1 = keys[i], key2 = keys[i + 1], key3 = keys[i + 2];
            views.push(
                <View key={i} style={{flexDirection: 'row'}}>
                    {this.renderThemeItem(key1)}
                    {this.renderThemeItem(key2)}
                    {this.renderThemeItem(key3)}
                </View>
            )
        }
        return views;
    }

    // == 渲染主题弹窗
    renderContentView() {
        return (
            <Modal
                animationType={'slide'}
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => {
                    // == 关闭事件
                    this.props.onClose()
                }}
            >
                <View style={styles.modalContainer}>
                    <ScrollView>
                        {this.renderThemeItems()}
                    </ScrollView>
                </View>
            </Modal>
        )
    }

    render() {
        return this.props.visible ? (
            <View style={ROOT_CONTAINER}>
                {this.renderContentView()}
            </View>
        ): null;
    }
}

const styles = StyleSheet.create({
    // == 弹窗样式
    modalContainer: {
        flex: 1,
        margin: 10,
        marginBottom: 10 + (DeviceInfo.isIPhoneX_deprecated ? 24 : 0),
        marginTop: Platform.OS === 'ios' ? 20 + (DeviceInfo.isIPhoneX_deprecated ? 24 : 0) : 10,
        backgroundColor: 'white',
        borderRadius: 3,
        shadowColor: 'gray',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        padding: 3
    },
    // == 每个主题的样式
    themeItem: {
        flex: 1,
        height: 120,
        margin: 3,
        padding: 3,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    // == 主题文字说明样式
    themeText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16
    }
});

export default connect(
    state => ({}),
    dispatch => ({
        themeAction: bindActionCreators(themeAction, dispatch),
    })
)(CustomTheme);
