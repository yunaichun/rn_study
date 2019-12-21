import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
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
