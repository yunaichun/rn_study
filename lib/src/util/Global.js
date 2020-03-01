import { Dimensions } from "react-native";

const THEME_COLOR = '#678';
const TRENDING_URL = 'https://github.com/';
const { height, width } = Dimensions.get('window');
const LINE_STYLE = {
    height: 0.5,
    opacity: 0.5,
    backgroundColor: 'darkgray',
}

export {
    THEME_COLOR,
    TRENDING_URL,
    LINE_STYLE,
    height,
    width,
};
