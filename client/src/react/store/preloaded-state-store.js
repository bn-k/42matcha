const preloadedState = {
    login : {
        loggedIn: (!!localStorage.getItem('token')),
            token: localStorage.getItem('token'),
    },
};

export default preloadedState;