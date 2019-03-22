import {REGISTER, REGISTER_FAIL, RESET} from './types-action';
import {registerData} from "../store/preloaded-state-store";

export const registerAction = (formData, history) => dispatch => {
    fetch('/auth/register', {
        method: 'POST',
        body: formData,
        credentials: 'same-origin',
    })
        .then(res => {
                switch (res.status) {
                    case 401:
                        res.json().then(json =>{
                            dispatch({
                                type: REGISTER_FAIL,
                                data : json
                            });
                        });
                        setTimeout(() => {
                            dispatch({
                                type: RESET,
                                data : registerData,
                            });}, 3000);
                        break;
                    case 200:
                        res.json().then(json =>{
                            dispatch({
                                type: REGISTER,
                                data : json,
                            });
                            console.log("redirectHome");
                            history.push('/');
                        });
                }
            }
        )
        .catch(error => console.log(error))
};
