import JwtDecode from 'jwt-decode'

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

export const filterPreloaded = {
    isLoading: true,
    done: false,
    settings: [

    ],
    data: [
        {
            NodeIdentity: 0,
            Labels: [
                'User'
            ],
            Properties: {
                biography: '',
                birthday: '0000-00-00T00:00:00Z',
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
                online: false,
                password: '',
                random_token: '',
                rating: 0,
                username: '',
                zip: ''
            }
        },
    ],
};

export const peoplePreloaded = {
    isLoading: true,
    done: false,
    data: [
        {
            NodeIdentity: 0,
            Labels: [
                'User'
            ],
            Properties: {
                biography: '',
                birthday: '0000-00-00T00:00:00Z',
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
                online: false,
                password: '',
                random_token: '',
                rating: 0,
                username: '',
                zip: ''
            }
        },
    ],
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
    people: peoplePreloaded,
    app: appPreloaded,
};

export default preloadedState;