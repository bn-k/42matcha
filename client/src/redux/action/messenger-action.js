import {LOAD_HISTORY_MESSENGER, UPDATE_SUITOR} from "./types-action";
import {wsApi} from "../store/preloaded-state-store";

const join = (a, b) => {
    const ret =  (a <= b ? a + '/' + b : b + '/' + a);
    console.log(wsApi + ret);
    return (ret)
};
export const updateSuitorAction = (prevState, suitorId, userId) => dispatch => {
    prevState.ws.close();
    dispatch({
        ws: new WebSocket(wsApi + join(userId, suitorId)),
        type: UPDATE_SUITOR,
        suitorId: suitorId,
    });
};
