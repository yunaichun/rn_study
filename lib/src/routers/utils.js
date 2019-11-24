export default class NavigationUtil {
    /**
     * 返回上一页
     * @param {*} navigation 
     */
    static goBack(navigation) {
        navigation.goBack();
    }
    /**
     * 跳转到首页
     * @param {*} params 
     */
    static resetToHomePage(navigation) {
        navigation.navigate('HomePage');
    }
    /**
     * 跳转到指定页面
     * @param {*} page   要跳转的页面
     * @param {*} params 要传递的参数 
     */
    static goPage(page, params) {
        const navigation = NavigationUtil.navigation;
        if (!navigation) {
            console.log('NavigationUtil.navigation can not be null');
            return;
        }
        navigation.navigate(page, {...params});
    }
}
