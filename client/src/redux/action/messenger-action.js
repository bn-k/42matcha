import {ADD_MESSAGE, INCR_I, UPDATE_SUITOR} from "./types-action";
import {wsApi} from "../store/preloaded-state-store";
import env from "../../env";

const join = (a, b) => {
    const ret =  (a <= b ? a + '/' + b : b + '/' + a);
    return (ret)
};

export const updateSuitorAction = (prevState, suitorId, userId) => dispatch => {
    let init = {
        method: 'GET',
        headers:{
            'Authorization': localStorage.getItem('jwt'),
            'User-Id' : userId,
            'Suitor-Id' : suitorId,
        }
    };
    fetch(env.api + '/messages', init)
        .then(res => {
                switch (res.status) {
                    case 202:
                        localStorage.removeItem('jwt');
                        res.json().then(json =>{
                            console.log(json.err);
                        });
                        break;
                    case 201:
                        res.json().then(json =>{
                            console.log(json.err);
                        });
                        break;
                    case 200:
                        res.json().then(data => {
                            const newUrl = wsApi + join(userId, suitorId);
                            prevState.ws.close();
                            dispatch({
                                ...prevState,
                                ws: new WebSocket(newUrl),
                                url: newUrl,
                                type: UPDATE_SUITOR,
                                suitorId: suitorId,
                                messages: data,
                                i: data.length,
                            });
                        });
                        break;
                    default:
                        break;
                }
            }
        )
};

export const incrementMessageAction = (prevState) => dispatch => {
    dispatch({
        ...prevState,
        type: INCR_I,
        i: prevState.i + 1,
    });
};
export const addMessageAction = (prevState, newMessage) => dispatch => {
    dispatch({
        ...prevState,
        type: ADD_MESSAGE ,
        messages: [
            ...prevState.messages,
            newMessage,
        ]
    });
};
