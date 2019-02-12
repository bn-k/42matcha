import {LOGIN, LOGOUT} from "../action/types-action";

const initial = {
    user: {
        biography: "",
        birthday: "0001-01-01T00:00:00Z",
        birthday_tmp: "2019-02-11T08:10:32.94Z",
        city: "",
        country: "o",
        created_at: "0001-01-01T00:00:00Z",
        created_at_tmp: "2019-02-11T15:10:26.616Z",
        e_mail: "",
        first_name: "",
        genre: "",
        geo_allowed: false,
        id: 0,
        images: (5) ["", "", "", "", ""],
        interest: "",
        last_name: "",
        latitude: 0,
        longitude: 0,
        online: false,
        password: "",
        random_token: "",
        rating: 0,
        type: "",
        username: "",
        zip: "",
    },
    loggedIn: null,
    token: null
};

export function loginReducer (state = initial, action) {
    switch (action.type) {
        case LOGIN:
            return {
                loggedIn: true,
                token: action.token,
                user: action.user,
            };
        case LOGOUT:
            return {
                loggedIn: false,
                token: "",
            };
    }
    return state;
}
