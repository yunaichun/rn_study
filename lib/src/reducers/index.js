import { combineReducers } from 'redux';
import { navReducer } from '../routers';
import themeReducer from './theme';
import hotReducer from './hot';
import trendingReducer from './trending';
import favoriteReducer from './favorite';
import languageReducer from './language';

const reducers = combineReducers({
    nav: navReducer,
    theme: themeReducer,
    hot: hotReducer,
    trending: trendingReducer,
    favorite: favoriteReducer,
    language: languageReducer,
});

export default reducers;
