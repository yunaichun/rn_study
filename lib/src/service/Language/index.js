// import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage } from 'react-native';
import langs_hot from '../../data/langs_hot.json';
import langs_trending from '../../data/langs_trending.json';

export const FLAG_LANGUAGE = {
    flag_hot: 'flag_hot',
    flag_trending: 'flag_trending'
};

export default class LanguageStore {
    constructor(flag) {
        this.flag = flag;
    }

    /**
     * 获取最热/趋势标签
     * @returns {Promise<any> | Promise}
     */
    fetch() {
        return new Promise((resolve, reject) => {
            // == 存储的 key 值就是当前的 flag
            AsyncStorage.getItem(this.flag, (error, result) => {
                if (error) {
                    alert('error')
                    reject(error);
                    return;
                }
                // == 本地缓存有即取，没有则读取文件
                if (!result || result === '{}') {
                    let data = this.flag === FLAG_LANGUAGE.flag_hot ? langs_hot : langs_trending;
                    this.save(data);
                    resolve(data);
                } else {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(error);
                    }
                }
            });
        });
    }

    /**
     * 保存语言或标签
     * @param objectData
     */
    save(objectData) {
        let stringData = JSON.stringify(objectData);
        AsyncStorage.setItem(this.flag, stringData, (error, result) => {
        });
    }
}
