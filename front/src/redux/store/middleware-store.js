import thunk from 'redux-thunk';
import {applyMiddleware, compose} from 'redux';
import logger from 'redux-logger';

const middleware = [thunk, logger];
const middlewares = compose(
   applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
);

export default middlewares;
