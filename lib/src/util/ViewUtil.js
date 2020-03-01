import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class ViewUtil {
     /**
     * 获取设置页的Item
     * @param callBack 单击item的回调
     * @param name 显示的文本
     * @param color 图标着色
     * @param Icons react-native-vector-icons组件
     * @param icon 左侧图标
     * @param expandableIcon 右侧图标
     * @return {XML}
     */
    static getSettingItem(callBack, name, Icons, icon, color, expandableIcon) {
        return (
            <TouchableOpacity
                onPress={callBack}
                style={styles.setting_item_container}
            >
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    {Icons && icon ?
                        <Icons
                            name={icon}
                            size={16}
                            style={{color: color, marginRight: 10}}
                        />:
                        // == 空占位符
                        <View 
                            style={{
                                opacity: 1,
                                width: 16,
                                height: 16, 
                                marginRight: 10
                            }} 
                        />
                    }
                    <Text>{name}</Text>
                </View>
                <Ionicons
                    name={expandableIcon ? expandableIcon : 'ios-arrow-forward'}
                    size={16}
                    style={{
                        marginRight: 10,
                        alignSelf: 'center',
                        color: color || 'black',
                    }}
                />
            </TouchableOpacity>
        )
    }

    /**
     * 获取设置页的Item
     * @param callBack 单击item的回调
     * @param menu @MORE_MENU => { name, Icons, icon }
     * @param color 图标着色
     * @param expandableIco 右侧图标
     * @return {XML}
     */
    static getMenuItem(callBack, menu, color, expandableIco) {
        return ViewUtil.getSettingItem(callBack, menu.name, menu.Icons, menu.icon, color, expandableIco)
    }

    // == 返回按钮
    static getLeftBackButton(callback) {
        return (
            <TouchableOpacity
                style={styles.backContainer}
                onPress={callback}
            >
                <Ionicons
                    name={'ios-arrow-back'}
                    size={26}
                    style={styles.back}
                />
            </TouchableOpacity>
        );
    }
    // == 分享图标
    static getShareButton(callback) {
        return (
            <TouchableOpacity
                underlayColor={'transparent'}
                onPress={callback}
            >
                <Ionicons
                    name={'md-share'}
                    size={20}
                    style={styles.share}
                />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    backContainer: {
        padding: 8,
        paddingLeft: 12
    },
    back: {
        color: 'white',
    },
    share: {
        opacity: 0.9,
        marginRight: 10,
        color: 'white',
    },
    // == 每个 item
    setting_item_container: {
        backgroundColor: 'white',
        padding: 10, height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
});
