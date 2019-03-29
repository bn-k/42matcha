import {LOAD} from './types-action';

export const homeAction = () => dispatch => {
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
                        console.log(res);
                        res.json().then(json =>{
                            dispatch({
                                type: HOME,
                                json: json,
                            });
                        });
                }
            }
        )
        .catch(error => console.log(error))
};
