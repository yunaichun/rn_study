import TRPES from '../types';
import { hotStore } from '../../service/Hot/index';
import servicePath from '../../config';
// == 对 items 做一层包装【含有收藏状态】
import _wrapItems from '../../util/WrapItems';

// == 最热模块
export default {

    /**
     * 初始加载 - 下拉刷新
     * @param {String} storeName 语言名称
     */
    onLoadData(storeName, callback) {
        return dispatch => {
            dispatch({
                type: TRPES.HOT_REFRESH,
                storeName
            });
            let url = servicePath.searchHot(storeName);
            hotStore.fetchData(url)
            .then(data => {
                // == 对 items 做一层包装【含有收藏状态】
                _wrapItems('hot', data && data.data && data.data.items, function(items) {
                    dispatch({
                        type: TRPES.HOT_REFRESH_SUCCESS,
                        items,
                        storeName
                    });
                });
            })
            .then(() => {
                if(typeof callback === 'function') callback();
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: TRPES.HOT_REFRESH_FAIL,
                    error,
                    storeName
                });
            });
        }
    },
    
    /**
     * 加载更多 - 上拉加载
     * @param {String} storeName 语言名称
     */
    onLoadMoreData(storeName, callback) {
        return dispatch => {
            dispatch({
                type: TRPES.HOT_LOAD_MORE,
                storeName
            });
            setTimeout(() => {
                dispatch({
                    type: TRPES.HOT_LOAD_MORE_SUCCESS,
                    storeName,
                    callback
                });
            });
        }
    }
};
