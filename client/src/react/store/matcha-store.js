import rootReducer from '../reducers/root-reducer';
import { createStore} from 'redux';
import preloadedState from './preloaded-state-store';
import middlewares from "./middleware-store";

const storeMatcha = createStore(
    rootReducer,
    preloadedState,
    middlewares,
);

export default storeMatcha;
