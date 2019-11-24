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
}
