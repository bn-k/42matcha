import {DISABLE_FIELD, ENABLE_FIELD, LOAD_USER, UPDATE_PROFILE} from "./types-action";

export const updateProfileAction = (prev, id, i) => dispatch => {
    dispatch({
        type: UPDATE_PROFILE,
        profileId: id,
        i: i,
    });
};
export const userModifyAction = (prev, formData, name) => dispatch => {
    fetch('/api/user/' + name, {
        method: 'PUT',
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
                                user: data.user.Properties,
                                tagList: data.tagList,
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

export const getTagListAction = () => dispatch => {
};
