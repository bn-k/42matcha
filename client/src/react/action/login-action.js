import {LOGIN, LOGOUT} from './types-action';

export const loginAction = (formData) => dispatch => {
    fetch('/auth/login', {
        method: 'POST',
        body: formData,
    }).then(res => res.json()
    ).then(login => {
        localStorage.setItem("token", login['token']);
        dispatch({
            type: LOGIN,
            token: login['token'],
            expire : login['expire'],
        });
    });
};

export const logoutAction = () => dispatch => {
    console.log('logoutAction');
    localStorage.setItem("token", "");
    dispatch({
        type: LOGOUT,
    });
};
