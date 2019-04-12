import {LOAD_HISTORY_MESSENGER} from "./types-action";

export const loadHistoryMessengerAction = () => dispatch => {
    let init = {
        method: 'GET',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization': localStorage.getItem('jwt'),
        }
    };
    fetch('/api/start', init)
        .then(res => {
                switch (res.status) {
                    case 401:
                        res.json().then(json =>{
                            console.log(json.err);
                        });
                        break;
                    case 200:
                        res.json().then(json =>{
                            dispatch({
                                type: LOAD_HISTORY_MESSENGER,
                                messages: json,
                            });
                        });
                }
            }
        )
        .catch(error => console.log(error))
};