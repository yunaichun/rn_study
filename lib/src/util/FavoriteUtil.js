// == 引入数据持久层
import { favoriteHotStore } from '../service/Favorite/hot';
import { favoriteTrendingStore } from '../service/Favorite/trending';

export default class FavoriteUtil {
    /**
     * 添加/取消 收藏功能
     * @param {String} nowModule     hot/trending
     * @param {Boolean} isFavorite   代表添加/取消收藏
     * @param {String} key           hot - id.toString()  trending-fullName
     * @param {String} item          代表当前被 stringify 的 item 对象
     */
    static onFavorite(nowModule, isFavorite, key, item) {
        // == 哪个模块
        let store;
        if (nowModule === 'hot') {
            store = favoriteHotStore;
        } else {
            store = favoriteTrendingStore;
        }

        // == 收藏逻辑
        if (isFavorite) {
            // == 添加收藏
            store.saveItem(key, item);
        } else {
            // == 取消收藏
            store.removeItem(key);
        }
    }
}
