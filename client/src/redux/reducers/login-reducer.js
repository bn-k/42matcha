import {LOGIN, LOGIN_FAIL, LOGOUT} from "../action/types-action";

const initial = () => {
};

export function loginReducer (state = initial, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...action,
                loggedIn: true,
                err: {status: false, message: ""}
            };
        case LOGIN_FAIL:
            return {
                loggedIn: false,
                err: action.err
            };
        case LOGOUT:
            return {
                loggedIn: false,
                err: {status: false, message: ""}
            };
        default:
            return state
    }
}
