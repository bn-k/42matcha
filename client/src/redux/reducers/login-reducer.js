import {LOGIN, LOGIN_FAIL, LOGIN_RESET, LOGOUT} from "../action/types-action";

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
                class: " is-danger",
                err: action.err
            };
        case LOGIN_RESET:
            return {
                loggedIn: false,
                class: " is-hidden",
                err: ""
            };
        case LOGOUT:
            return {
                loggedIn: false,
            };
        default:
            return state
    }
}
