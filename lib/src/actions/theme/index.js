import TYPES from '../types';
import ThemeStore from '../../service/Theme/index';

export default {
    // == 主题改变
    onThemeChange(theme) {
        return {
            type: TYPES.THEME_CHANGE,
            theme
        };
    },
    // == 初始化主题
    onThemeInit() {
        return dispatch => {
            new ThemeStore().getTheme()
            .then((data) => {
                dispatch(onThemeChange(data))
            })
        };
    },
    // == 显示/隐藏自定义主题浮层
    onShowCustomThemeView(show) {
        return {
            type: TYPES.SHOW_THEME_VIEW,
            customThemeViewVisible: show
        };
    }
};
