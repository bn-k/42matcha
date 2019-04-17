import {INCR_I, UPDATE_SUITOR} from "./types-action";
import {wsApi} from "../store/preloaded-state-store";

const join = (a, b) => {
    const ret =  (a <= b ? a + '/' + b : b + '/' + a);
    console.log(wsApi + ret);
    return (ret)
};

export const updateSuitorAction = (prevState, suitorId, userId) => dispatch => {
    dispatch({
        ...prevState,
        ws: new WebSocket(wsApi + join(userId, suitorId)),
        type: UPDATE_SUITOR,
        suitorId: suitorId,
    });
};

export const incrementMessageAction = (prevState) => dispatch => {
    console.log("prev: ", prevState);
    dispatch({
        ...prevState,
        type: INCR_I,
        i: prevState.i + 1,
    });
};
