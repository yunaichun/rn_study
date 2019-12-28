import { createStore, applyMiddleware } from 'redux';
// == 所有 reducer
import reducers from '../reducers';
// == 中间件
import thunk from 'redux-thunk';
import { navMiddleware } from '../routers';
import logMiddleware from './logMiddleware';

const store = createStore(
    reducers,
    applyMiddleware(
        logMiddleware,
        navMiddleware,
        thunk,
    )
);

export default store;
