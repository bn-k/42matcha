import {LOAD_MATCHS, NO_MATCH} from "../action/types-action";

const initial = () => {

};

export function matchsReducer (state = initial, action) {
    switch (action.type) {
        case LOAD_MATCHS:
            return (action.data);
        case NO_MATCH:
            return ({
                err: "Sorry, you have no match poor loser"
            });
        default:
            return state
    }
}
