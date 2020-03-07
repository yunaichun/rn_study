import TYPES from '../../actions/types';
import ThemeFactory, { ThemeFlags } from '../../util/ThemeFactory';

const initialState = {
    theme: ThemeFactory.createTheme(ThemeFlags.Default),
    // == 默认不展示主题弹窗
    onShowCustomThemeView: false,
};

export default function onAction(state = initialState, action) {
    switch (action.type) {
        case TYPES.THEME_CHANGE:
            return {
                ...state,
                theme: action.theme,
            };
        case TYPES.SHOW_THEME_VIEW:
            return {
                ...state,
                customThemeViewVisible: action.customThemeViewVisible,
            };
        default:
            return state;
    }
}
