import TYPES from '../types';
import servicePath from '../../config';
import ArrayUtil from "../../util/ArrayUtil";

const CANCEL_TOKENS = [];

// == 最热模块
export default {

    // == 发起搜索
    onSearch(storeName, token, hotKeys, callback) {
        return dispatch => {
            dispatch({
                type: TYPES.SEARCH_REFRESH,
                storeName
            });
            let url = servicePath.searchHot(storeName);
            fetch(url)
            .then(response => {
                // == 优化：取消操作的话，不做反序列化
                return hasCancel(token) ? null : response.json();
            })
            .then(data => {
                // == 如果任务取消，则不做任何处理
                if (hasCancel(token, true)) {
                    console.log('user cancel');
                    return;
                }
                // == 搜索失败处理
                if (!data || !data.items || data.items.length === 0) {
                    dispatch({type: TYPES.SEARCH_REFRESH_FAIL, message: `没找到关于${inputKey}的项目`});
                    if(typeof callback === 'function') callback(`没找到关于${inputKey}的项目`);
                    return;
                }
                dispatch({
                    type: TYPES.SEARCH_REFRESH_SUCCESS,
                    items: data.items,
                    storeName,
                    showBottomButton: !ArrayUtil.checkKeyIsExist(hotKeys, storeName),
                    inputKey: storeName,
                });
            })
            .then(() => {
                if(typeof callback === 'function') callback();
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: TYPES.SEARCH_REFRESH_FAIL,
                    error,
                    storeName
                });
            });
        }
    },

    // == 取消搜索
    onSearchCancel(token) {
        return dispatch => {
            CANCEL_TOKENS.push(token);
            dispatch({type: TYPES.SEARCH_CANCEL});
        }
    },

    // == 上拉加载更多
    onLoadMoreData(storeName, callback) {
        return dispatch => {
            dispatch({
                type: TYPES.SEARCH_LOAD_MORE,
                storeName
            });
            setTimeout(() => {
                dispatch({
                    type: TYPES.SEARCH_LOAD_MORE_SUCCESS,
                    storeName,
                    callback
                });
            });
        }
    }
    
};


/**
 * 检查指定token是否已经取消
 * @param token
 * @param isRemove 移除 CANCEL_TOKENS 数组里的 token
 * @returns {boolean}
 */
function hasCancel(token, isRemove) {
    if (CANCEL_TOKENS.includes(token)) {
        isRemove && ArrayUtil.remove(CANCEL_TOKENS, token);
        return true;
    }
    return false;
}
