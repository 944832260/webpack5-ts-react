import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';


// 引入reducer函数
import USER from './user';
import Power from './power';
import Company from './company';
import Version from './version';

// 合并reducer函数
const rootReducer = combineReducers({
	USER,
	Power,
	Company,
	Version,
	routing: routerReducer
});

export default rootReducer;
