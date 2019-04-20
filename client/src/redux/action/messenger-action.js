import {ADD_MESSAGE, INCR_I, UPDATE_SUITOR} from "./types-action";
import {wsApi} from "../store/preloaded-state-store";

const join = (a, b) => {
    const ret =  (a <= b ? a + '/' + b : b + '/' + a);
    console.log(wsApi + ret);
    return (ret)
};

export const updateSuitorAction = (prevState, suitorId, userId) => dispatch => {
    let init = {
        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization': localStorage.getItem('jwt'),
            'User-Id' : userId,
            'Suitor-Id' : suitorId,
        }
    };
    fetch('/api/get_messages', init)
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
                            console.log("data: ", data);
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
                }
            }
        )
        .catch(error => console.log(error))
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
