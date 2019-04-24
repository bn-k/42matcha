import {LOAD_PEOPLE, NO_PEOPLE, UPDATE_FILTERS} from "../action/types-action";

const initial = () => {

};

export function peopleReducer (state = initial, action) {
    switch (action.type) {
        case UPDATE_FILTERS:
            return ({
                ...action,
            });
        case NO_PEOPLE:
            return ({
                data: [],
                isLoading: false,
                filters: action.filters,
                done: false,
                err: action.err,
            });
        case LOAD_PEOPLE:
            return ({
                data: action.data,
                filters: action.filters,
                isLoading: false,
                done: true,
            });
        default:
            return state
    }
}
