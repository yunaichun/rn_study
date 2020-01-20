import { AsyncStorage } from 'react-native';      

export default class DataPersistence {
    constructor() {
        this.key = 'hot';
    }

    // == 保存
    saveItem(key, value) {
        AsyncStorage.setItem(key, value, (error, result) => {
            if (!error) {
                this.updateKeys(key, true);
            }
        });
    }

    // == 删除
    removeItem(key) {
        AsyncStorage.removeItem(key, (error, result) => {
            if (!error) {
                this.updateKeys(key, false);
            }
        });
    }

    // == 更新 keys 数组
    updateKeys(key, isAdd) {
        AsyncStorage.getItem(this.key, (error, result) => {
            if (!error) {
                let arr = [];
                if (result) arr = JSON.parse(result);
                let index = arr.indexOf(key);
                if (isAdd) {
                    if (index === -1) arr.push(key);
                } else {
                    if (index !== -1) arr.splice(index, 1);
                }
                AsyncStorage.setItem(this.key, JSON.stringify(arr));
            }
        });
    }

    // == 获取 keys 数组【 for hot and trending 】
    getKeys() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(this.key, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch(e) {
                        reject(e);
                    }
                } else {
                    reject(error);
                }
            });
        });
    }

    // == 获取所有保存的 item【 for favorite 】
    getAllItems() {
        return new Promise((resolve, reject) => {
            this.getKeys()
            .then((keys) => {
                let items = [];
                if (keys) {
                    AsyncStorage.multiGet(keys, (error, stores) => {
                        if (!error) {
                            try {
                                stores.map((result, i, store) => {
                                    // get at each store's key/value so you can work with it
                                    let key = store[i][0];
                                    let value = store[i][1];
                                    if (value) items.push(JSON.parse(value));
                                });
                                resolve(items);
                            } catch(e) {
                                reject(e);
                            }
                        } else {
                            reject(error);
                        }
                    });
                } else {
                    resolve(items);
                }
            })
            .catch(e => {
                reject(e);
            });
        });
    }
    
}

// == 可以写为 static 静态方法，就不用 new 操作了
export const dataPersistence = new DataPersistence();
