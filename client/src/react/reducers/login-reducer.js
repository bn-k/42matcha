import {LOGIN, LOGOUT} from "../action/types-action";

const initial = () => {

};

export function loginReducer (state = initial, action) {
    switch (action.type) {
        case LOGIN:
            return {
                loggedIn: true,
            };
        case LOGOUT:
            return {
                loggedIn: false,
            };
        default:
            return state
    }
    return state;
}
