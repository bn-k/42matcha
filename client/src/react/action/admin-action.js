import {LOAD} from './types-action';

export const loadUsers = (id) => dispatch => {
    fetch('/admin/users', {
        method: 'POST',
        body: {
            "username" : id.username,
            "password" : id.password
        },
    }).then(res => {
            switch (res.status) {
                case 401:
                    console.log("Non Authorized");
                    break;
                case 200:
                    res.json().then(json =>{
                        dispatch({
                            type: LOAD,
                            users: json,
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
