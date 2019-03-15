import {LOGIN, LOGIN_FAIL, LOGOUT} from "../action/types-action";

const initial = () => {

};

export function loginReducer (state = initial, action) {
    switch (action.type) {
        case LOGIN:
            return {
                loggedIn: true,
            };
        case LOGIN_FAIL:
            return {
                loggedIn: false,
                class: action.class,
                err: action.err
            };
        case LOGOUT:
            return {
                loggedIn: false,
            };
        default:
            return state
    }
}
