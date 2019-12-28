import  TRPES from '../../actions/types';

// == 初始状态
const initialState = {
    // java: {
    //     isLoading: false,
    //     items: [],
    //     page: 1,
    //     pagesize: 5
    // }
};

export default (state = initialState, action) => {
  switch(action.type)  {
    case TRPES.HOT_REFRESH:
        return {
            ...state,
            [action.storeName]: {
                ...state[action.storeName],
                isLoading: true,
                items: [],
                page: 1,
                pagesize: 5
            }
        }
    case TRPES.HOT_REFRESH_SUCCESS:
        return {
            ...state,
            [action.storeName]: {
                ...state[action.storeName],
                items: action.items,
                isLoading: false,
                page: 1,
                pagesize: 5
            }
        }
    case TRPES.HOT_REFRESH_FAIL:
        return {
            ...state,
            [action.storeName]: {
                ...state[action.storeName],
                isLoading: false,
                page: 1,
                pagesize: 5
            }
        }
    case TRPES.HOT_PULLUP:
        let store = state[action.storeName];
        if (!store) {
            store = {
                isLoading: false,
                items: [],
                page: 1,
                pagesize: 5
            };
        }
        let { items, page, pagesize } = store;
        if (items.length > page * pagesize) {
            page = page + 1;
        }
        
        return {
            ...state,
            [action.storeName]: {
                ...state[action.storeName],
                isLoading: false,
                pagesize: 5,
                page,
            }
        }
    default:
        return state;
  }
}
