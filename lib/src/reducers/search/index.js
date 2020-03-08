import TYPES from '../../actions/types';

// == 初始状态
const initialState = {
    // == 目的是第一次加载数据的时候不会触发上拉加载更多
    firstRequest: true,
    isLoading: false,
    items: [],
    page: 1,
    pagesize: 10,
    // == 搜索按钮文案
    showText: '搜索',
    // == 控制搜索的时候，整个洁面显示 loading
    hideLoadingMore: true,
    // == 显示底部添加到自定义标签
    showBottomButton: false,
};

export default (state = initialState, action) => {
  switch(action.type)  {
    case TYPES.SEARCH_REFRESH:
        return {
            ...state,
            firstRequest: true,
            isLoading: true,
            items: state.items ? state.items : [],
            page: 1,
            pagesize: 10,
            hideLoadingMore: true,
            showBottomButton: false,
            showText:'取消',
        }
    case TYPES.SEARCH_REFRESH_SUCCESS:
        return {
            ...state,
            firstRequest: false,
            isLoading: false,
            items: action.items,
            page: 1,
            pagesize: 10,
            hideLoadingMore: false,
            showBottomButton: action.showBottomButton,
            showText: '搜索',
            inputKey: action.inputKey
        }
    case TYPES.SEARCH_CANCEL:
    case TYPES.SEARCH_REFRESH_FAIL:
        return {
            ...state,
            firstRequest: false,
            isLoading: false,
            page: 1,
            pagesize: 10,
            showText: '搜索',
        }
    case TYPES.SEARCH_LOAD_MORE:
            return {
                ...state,
                isLoading: true
            }
    case TYPES.SEARCH_LOAD_MORE_SUCCESS:
        let { items, page, pagesize } = state;
        if (items.length > page * pagesize) {
            page = page + 1;
        } else {
            // == 触发页面的回调
            action.callback();
        }
        
        return {
            ...state,
            isLoading: false,
            page,
            pagesize: 10,
        }
    default:
        return state;
  }
}
