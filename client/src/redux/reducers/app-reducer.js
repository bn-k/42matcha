import {NAVBAR_HEIGHT} from "../action/types-action";

const initial = () => {
};

export function appReducer (state = initial, action) {
    switch (action.type) {
        case NAVBAR_HEIGHT:
            let ret = action.previous;
            ret.css.navbar.height = action.height;
            ret.css.windowHeight = action.windowHeight;
            return ret;
        default:
            return state
    }
}
