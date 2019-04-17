import {INCR_I, LOAD_HISTORY_MESSENGER, UPDATE_SUITOR} from "../action/types-action";

const initial = () => {
};

export function messengerReducer (state = initial, action) {
    switch (action.type) {
        case UPDATE_SUITOR:
            return ({
                ...action,
                suitorId: action.suitorId,
                type: null,
            });
        case INCR_I:
            return ({
                ...action,
                i: action.i,
            });
        default:
            return state
    }
}
