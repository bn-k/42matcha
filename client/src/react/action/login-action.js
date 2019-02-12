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
                    res.json().then(json =>{
                        localStorage.setItem("token", json['token']);
                        console.log("login action: ",json);
                        dispatch({
                            type: LOGIN,
                            user: json,
                        });
                    })
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
