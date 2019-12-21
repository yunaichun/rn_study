// == 日志打印中间件
const logMiddleware = (store) => (next) => (action)=> {
    console.log(`prev state`, store.getState());
    console.log(`dispatch action`, action);
    next(action);
    console.log(`current state`, store.getState());
}

export default logMiddleware;
