import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { middleware } from '../routers';

const store = createStore(
    reducers,
    applyMiddleware(thunk, middleware)
);

export default store;
