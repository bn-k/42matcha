import {LOAD} from './types-action';

export const loadUsers = (json, history) => dispatch => {
    console.log("loadUsers(admin-action)");
    let body = new FormData;
    body.append("username", json.username);
    body.append("password", json.password);
    fetch('/admin/users', {
        method: 'POST',
        body: body,
    })
        .then(res => {
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
                            console.log("redirectAdmin");
                            history.push('/admin');
                        })
                }
            }
        )
};

