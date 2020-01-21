import TRPES from '../types';
import { dataPersistence } from '../../service/DataPersistence';
import { expandPersistence } from '../../service/ExpandPersistence';

// == 收藏模块
export default {

    /**
     * 初始加载 - 下拉刷新
     * @param {String} storeName - hot/trending
     */
    onLoadData(storeName, callback) {
        return dispatch => {
            dispatch({
                type: TRPES.FAVORITE_REFRESH,
                storeName
            });
            let persistence;
            if (storeName === 'hot') {
                persistence = dataPersistence;
            } else {
                persistence = expandPersistence;
            }
            persistence.getAllItems()
            .then(items => {
                dispatch({
                    type: TRPES.FAVORITE_REFRESH_SUCCESS,
                    items,
                    storeName
                });
            })
            .then(() => {
                if(typeof callback === 'function') callback();
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: TRPES.FAVORITE_REFRESH_FAIL,
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
                type: TRPES.FAVORITE_LOAD_MORE,
                storeName
            });
            setTimeout(() => {
                dispatch({
                    type: TRPES.FAVORITE_LOAD_MORE_SUCCESS,
                    storeName,
                    callback
                });
            });
        }
    }

};
