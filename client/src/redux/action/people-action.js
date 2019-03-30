import {LOAD_PEOPLE} from './types-action';

export const getPeopleAction = () => dispatch => {
    let init = {
        method: 'GET',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization': localStorage.getItem('jwt'),
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
                            });
                        });
                }
            }
        )
        .catch(error => console.log(error))
};
