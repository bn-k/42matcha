import {LOAD_MATCHS, LOAD_PEOPLE} from './types-action';
import {updateSuitorAction} from "./messenger-action";
import env from "../../env";

export const getMatchsAction = (messenger, userId) => dispatch => {
    let init = {
        method: 'GET',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization': localStorage.getItem('jwt'),
        }
    };
    fetch(env.api + '/matchs', init)
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
                            dispatch({
                                type: LOAD_MATCHS,
                                data: data,
                            });
                            dispatch(updateSuitorAction(messenger, data[0].NodeIdentity, userId));
                        });
                }
            }
        )
        .catch(error => console.log(error))
};
