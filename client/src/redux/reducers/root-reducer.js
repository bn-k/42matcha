import {combineReducers} from "redux";
import {loginReducer} from './login-reducer';
import {appReducer} from "./app-reducer";

export default combineReducers({
    app: appReducer,
    login: loginReducer,
});
