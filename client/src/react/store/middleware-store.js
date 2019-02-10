import thunk from 'redux-thunk';
import {applyMiddleware, compose} from 'redux';
import logger from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';
import {history} from "../modules/history-router.react";

const middleware = [thunk, logger,routerMiddleware(history)];
const middlewares = compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
);

export default middlewares;
