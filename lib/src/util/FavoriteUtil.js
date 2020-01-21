// == 引入数据持久层
import { dataPersistence } from '../service/DataPersistence';
import { expandPersistence } from '../service/ExpandPersistence';

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
        let persistence;
        if (nowModule === 'hot') {
            persistence = dataPersistence;
        } else {
            persistence = expandPersistence;
        }

        // == 收藏逻辑
        if (isFavorite) {
            // == 添加收藏
            persistence.saveItem(key, item);
        } else {
            // == 取消收藏
            persistence.removeItem(key);
        }
    }
}
