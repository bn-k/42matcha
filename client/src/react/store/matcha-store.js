import thunk from 'redux-thunk';
import rootReducer from '../reducers/root-reducer';
import { createStore, applyMiddleware, compose} from 'redux';
import { sessionService } from 'redux-react-session';
const middleware = [thunk];

const storeMatcha = createStore(
    rootReducer,
    {},
    compose(
        applyMiddleware(...middleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

const validateSession = (session) => {
    // check if your session is still valid
    console.log('session: ', session);
    return true;
    return false;
};
const options = { refreshOnCheckAuth: true, redirectPath: '/home', driver: 'COOKIES', validateSession};

sessionService.initSessionService(storeMatcha, options)
    .then(() => console.log('Redux React Session is ready and a session was refreshed from your storage'))
    .catch(() => console.log('Redux React Session is ready and there is no session in your storage'));

export default storeMatcha;
