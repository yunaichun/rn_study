import TRPES from '../types';
import ExpandStore from '../../service/ExpandStore';
import servicePath from '../../config';

// == 最热模块
export default {

    /**
     * 初始加载 - 下拉刷新
     * @param {String} storeName 语言名称
     */
    onLoadData(storeName, searchValue, callback) {
        return dispatch => {
            dispatch({
                type: TRPES.TRENDING_REFRESH,
                storeName
            });
            let expandStore = new ExpandStore();
            let url = servicePath.getTrending(storeName, searchValue);
            expandStore.fetchData(url)
            .then(data => {
                dispatch({
                    type: TRPES.TRENDING_REFRESH_SUCCESS,
                    items: data && data.data,
                    storeName
                });
            })
            .then(() => {
                if(typeof callback === 'function') callback();
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: TRPES.TRENDING_REFRESH_FAIL,
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
                type: TRPES.TRENDING_LOAD_MORE,
                storeName
            });
            setTimeout(() => {
                dispatch({
                    type: TRPES.TRENDING_LOAD_MORE_SUCCESS,
                    storeName,
                    callback
                });
            });
        }
    }
};
