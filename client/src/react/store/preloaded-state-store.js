import JwtDecode from 'jwt-decode'

const parseToken = () => {
    if (!localStorage.getItem('token') || !localStorage.getItem('token') == undefined) {
        localStorage.removeItem('token');
        return null
    } else {
        console.log("Token parse: ", JwtDecode(localStorage.getItem('token')));
        return JwtDecode(localStorage.getItem('token'))
    }
};

const stillLogged = () => {
    const token = parseToken();
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
    login : {
        loggedIn: stillLogged(),
        data: parseToken(),
    }
};

export default preloadedState;