import {combineReducers} from "redux";
import {loginReducer} from './login-reducer';
import {adminReducer} from "./admin-reducer";
import {appReducer} from "./app-reducer";

export default combineReducers({
    app: appReducer,
    login: loginReducer,
    users: adminReducer,
});
