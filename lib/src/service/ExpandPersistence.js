import DataPersistence from './DataPersistence';

export default class ExpandPersistence extends DataPersistence {
    constructor(props) {
        // == 构造函数继承的话需要写 super(props)
        super(props);
        this.key = 'trending';
    }
}

// == 可以写为 static 静态方法，就不用 new 操作了
export const expandPersistence = new ExpandPersistence();
