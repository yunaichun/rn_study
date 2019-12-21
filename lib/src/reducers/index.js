import { combineReducers } from 'redux';
import { navReducer } from '../routers';
import themeReducer from './theme';

const reducers = combineReducers({
    nav: navReducer,
    theme: themeReducer,
});

export default reducers;
