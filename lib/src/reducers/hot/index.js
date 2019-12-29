import  TRPES from '../../actions/types';

// == 初始状态
const initialState = {
    // java: {
    //     firstRequest: true, // 目的是第一次加载数据的时候不会触发上拉加载更多    
    //     isLoading: false,
    //     items: [],
    //     page: 1,
    //     pagesize: 10
    // }
};

export default (state = initialState, action) => {
  switch(action.type)  {
    case TRPES.HOT_REFRESH:
        return {
            ...state,
            [action.storeName]: {
                ...state[action.storeName],
                firstRequest: true,
                isLoading: true,
                items: [],
                page: 1,
                pagesize: 10
            }
        }
    case TRPES.HOT_REFRESH_SUCCESS:
        return {
            ...state,
            [action.storeName]: {
                ...state[action.storeName],
                firstRequest: false,
                isLoading: false,
                items: action.items,
                page: 1,
                pagesize: 10
            }
        }
    case TRPES.HOT_REFRESH_FAIL:
        return {
            ...state,
            [action.storeName]: {
                ...state[action.storeName],
                firstRequest: false,
                isLoading: false,
                page: 1,
                pagesize: 10
            }
        }
    case TRPES.HOT_LOAD_MORE:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: true
                }
            }
    case TRPES.HOT_LOAD_MORE_SUCCESS:
        let store = state[action.storeName];
        if (!store) {
            store = {
                isLoading: false,
                items: [],
                page: 1,
                pagesize: 10
            };
        }
        let { items, page, pagesize } = store;
        if (items.length > page * pagesize) {
            page = page + 1;
        } else {
            // == 触发页面的回调
            action.callback();
        }
        
        return {
            ...state,
            [action.storeName]: {
                ...state[action.storeName],
                isLoading: false,
                page,
                pagesize: 10,
            }
        }
    default:
        return state;
  }
}
