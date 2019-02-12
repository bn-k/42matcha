import {LOGIN, LOGOUT} from "../action/types-action";

const initial = () => {

};

export function loginReducer (state = initial, action) {
    switch (action.type) {
        case LOGIN:
            return {
                loggedIn: true,
                data: {
                    user: action.user
                },
            };
        case LOGOUT:
            return {
                loggedIn: false,
                token: "",
            };
        default:
            return state
    }
    return state;
}
