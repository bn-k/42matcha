import {LOAD_MATCHS, LOAD_PEOPLE} from './types-action';

export const getMatchsAction = () => dispatch => {
    let init = {
        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization': localStorage.getItem('jwt'),
        }
    };
    fetch('/api/get_matchs', init)
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
                                type: LOAD_MATCHS,
                                data: data,
                            });
                        });
                }
            }
        )
        .catch(error => console.log(error))
};
