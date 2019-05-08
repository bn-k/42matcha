import {REGISTER} from './types-action';
import env from "../../env";

export const registerAction = (formData, history) => dispatch => {
    fetch(env.auth + '/register', {
        method: 'POST',
        body: formData,
        credentials: 'same-origin',
    })
        .then(res => {
                switch (res.status) {
                    case 201:
                        res.json().then(json =>{
                            console.log(json);
                            dispatch(json);
                        });
                        break;
                    case 200:
                        res.json().then(json =>{
                            console.log(json);
                            dispatch({
                                type: REGISTER,
                                data : json,
                            });
                            history.push('/');
                        });
                        break;
                    default:
                        break;
                }
            }
        )
        .catch(error => console.log(error))
};
