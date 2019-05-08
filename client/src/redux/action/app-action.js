import {ADD_TAG, DISABLE_FIELD, ENABLE_FIELD, LOAD_USER, UPDATE_PROFILE} from "./types-action";
import axios from "axios";
import env from "../../env";

export const updateProfileAction = (prev, id, i) => dispatch => {
    dispatch({
        ...prev,
        type: UPDATE_PROFILE,
        profileId: id,
        i: i,
    });
};

const imgCase = (prev, body, name, dispatch) =>  {
    let data = new FormData;
    data.append('file', body.file);
    let init = {
        method: "POST",
        body: data,
        headers : {
            'Authorization': localStorage.getItem('jwt'),
        },
    };
    fetch(env.api + '/img/' + name, init)
        .then(res => {
                switch (res.status) {
                    case 201:
                        res.json().then(json =>{
                            console.log(json);
                        });
                        break;
                    case 200:
                        res.json().then(data =>{
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
};

export const userModifyAction = (prev, body, name) => dispatch => {
    console.log("USER MODIFY ACTION");
    if (Object.keys(body)[0] === 'file') {
        imgCase(prev, body, name, dispatch);
    } else {
        const jsonBody = JSON.stringify(body);
        let init = {
            method: 'PUT',
            headers: {
                'Authorization': localStorage.getItem('jwt'),
            },
            body: jsonBody,
        };
        fetch(env.api + '/user/' + name, init)
            .then(res => {
                console.log(res.statusText);
                    switch (res.status) {
                        case 201:
                            res.json().then(json =>{
                                console.log(json);
                            });
                            break;
                        case 200:
                            res.json().then(data =>{
                                dispatch({
                                    ...prev,
                                    type: LOAD_USER,
                                    user: data.user.Properties,
                                    tagList: data.tagList,
                                    userTags: data.userTags,
                                });
                            });
                    }
                }
            )
    }

};

export const addTagAction = (prev, newTag) => dispatch => {
    dispatch({
        ...prev,
        type: ADD_TAG,
        tagList: [...prev.tagList, newTag],
    });
};

export const userAction = (prev) => dispatch => {
    let init = {
        method: 'GET',
        headers:{
            'Authorization': localStorage.getItem('jwt'),
        }
    };
    fetch(env.api + '/user', init)
        .then(res => {
                switch (res.status) {
                    case 201:
                        break;
                    case 202:
                        break;
                    case 203:
                        break;
                    case 204:
                        break;
                    case 200:
                        res.json().then(data => {
                            dispatch({
                                ...prev,
                                type: LOAD_USER,
                                user: data.user.Properties,
                                tagList: data.tagList,
                                userTags: data.userTags,
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
