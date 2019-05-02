import {rootReducer} from '../reducers/root-reducer';
import { createStore} from 'redux';
import preloadedState from './preloaded-state-store';
import middlewares from "./middleware-store";

const store = createStore(
    rootReducer,
    preloadedState,
    middlewares,
);


export default store;
