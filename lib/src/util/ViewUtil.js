import React from 'react';
import {
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class ViewUtil {
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
    }
});
