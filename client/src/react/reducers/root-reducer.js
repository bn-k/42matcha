import {combineReducers} from "redux";
import {loginReducer} from './login-reducer';
import { connectRouter } from 'connected-react-router';

export default combineReducers({
    login: loginReducer,
    router: connectRouter(history),
});
