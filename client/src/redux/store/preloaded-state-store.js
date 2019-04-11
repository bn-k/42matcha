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

export const loginPreloaded = {
    loggedIn: stillLogged('jwt'),
    err: {status: false, message: ""}
};

export const appPreloaded = {
    css : {
        navbar: {
            height: 0,
        },
        windowHeight: 0,
    },
};

const preloadedState = {
    login : loginPreloaded,
    register: registerPreloaded,
    home: homePreloaded,
    people: _.merge({}, peoplePreloaded),
    app: appPreloaded,
};

export default preloadedState;