import TRPES from '../types';
import Datastore from '../../service';
import servicePath from '../../config';

// == 最热模块
export default {

    /**
     * 初始加载全部
     * @param {String} storeName 语言名称
     */
    onLoadHotData(storeName, callback) {
        return dispatch => {
            dispatch({
                type: TRPES.HOT_REFRESH,
                storeName
            });
            let dataStore = new Datastore();
            let url = servicePath.search(storeName);
            dataStore.fetchData(url)
            .then(data => {
                dispatch({
                    type: TRPES.HOT_REFRESH_SUCCESS,
                    items: data && data.data && data.data.items,
                    storeName
                });
            })
            .then(() => {
                callback();
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
     * 上拉加载更多
     * @param {String} storeName 语言名称
     */
    onPullUpHotData(storeName) {
        return dispatch => {
            dispatch({
                type: TRPES.HOT_PULLUP,
                storeName
            });
        }
    }
};
