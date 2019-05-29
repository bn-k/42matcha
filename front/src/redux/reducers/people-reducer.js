import {
    block,
    dislike,
    like,
    LOAD_PEOPLE,
    NO_PEOPLE,
    SORT_AGE,
    SORT_LOCALISATION, SORT_SCORE, SORT_TAGS,
    UPDATE_FILTERS
} from "../action/types-action";
import {compareAge, compareLocalistation, compareScore, compareTags} from "../../react/modules/utils";

const initial = () => {

};

export function peopleReducer (state = initial, action) {
    const user = action.user;
    switch (action.type) {
        case like:
            return ({
                ...action,
            });
        case dislike:
            return ({
                ...action,
            });
        case block:
            return ({
                ...action,
            });
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
        case SORT_LOCALISATION:
            return ({
                ...action,
                data: action.data.slice().sort(compareLocalistation(action.user))
            });
        case SORT_SCORE:
            return ({
                ...action,
                data: action.data.slice().sort(compareScore),
            });
        case SORT_TAGS:
            return ({
                ...action,
                data: action.data.slice().sort(compareTags(action.user)),
            });
        case SORT_AGE:
            return ({
                ...action,
                data: action.data.slice().sort(compareAge),
            });
        default:
            return state
    }
}
