import {REGISTER, REGISTER_FAIL, RESET} from "../action/types-action";

const initial = () => {

};

export function registerReducer (state = initial, action) {
    console.log("app Reducer: action: ", action.type);
    switch (action.type) {
        case RESET:
            return {
                register : action
            };
        case REGISTER:
            return {
                register : action
            };
        case REGISTER_FAIL:
            return {
                register : action
            };
        default:
            return state
    }
}
