import {REGISTER, REGISTER_FAIL, RESET} from "../action/types-action";

const initial = () => {

};

export function appReducer (state = initial, action) {
    switch (action.type) {
        case REGISTER:
            return {
                register : action
            };
        case REGISTER_FAIL:
            return {
                register : action
            };
        case RESET:
            return {
                register : action
            };
        default:
            return state
    }
}
