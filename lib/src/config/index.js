import dev from './dev';
import prd from './prd';

let configMap = {
    'development': dev,
    'production': prd,
};

process.env.NODE_ENV = 'development';
console.log(`current environment is ${process.env.NODE_ENV}`);

export default configMap[process.env.NODE_ENV];
