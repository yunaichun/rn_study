import { Dimensions } from "react-native";

const THEME_COLOR = '#678';
const BACKGROUND_COLOR = '#f3f3f4';
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const NAV_BAR_HEIGHT_IOS = 44;
const NAV_BAR_HEIGHT_ANDROID = 50;
const TRENDING_URL = 'https://github.com/';
const LINE_STYLE = {
    height: 0.5,
    opacity: 0.5,
    backgroundColor: 'darkgray',
}

export {
    THEME_COLOR,
    BACKGROUND_COLOR,
    WINDOW_WIDTH,
    WINDOW_HEIGHT,
    NAV_BAR_HEIGHT_IOS,
    NAV_BAR_HEIGHT_ANDROID,
    TRENDING_URL,
    LINE_STYLE,
};
