import { Action } from "@store/index";
export interface USERState {
	name: string;
	username: string;
	status: number;
	phone: string | number;
	orgName: string;
	orgReduceName: string;//企业简称
	orgId: number;
	id: number;
}
const InitState: (USERState | object) = {};

export default function USER(state = InitState, action: Action) {

	let obj = JSON.parse(JSON.stringify(action));
	delete obj.type;

	switch (action.type) {
		// 清空数据
		case 'CLEAR_USER':
			return {};

		// 更新数据
		case 'UPDATE_USER':
			return obj;

		default:
			return state;
	}
};
