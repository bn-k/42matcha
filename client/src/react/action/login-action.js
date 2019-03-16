import {LOGIN, LOGIN_FAIL, LOGOUT} from './types-action';

export const loginAction = (formData, history) => dispatch => {
    fetch('/auth/login', {
        method: 'POST',
        body: formData,
        credentials: 'same-origin'
    })
        .then(res => {
                switch (res.status) {
                    case 401:
                        res.json().then(json =>{
                            dispatch({
                                type: LOGIN_FAIL,
                                class: " is-danger",
                                err: json.err
                            });
                            setTimeout(() => {
                                dispatch({
                                    type: LOGIN_FAIL,
                                    class: " is-hidden"
                                });}, 3000);
                           console.log(json.err);
                        });
                        break;
                    case 200:
                        res.json().then(json =>{
                            localStorage.setItem("jwt", json);
                            dispatch({
                                type: LOGIN,
                            });
                            history.push('/');
                        });
                }
            }
        )
        .catch(err => { console.log(err.status)})
};

export const logoutAction = (history) => dispatch => {
    localStorage.removeItem('jwt');
    dispatch({
        type: LOGOUT,
    });
    history.push('/')
};
