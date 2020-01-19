import TRPES from '../types';
import Datastore from '../../service/DataStore';
import servicePath from '../../config';

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
            let dataStore = new Datastore();
            let url = servicePath.searchHot(storeName);
            dataStore.fetchData(url)
            .then(data => {
                dispatch({
                    type: TRPES.HOT_REFRESH_SUCCESS,
                    items: data && data.data && data.data.items,
                    storeName
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
