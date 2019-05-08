import {ADD_MESSAGE, INCR_I, UPDATE_SUITOR} from "../action/types-action";

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
        case ADD_MESSAGE:
            return ({
                ...action,
                messages: action.messages,
            });
        default:
            return state
    }
}
