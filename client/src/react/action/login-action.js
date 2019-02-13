import {LOGIN, LOGOUT} from './types-action';

export const loginAction = (formData, history) => dispatch => {
    fetch('/auth/login', {
        method: 'POST',
        body: formData,
        credentials: 'same-origin',
    })
        .then(function (response) {
            if (!response.ok) {
                throw Error("Horror");
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
                            console.log("redirectHome");
                            history.push('/home');
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
