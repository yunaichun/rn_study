import  TRPES from '../../actions/types';

// == 初始状态
const initialState = {
    // java: {
    //     isLoading: false,
    //     items: []
    // }
};

export default (state = initialState, action) => {
  switch(action.type)  {
    case TRPES.LOAD_HOT_SUCCESS:
        return {
            ...state,
            [action.storeName]: {
                ...state[action.storeName],
                items: action.items,
                isLoading: false
            }
        }
    case TRPES.LOAD_HOT_FAIL:
        return {
            ...state,
            [action.storeName]: {
                ...state[action.storeName],
                isLoading: false
            }
        }
    case TRPES.HOT_REFRESH:
        return {
            ...state,
            [action.storeName]: {
                ...state[action.storeName],
                isLoading: true
            }
        }
    default:
        return state;
  }
}
