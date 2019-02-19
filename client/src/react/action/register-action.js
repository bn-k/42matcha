import {REGISTER, REGISTER_FAIL} from './types-action';

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
                                err: json.err,
                            });
                            console.log(json.err);
                        });
                        break;
                    case 200:
                        res.json().then(json =>{
                            localStorage.setItem("token", json['token']);
                            dispatch({
                                type: REGISTER,
                                user: json,
                            });
                            console.log("redirectHome");
                            history.push('/');
                        });
                }
            }
        )
        .catch(error => console.log(error))
};
