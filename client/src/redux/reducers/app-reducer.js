import {UPDATE_PROFILE} from "../action/types-action";

const initial = () => {
};

export function appReducer (state = initial, action) {
    switch (action.type) {
        case UPDATE_PROFILE:
            return {
                ...action,
            };
        default:
            return state
    }
}
