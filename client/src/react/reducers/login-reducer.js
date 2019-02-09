import {LOGIN, LOGOUT} from "../action/types-action";

const initial = {
    loggedIn: null,
    token: null
};

export function loginReducer (state = initial, action) {
    switch (action.type) {
        case LOGIN:
            return {
                loggedIn: true,
                token: action.token,
            };
        case LOGOUT:
            return {
                loggedIn: false,
                token: "",
            };
    }
    return state;
}
