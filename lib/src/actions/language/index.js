import TYPES from '../types';
import LanguageStore from '../../service/Language/index';

/**
 * 加载最热/趋势模块标签
 * @param flagKey
 * @returns {function(*)}
 */
export default {
    onLoadData(flagKey) {
        return async dispatch => {
            try {
                let languages = await new LanguageStore(flagKey).fetch();
                dispatch({
                    type: TYPES.LANGUAGE_LOAD_SUCCESS,
                    languages: languages,
                    flag: flagKey
                });
            } catch (e) {
                console.log(e)
            }
        }
    }
}
