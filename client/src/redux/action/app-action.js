import {DISABLE_FIELD, ENABLE_FIELD, LOAD_USER, UPDATE_PROFILE} from "./types-action";

export const updateProfileAction = (prev, id, i) => dispatch => {
    dispatch({
        type: UPDATE_PROFILE,
        profileId: id,
        i: i,
    });
};
export const userModifyAction = (prev, formData) => dispatch => {
    fetch('/api/user/modify', {
        method: 'POST',
        body: formData,
        credentials: 'same-origin',
    })
        .then(res => {
                switch (res.status) {
                    case 201:
                        res.json().then(json =>{
                            console.log(json);
                            dispatch(json);
                        });
                        break;
                    case 200:
                        res.json().then(data =>{
                            dispatch({
                                ...prev,
                                type: LOAD_USER,
                                user: data[0].Properties,
                            });
                        });
                }
            }
        )
        .catch(error => console.log(error))
};

export const userAction = (prev) => dispatch => {
    let init = {
        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization': localStorage.getItem('jwt'),
        }
    };
    fetch('/api/user', init)
        .then(res => {
                switch (res.status) {
                    case 201:
                        res.json().then(json =>{
                            console.log(json.err);
                        });
                        break;
                    case 200:
                        res.json().then(data => {
                            dispatch({
                                ...prev,
                                type: LOAD_USER,
                                user: data.Properties,
                            });
                        });
                }
            }
        )
        .catch(error => console.log(error))
};

export const enableFieldAction = (prev, field) => dispatch => {
    dispatch({
        ...prev,
        type: ENABLE_FIELD,
        field: field,
    });
};

export const disableFieldAction = (prev) => dispatch => {
    dispatch({
        ...prev,
        type: DISABLE_FIELD,
    });
};

export const userChangeAction = () => dispatch => {
    let init = {
        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization': localStorage.getItem('jwt'),
        }
    };
    fetch('/api/user_change', init)
        .then(res => {
                switch (res.status) {
                    case 201:
                        res.json().then(json =>{
                            console.log(json.err);
                        });
                        break;
                    case 200:
                        res.json().then(data => {
                            dispatch({
                                type: LOAD_USER,
                                user: data,
                            });
                        });
                }
            }
        )
        .catch(error => console.log(error))
};
