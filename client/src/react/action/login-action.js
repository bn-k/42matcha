import {LOGIN, LOGOUT} from './types-action';

export const loginAction = (formData, history) => dispatch => {
    fetch('/auth/login', {
        method: 'POST',
        body: formData,
        credentials: 'same-origin',
    })
        .then(res => {
                switch (res.status) {
                    case 401:
                        res.json().then(json =>{
                            console.log(json.err);
                        });
                        break;
                    case 200:
                        console.log("login action 200");
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
        .catch(error => console.log(error))
};

export const logoutAction = (history) => dispatch => {
    console.log('logoutAction');
    localStorage.removeItem('jwt');
    dispatch({
        type: LOGOUT,
    });
    history.push('/')
};
