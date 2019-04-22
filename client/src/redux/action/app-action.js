import {UPDATE_PROFILE} from "./types-action";

export const updateProfileAction = (prev, id, i) => dispatch => {
    dispatch({
        type: UPDATE_PROFILE,
        profileId: id,
        i: i,
    });
};
