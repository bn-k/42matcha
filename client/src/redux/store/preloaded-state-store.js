import JwtDecode from 'jwt-decode'
import _ from 'lodash'

const parseToken = (file) => {
    if (!localStorage.getItem(file) || !localStorage.getItem(file) === undefined) {
        localStorage.removeItem(file);
        return null
    } else {
        console.log("Token parse: ", file, JwtDecode(localStorage.getItem(file)));
        return JwtDecode(localStorage.getItem(file))
    }
};

const stillLogged = (file) => {
    const token = parseToken(file);
    if (!token) {
        return false
    } else if (token.exp < Date.now() / 1000) {
        localStorage.removeItem(file);
        return false
    }
    return true
};

export const registerPreloaded = {
    valid: false,
    fail: false,
    username: {
        status: true,
        message: ""
    },
    email: {
        status: true,
        message: ''
    },
    password: {
        status: true,
        message: ''
    },
    confirm: {
        status: true,
        message: ''
    },
    lastname: {
        status: true,
        message: ''
    },
    firstname: {
        status: true,
        message: ''
    },
    birthday: {
        status: true,
        message: ''
    },
    other: {
        status: true,
        message: ''
    },
    type: ''
};

export const homePreloaded = {
};

export const peoplePreloaded = {
    filters: {
        age: [16, 120],
        score : [0, 100],
        location: [0 , 20000],
        tags: [],
    },
    isLoading: true,
    done: false,
    data: []
};

const user = () => {
    if (localStorage.getItem('jwt') !== undefined) {
        const parsed =  JwtDecode(localStorage.getItem('jwt'));
        return parsed;
    }
};
export const loginPreloaded = {
    ...parseToken('jwt'),
    loggedIn: stillLogged('jwt'),
    err: {status: false, message: ""},
};

export const appPreloaded = {
    profileId: 0,
    field: null,
    user: {
        access_lvl: 1,
        biography: null,
        birthday: null,
        city: null,
        country: null,
        email: null,
        firstname: null,
        genre: null,
        geo_allowed: null,
        img1: null,
        img2:null,
        img3:null,
        img4:null,
        img5:null,
        interest:null,
        lastname:null,
        latitude:null,
        longitude:null,
        name:null,
        online:null,
        rating: null,
        username: null,
        zip: null
    }
};

export const wsApi = "ws://localhost:81/api/ws/";
export const wsUrl = wsApi + loginPreloaded.id + "/" + loginPreloaded.id;
export const messengerPreloaded = {
    suitorId: -1,
    url : wsUrl,
    ws : new WebSocket(wsUrl),
    i: 0,
    messages: [],
};

const preloadedState = {
    login : loginPreloaded,
    register: registerPreloaded,
    home: homePreloaded,
    people: _.merge({}, peoplePreloaded),
    app: appPreloaded,
    messenger: messengerPreloaded,
    matchs: [
        {
            NodeIdentity: -1,
            Labels: [
                'User'
            ],
            Properties: {
                access_lvl: 0,
                biography: '',
                birthday: '',
                city: '',
                country: '',
                email: '',
                firstname: '',
                genre: '',
                geo_allowed: false,
                img1: '',
                img2: '',
                img3: '',
                img4: '',
                img5: '',
                interest: '',
                lastname: '',
                latitude: 0,
                longitude: 0,
                name: '',
                online: true,
                rating: 0,
                username: '',
                zip: ''
            }
        },
    ],
};

export default preloadedState;