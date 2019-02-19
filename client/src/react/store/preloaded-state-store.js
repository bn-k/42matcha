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

const preloadedState = {
    app: {
        register: {
            success: false,
            fail: false,
            err: ""
        }
    },
    login : {
        loggedIn: stillLogged('token'),
        data: parseToken('token'),
    },
    users : [],
};

export default preloadedState;