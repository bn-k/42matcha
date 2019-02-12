import {combineReducers} from "redux";
import {loginReducer} from './login-reducer';
import {adminReducer} from "./admin-reducer";

export default combineReducers({
    login: loginReducer,
    users: adminReducer,
});
