import {LOGIN} from "../action/types-action";

const initialState = {
    token: "",
    expire: "",
};

export function loginReducer (state = initialState, action) {
    if (action.type === LOGIN) {
        console.log('if resolved: ');
        return {
            ...state,
            token: action.token,
        }
    } else {
        return state
    }
}
