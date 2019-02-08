import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index-reducer';

const initialState = {};
const middleware = [thunk];
const storeMatcha = createStore(rootReducer, initialState, applyMiddleware(...middleware) +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default storeMatcha;
