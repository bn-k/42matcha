import {LOGIN, LOGOUT} from './types-action';

export const loginAction = (formData) => dispatch => {
    fetch('/auth/login', {
        method: 'POST',
        body: formData,
    }).then(res => {
        switch (res.status) {
            case 401:
                console.log("Non Authorized");
               break;
            case 200:
                res.json().then(login =>{
                        localStorage.setItem("token", login['token']);
                        dispatch({
                            type: LOGIN,
                            token: login['token'],
                            expire : login['expire'],
                        });
                })
        }
        }
    )
};

export const logoutAction = () => dispatch => {
    console.log('logoutAction');
    localStorage.setItem("token", "");
    dispatch({
        type: LOGOUT,
    });
};
