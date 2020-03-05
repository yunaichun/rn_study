import TYPES from '../types';
import { favoriteHotStore } from '../../service/Favorite/hot';
import { favoriteTrendingStore } from '../../service/Favorite/trending';

// == 收藏模块
export default {

    /**
     * 初始加载 - 下拉刷新
     * @param {String} storeName - hot/trending
     */
    onLoadData(storeName, callback) {
        return dispatch => {
            dispatch({
                type: TYPES.FAVORITE_REFRESH,
                storeName
            });
            let store;
            if (storeName === 'hot') {
                store = favoriteHotStore;
            } else {
                store = favoriteTrendingStore;
            }
            store.getAllItems()
            .then(items => {
                dispatch({
                    type: TYPES.FAVORITE_REFRESH_SUCCESS,
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
                    type: TYPES.FAVORITE_REFRESH_FAIL,
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
                type: TYPES.FAVORITE_LOAD_MORE,
                storeName
            });
            setTimeout(() => {
                dispatch({
                    type: TYPES.FAVORITE_LOAD_MORE_SUCCESS,
                    storeName,
                    callback
                });
            });
        }
    }

};
