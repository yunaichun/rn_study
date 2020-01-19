import DataStore from './index';
import GitHubTrending from 'GitHubTrending';

export default class TrendingStore extends DataStore {
    // == 获取网络数据
    fetchNetData(url) {
        return new Promise((resolve, reject) => {
            new GitHubTrending()
            .fetchTrending(url)
            .then(data => {
                if (!data) throw new Error('response data is null');
                this.saveData(url, data);
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
        });
    }
}
