import DataStore from './DataStore';
import GitHubTrending from 'GitHubTrending';

export default class ExpandStore extends DataStore {
    // == 获取网络数据 - 趋势页面 html 文本解析
    fetchNetData(url) {
        console.log('%c === fetch url start ===', 'color: #0f0;');
        console.log(url);
        console.log('%c === fetch url end ===', 'color: #0f0;');
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

export const expandStore = new ExpandStore();
