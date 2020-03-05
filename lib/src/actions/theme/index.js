import TYPES from '../types';

// == 主题颜色改变
export default {
    onThemeChange(theme) {
        return {
            type: TYPES.THEME_CHANGE,
            theme
        };
    }
};
