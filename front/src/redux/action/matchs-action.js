import {LOAD_MATCHS, NO_MATCH} from './types-action';
import {updateSuitorAction} from "./messenger-action";
import env from "../../env";

export const getMatchsAction = (messenger, userId) => dispatch => {
    let init = {
        method: 'GET',
        headers:{
            'Authorization': localStorage.getItem('jwt'),
        }
    };
    fetch(env.api + '/matchs', init)
        .then(res => {
                switch (res.status) {
                    case 202:
                        localStorage.removeItem('jwt');
                        res.json().then(json =>{
                        });
                        break;
                    case 201:
                        res.json().then(json => {
                            if (env.debug) {
                                console.log(json);
                            }
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
                        break;
                    default:
                        break
                }
            }
        )
};
