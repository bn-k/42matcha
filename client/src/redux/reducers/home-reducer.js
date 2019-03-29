import {LOAD} from "../action/types-action";

const initial = () => {

};

export function homeReducer (state = initial, action) {
    switch (action.type) {
        case LOAD:
            return action.json;
        default:
            return state
    }
}
