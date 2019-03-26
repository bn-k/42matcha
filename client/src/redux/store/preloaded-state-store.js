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
    if (!token) {
        return false
    } else if (token.exp < Date.now() / 1000) {
        return false
    }
    return true
};

export const registerData = {
    valid: false,
    fail: false,
    errs: [],
};

const preloadedState = {
    login : {
        loggedIn: stillLogged('jwt'),
        class: " is-hidden",
    },
    register: {

    },
};

export default preloadedState;