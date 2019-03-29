import {REGISTER, REGISTER_FAIL} from './types-action';
import {registerData} from "../store/preloaded-state-store";

export const registerAction = (formData, history) => dispatch => {
    fetch('/auth/register', {
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
                }
            }
        )
        .catch(error => console.log(error))
};
