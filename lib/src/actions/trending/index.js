import TYPES from '../types';
import { trendingStore } from '../../service/Trending/index';
import servicePath from '../../config';
// == 对 items 做一层包装【含有收藏状态】
import _wrapItems from '../../util/WrapItems';

// == 趋势模块
export default {

    /**
     * 初始加载 - 下拉刷新
     * @param {String} storeName 语言名称
     */
    onLoadData(storeName, searchValue, callback) {
        return dispatch => {
            dispatch({
                type: TYPES.TRENDING_REFRESH,
                storeName
            });
            let url = servicePath.getTrending(storeName, searchValue);
            trendingStore.fetchData(url)
            .then(data => {
                // == 对 items 做一层包装【含有收藏状态】
                _wrapItems('trending', data && data.data, function(items) {
                    dispatch({
                        type: TYPES.TRENDING_REFRESH_SUCCESS,
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
                    type: TYPES.TRENDING_REFRESH_FAIL,
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
                type: TYPES.TRENDING_LOAD_MORE,
                storeName
            });
            setTimeout(() => {
                dispatch({
                    type: TYPES.TRENDING_LOAD_MORE_SUCCESS,
                    storeName,
                    callback
                });
            });
        }
    }
};
