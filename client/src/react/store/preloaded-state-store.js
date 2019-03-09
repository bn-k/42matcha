import JwtDecode from 'jwt-decode'

const parseToken = (file) => {
    if (!localStorage.getItem(file) || !localStorage.getItem(file) == undefined) {
        localStorage.removeItem(file);
        return null
    } else {
        console.log("Token parse: ", file, JwtDecode(localStorage.getItem(file)));
        return JwtDecode(localStorage.getItem(file))
    }
};

const stillLogged = (file) => {
    const token = parseToken(file);
    console.log("still Logged token:", token);
    if (!token) {
        console.log("still Logged token: return false");
        return false
    } else {
        if (token.exp < Date.now() / 1000) {
            return false
        }
    }
    return true
};

export const registerData = {
        valid: false,
        fail: false,
        type: '',
        errs : {
            user_alpha: {
                status: true,
                message: ''
            },
            user_len: {
                status: true,
                message: ''
            },
            user_exist: {
                status: true,
                message: ''
            },
            email_invalid: {
                status: true,
                message: ''
            },
            password_invalid: {
                status: true,
                message: ''
            },
            password_match: {
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
            }
        }
};

const preloadedState = {
    app: {
        register: {
            type: '',
            data: registerData,
        }
    },
    login : {
        loggedIn: stillLogged('token'),
        data: parseToken('token'),
    },
    users : [],
};

export default preloadedState;