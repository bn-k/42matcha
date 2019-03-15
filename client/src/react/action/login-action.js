import {LOGIN, LOGOUT} from './types-action';

export const loginAction = (formData, history) => dispatch => {
    fetch('/auth/login', {
        method: 'POST',
        body: formData,
        credentials: 'same-origin'
    })
        .catch(err => {
            throw  Error(err)
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
};

export const logoutAction = (history) => dispatch => {
    localStorage.removeItem('jwt');
    dispatch({
        type: LOGOUT,
    });
    history.push('/')
};
