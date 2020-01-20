// == 引入数据持久层
import { dataPersistence } from '../service/DataPersistence';

export default class FavoriteUtil {
    static onFavorite(isFavorite, key, value) {
        if (isFavorite) {
            // == 添加收藏
            dataPersistence.saveItem(key, value);
        } else {
            // == 取消收藏
            dataPersistence.removeItem(key);
        }
    }
}
