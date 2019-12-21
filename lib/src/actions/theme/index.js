import TRPES from '../types';

// == 主题颜色改变
export default {
    onThemeChange(theme) {
        return {
            type: TRPES.THEME_CHANGE,
            theme
        };
    }
};
