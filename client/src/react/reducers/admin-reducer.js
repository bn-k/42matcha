import {LOAD} from "../action/types-action";

const initial = {
    users: []
};

export function adminReducer (state = initial, action) {
    switch (action.type) {
        case LOAD:
            console.log("adminReducer: ", action);
            return {
                users: action.users,
            };
    default:
     return state
    }
}
