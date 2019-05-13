import {LOGIN, LOGIN_FAIL, LOGOUT} from './types-action';
import jwtDecode from 'jwt-decode';
import env from "../../env";

export const loginAction = (formData, history) => dispatch => {
    fetch(env.auth + '/login', {
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
                            const data = jwtDecode(json);
                            dispatch({
                                ...data,
                                type: LOGIN,
                            });
                            history.push('/');
                        });
                        break;
                    default:
                        break;
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
