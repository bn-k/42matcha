import {LOAD} from "../action/types-action";

const initial = () => {

};

export function peopleReducer (state = initial, action) {
    switch (action.type) {
        case LOAD:
            return action.json;
        default:
            return state
    }
}
