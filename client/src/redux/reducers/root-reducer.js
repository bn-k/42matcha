import {combineReducers} from "redux";
import {loginReducer} from './login-reducer';
import {registerReducer} from "./register-reducer";
import {homeReducer} from "./home-reducer";
import {peopleReducer} from "./people-reducer";
import {appReducer} from "./app-reducer";

export default combineReducers({
    login: loginReducer,
    register: registerReducer,
    home: homeReducer,
    people: peopleReducer,
    app: appReducer,
});
