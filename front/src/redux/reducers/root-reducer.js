import {combineReducers} from "redux";
import {loginReducer} from './login-reducer';
import {registerReducer} from "./register-reducer";
import {peopleReducer} from "./people-reducer";
import {appReducer} from "./app-reducer";
import {messengerReducer} from "./messenger-reducer";
import {matchsReducer} from "./matchs-reducer";
import {LOGOUT} from "../action/types-action";
import preloadedState from "../store/preloaded-state-store";

const allReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    people: peopleReducer,
    app: appReducer,
    messenger: messengerReducer,
    matchs: matchsReducer,
});

export const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
        state = preloadedState
    }
    return allReducer(state, action)
};
