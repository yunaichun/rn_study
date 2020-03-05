import TRPES from '../../actions/types';
import { FLAG_LANGUAGE } from '../../service/Language/index';

const initialState = {
    hot: [],
    trending: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case TRPES.LANGUAGE_LOAD_SUCCESS:
            if (FLAG_LANGUAGE.flag_hot === action.flag) {
                return {
                    ...state,
                    hot: action.languages
                }
            } else {
                return {
                    ...state,
                    trending: action.languages
                }
            }
        default:
            return state;
    }
}
