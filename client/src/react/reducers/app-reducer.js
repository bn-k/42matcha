import {REGISTER, REGISTER_FAIL} from "../action/types-action";

const initial = () => {

};

export function appReducer (state = initial, action) {
    switch (action.type) {
        case REGISTER:
            return {
                register: {
                    success: true,
                    fail: false,
                    err: ""
                }
            };
        case REGISTER_FAIL:
            return {
                register : {
                    success: false,
                    fail: true,
                    err: action.err
                }
            };
        default:
            return state
    }
    return state;
}
