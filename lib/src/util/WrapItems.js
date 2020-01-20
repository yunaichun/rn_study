import { dataPersistence } from '../service/DataPersistence';

/**
 * 对返回的数组进行包装 - 添加一个 isFavorite 字段
 * @param {*} items 
 */
export default async function _wrapItems(items, callback) {
    let keys = [];
    try {
        keys = await dataPersistence.getKeys();
    } catch (e) {
        console.log(e);
    }
    let arr = [];
    for (let i = 0, len = items.length; i < len; i++) {
        arr.push({ ...items[i], isFavorite: checkFaorite(items[i], keys) });
    }

    // == 在回调函数中将包装的数据传递过去
    if (typeof callback === 'function') callback(arr);
}

/**
 * 检查 item 对象的 key 值 是否被存储在 keys 数组中
 * @param {Object} item
 * @param {Array} keys 
 */
function checkFaorite(item = {}, keys = []) {
    if (!keys) return false;
    for (let i = 0, len = keys.length; i < len; i++) {
        // == 最热 - id
        // == 趋势 - fullName
        let id = item.id || item.fullName;
        if (id.toString() === keys[i]) {
            return true;
        }
    }
    return false;
}
