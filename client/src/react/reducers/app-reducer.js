import {REGISTER} from "../action/types-action";

const initial = () => {

};

export function appReducer (state = initial, action) {
    switch (action.type) {
        case REGISTER:
            return {
                loggedIn: false,
                token: "",
            };
        default:
            return state
    }
    return state;
}
