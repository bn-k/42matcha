import {REGISTER, REGISTER_FAIL} from "../action/types-action";
import {registerPreloaded} from "../store/preloaded-state-store";

const initial = () => {

};

export function registerReducer (state = initial, action) {
    switch (action.type) {
        case REGISTER:
            return registerPreloaded;
        case REGISTER_FAIL:
            return action;
        default:
            return state
    }
}
