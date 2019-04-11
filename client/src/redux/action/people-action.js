import {LOAD_PEOPLE} from './types-action';

export const getPeopleAction = (filters) => dispatch => {

    let init = {
        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization': localStorage.getItem('jwt'),
            'Filters': JSON.stringify(filters),
        }
    };
    fetch('/api/get_people', init)
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
                                type: LOAD_PEOPLE,
                                data: data,
                                filters: filters,
                            });
                        });
                }
            }
        )
        .catch(error => console.log(error))
};
