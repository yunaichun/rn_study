import { AsyncStorage } from 'react-native';

export default class Datastore {

    // == 离线缓存策略
    fetchData(url) {
        return new Promise((resolve, reject) => {
            this.fetchLocalData(url)
            .then(wrapData => {
                if (wrapData && Datastore.checkTimestampValid(wrapData.timestamp)) {
                    resolve(wrapData);
                } else {
                    this.fetchNetData(url).then(data => {
                        resolve(this._wrapData(data));
                    }).catch(e => {
                        reject(e);
                    });
                }
            })
            .catch(e => {
                this.fetchNetData(url).then(data => {
                    resolve(this._wrapData(data));
                }).catch(e => {
                    reject(e);
                });
            });
        });
    }

    // == 获取本地数据
    fetchLocalData(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (error) {
                        reject(e);
                        console.log(e);
                    }
                } else {
                    reject(error);
                    console.error(error);
                }
            });
        });
    }

    // == 获取网络数据
    fetchNetData(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
            .then(response => {
                console.log('=== url === res === ', url, response);
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok');
            })
            .then(responseData => {
                this.saveData(url, responseData);
                resolve(responseData);
            })
            .catch(e => {
                reject(e);
            });
        });
    }

    // == 保存数据
    saveData(url, data, callback) {
        if (!url || !data) return;
        AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data), callback));
    }

    // == 对数据添加时间戳
    _wrapData(data) {
        return { data, timestamp: new Date().getTime() };
    }

    // == 检验时间是否在有效期内[1分钟]
    checkTimestampValid(timestamp) {
        const currentDate = new Date();
        const targetDate = new Date();
        targetDate.setTime(timestamp);
        if (currentDate.getFullYear() !== targetDate.getFullYear()) return false;
        if (currentDate.getMonth() !== targetDate.getMonth()) return false;
        if (currentDate.getDate() !== targetDate.getDate()) return false;
        if (currentDate.getHours() !== targetDate.getHours()) return false;
        if (currentDate.getMinutes() - targetDate.getMinutes() > 1) return false;
    }

}