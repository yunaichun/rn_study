import { combineReducers } from 'redux';
import { navReducer } from '../routers';
import themeReducer from './theme';
import hotReducer from './hot';

const reducers = combineReducers({
    nav: navReducer,
    theme: themeReducer,
    hot: hotReducer
});

export default reducers;
