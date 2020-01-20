// == 引入数据持久层
import { dataPersistence } from '../service/DataPersistence';
import { expandPersistence } from '../service/ExpandPersistence';

export default class FavoriteUtil {
    static onFavorite(nowModule, isFavorite, key, value) {
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
            persistence.saveItem(key, value);
        } else {
            // == 取消收藏
            persistence.removeItem(key);
        }
    }
}
