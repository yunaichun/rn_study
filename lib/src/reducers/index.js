import { combineReducers } from 'redux';
import { navReducer } from '../routers';
import themeReducer from './theme';
import hotReducer from './hot';
import trendingReducer from './trending';

const reducers = combineReducers({
    nav: navReducer,
    theme: themeReducer,
    hot: hotReducer,
    trending: trendingReducer,
});

export default reducers;
