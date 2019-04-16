import {LOAD_MATCHS, LOAD_PEOPLE} from "../action/types-action";

const initial = () => {

};

export function matchsReducer (state = initial, action) {
    switch (action.type) {
        case LOAD_MATCHS:
            return (action.data);
        default:
            return state
    }
}
