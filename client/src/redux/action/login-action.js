import {LOGIN, LOGIN_FAIL, LOGOUT, LOGIN_RESET} from './types-action';

export const loginAction = (formData, history) => dispatch => {
    fetch('/auth/login', {
        method: 'POST',
        body: formData,
        credentials: 'same-origin'
    })
        .then(res => {
                switch (res.status) {
                    case 201:
                        res.json().then(json =>{
                            dispatch({
                                type: LOGIN_FAIL,
                                err: {status: true, message: json.err}
                            });
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
