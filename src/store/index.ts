import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger';
import rootReducers from './reducers';
// 日志
const logger = createLogger();

export interface Action {
    type: string;
    [propName: string]: any
}

const createStoreFn = (initial_state?: object) => {
    if (process.env.NODE_ENV == 'development') {
        // 创建store
        return createStore(
            rootReducers,
            initial_state,
            applyMiddleware(logger)
        );
    } else {
        return createStore(
            rootReducers,
            initial_state
        );
    }
};

export default createStoreFn as any;
