import {LOGIN, LOGOUT} from './types-action';
import {loadUsers} from "./admin-action";
import storeMatcha from '../store/matcha-store'

export const loginAction = (formData, history) => dispatch => {
    fetch('/auth/login', {
        method: 'POST',
        body: formData,
        credentials: 'same-origin',
    })
        .then(function (response) {
            if (!response.ok) {
                throw Error("erooooor");
            }
            return response;
        })
        .then(res => {
            switch (res.status) {
                case 401:
                    console.log("Non Authorized");
                    break;
                case 200:
                    res.json().then(json =>{
                        localStorage.setItem("token", json['token']);
                        dispatch({
                            type: LOGIN,
                            user: json,
                        });
                        if (json.admin) {
                            console.log("loginAction => loginAction: ",json);
                            storeMatcha.dispatch(loadUsers(json, history));
                        } else {
                            console.log("redirectHome");
                            history.push('/home');
                        }
                    });
            }
        }
    )
        .catch(error => console.log(error))
};

export const logoutAction = () => dispatch => {
    console.log('logoutAction');
    localStorage.removeItem('token');
    dispatch({
        type: LOGOUT,
    });
};
