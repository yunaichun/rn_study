import FavoriteHotStore from './hot';

export default class FavoriteTrendingStore extends FavoriteHotStore {
    constructor(props) {
        // == 构造函数继承的话需要写 super(props)
        super(props);
        this.key = 'trending';
    }
}

// == 可以写为 static 静态方法，就不用 new 操作了
export const favoriteTrendingStore = new FavoriteTrendingStore();
