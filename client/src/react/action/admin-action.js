import {LOAD} from './types-action';
import storeMatcha from "../store/matcha-store";

export const loadUsers = (json) => dispatch => {
    var Init = { method: 'GET',
        username: json.username,
        password: json.password,
    };

    fetch('/admin/users', Init)
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
                        storeMatcha.dispatch(push('asdfasdf'));
                    })
            }
        }
    )
};

