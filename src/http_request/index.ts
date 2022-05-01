import axios from 'axios';
import qs from 'qs';
import { message } from 'antd';

axios.interceptors.request.use(
	config => {
		if (config.method === 'get') {
			config.paramsSerializer = function (params) {
				return qs.stringify(params, { arrayFormat: 'repeat' })
			}
		}
		let token = window.localStorage.getItem('NEW_EP_TOKEN')
		if (token) {
			config.headers['Authorization'] = `Basic ${token}`
		}
		return config;
	},
	error => {
		return Promise.reject(error.response);
	}
);

// http response 拦截器
axios.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		// 此处做错误处理的一些逻辑，比如请求超时返回登录页面
		if (error.response.status == 401) {
			if (window.location.href.indexOf('login') === -1) {
				message.error('登录信息过期')
				location.href = '/login'
			}
		} else {
			if (error.response.config.responseType == 'blob') {
				let blob = new Blob([error.response.data])
				let reader = new FileReader()
				reader.readAsText(blob, 'utf-8')
				reader.onload = function () {
					try {
						let data = JSON.parse((reader as any).result)
						message.error(data.msg)
					} catch (e) {
						message.error('系统错误')
					}
				}
			} else {
				message.error(error.response.data.msg)
			}
		}
		return Promise.reject(error.response)
	}
);
