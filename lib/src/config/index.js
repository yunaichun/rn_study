import servicePathDEV from './dev';
import servicePathPRD from './prd';

let configMap = {
    'development': servicePathDEV,
    'production': servicePathPRD,
};

process.env.NODE_ENV = 'development';
console.log(`current environment is ${process.env.NODE_ENV}`);

export default configMap[process.env.NODE_ENV];
