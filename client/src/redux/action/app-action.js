import {NAVBAR_HEIGHT} from "./types-action";

export const navbarCss = (previous, height, windowHeight) => dispatch => {
    dispatch({
        type: NAVBAR_HEIGHT,
        previous: previous,
        height: height,
        windowHeight: windowHeight,
    });
};
