import TRPES from '../types';
import Datastore from '../../service';
import servicePath from '../../config';

// == 最热模块
export default {

    /**
     * 加载指定语言的最热数据
     * @param {String} storeName 语言名称
     */
    onLoadHotData(storeName) {
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
                    type: TRPES.LOAD_HOT_SUCCESS,
                    items: data && data.data && data.data.items,
                    storeName
                });
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: TRPES.LOAD_HOT_FAIL,
                    error,
                    storeName
                });
            });
        }
    }
    
};
