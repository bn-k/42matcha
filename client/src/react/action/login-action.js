import {LOGIN, GET_USER} from './types-action';

export const loginAction = (formData) => dispatch => {
    fetch('/auth/login', {
        method: 'POST',
        body: formData,
    }).then(res => res.json()
    ).then(login => {
        dispatch({
            type: LOGIN,
            token: login['token'],
            expire : login['expire'],
        });
        localStorage.setItem("token", login['token']);
    });
};

export const getUserAction = (formData) => dispatch => {
};
