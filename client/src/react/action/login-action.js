import {LOGIN, LOGOUT} from './types-action';
import {loadUsers} from "./admin-action";
import storeMatcha from '../store/matcha-store'

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
                    res.json().then(json =>{
                        localStorage.setItem("token", json['token']);
                        dispatch({
                            type: LOGIN,
                            user: json,
                        });
                        if (json.admin) {
                            console.log("loginAction => loginAction: ",json);
                            storeMatcha.dispatch(loadUsers(json));
                        }
                    });
            }
        }
    )
};

export const logoutAction = () => dispatch => {
    console.log('logoutAction');
    localStorage.removeItem('token');
    dispatch({
        type: LOGOUT,
    });
};
