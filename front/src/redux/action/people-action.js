import {LOAD_PEOPLE, NO_PEOPLE, SORT, UPDATE_FILTERS} from './types-action';
import env from "../../env";

export const peopleAction = (prev, id, action) => dispatch => {
    let init = {
        method: 'PUT',
        body: {},
        headers:{
            'Authorization': localStorage.getItem('jwt'),
        }
    };
    fetch(env.api + '/people/' + id + "/" + action, init)
        .then(res => {
                switch (res.status) {
                    case 200:
                        res.json().then(json => {
                            dispatch({
                                ...prev,
                                type: action,
                            })
                        });
                        break;
                    case 201:
                        res.json().then(json =>{
                            if (env.debug) {
                                console.log(json);
                            }
                        });
                        break;
                    case 202:
                        res.json().then(json =>{
                        });
                        break;
                    default:
                        break;
                }
            }
        )
};

export const sortPeople = (people, type, user) => dispatch => {
    dispatch({
        ...people,
        type: type,
        user: user,
    })
};

export const getPeopleAction = (filters, param) => dispatch => {
    let init = {
        method: 'GET',
        headers:{
            'Authorization': localStorage.getItem('jwt'),
            'Filters': JSON.stringify(filters),
        }
    };
    fetch(env.api + '/people/' + param, init)
        .then(res => {
                switch (res.status) {
                    case 201:
                        res.json().then(json => {
                            if (env.debug) {
                                console.log(json);
                            }
                        });
                            dispatch({
                                type: NO_PEOPLE,
                                filters: filters,
                            });
                        break;
                    case 202:
                        localStorage.removeItem('jwt');
                        res.json().then(json =>{
                        });
                        break;
                    case 200:
                        res.json().then(data => {
                            dispatch({
                                type: LOAD_PEOPLE,
                                data: data,
                                filters: filters,
                            });
                        });
                        break;
                    default:
                        break;
                }
            }
        )
};

export const updateFiltersAction = (prev, filters) => dispatch => {
    dispatch({
        ...prev,
        type: UPDATE_FILTERS,
        filters: filters,
    });
};
