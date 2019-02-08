import {combineReducers} from "redux";
import { sessionReducer } from 'redux-react-session';
import {loginReducer} from './login-reducer';

export default combineReducers({
    login: loginReducer,
    session: sessionReducer,
});
