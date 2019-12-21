import  TRPES from '../../actions/types';

// == 初始状态
const initialState = {
  theme: 'blue'
};

export default (state = initialState, action) => {
  switch(action.type)  {
    case TRPES.THEME_CHANGE:
      return {
        ...state,
        theme: action.theme
      }
    default:
      return state;
  }
}
