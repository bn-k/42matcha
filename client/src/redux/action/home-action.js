import {LOAD} from './types-action';
import env from "../../env";

export const homeAction = () => dispatch => {
    let init = {
        method: 'GET',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization': localStorage.getItem('jwt'),
        }
    };
    fetch(env.api + '/start', init)
        .then(res => {
                switch (res.status) {
                    case 202:
                        localStorage.removeItem('jwt');
                        res.json().then(json =>{
                            console.log(json.err);
                        });
                        break;
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