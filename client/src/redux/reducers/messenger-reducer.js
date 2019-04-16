import {LOAD_HISTORY_MESSENGER, UPDATE_SUITOR} from "../action/types-action";

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
        default:
            return state
    }
}
