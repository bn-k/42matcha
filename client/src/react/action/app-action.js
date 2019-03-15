import {START} from './types-action';

export const startAction = () => dispatch => {
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
                        console.log("Start failed");
                        break;
                    case 200:
                        res.json().then(json =>{
                            console.log(json);
                            dispatch({
                                type: START,
                                basic: json,
                            });
                        });
                }
            }
        )
        .catch(error => console.log(error))
};
