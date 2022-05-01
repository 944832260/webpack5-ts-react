import { Action } from "@store/index";

const InitState: any = {
    serverVersion: '',
};

export default function Version(state = InitState, action: Action) {

    let obj = JSON.parse(JSON.stringify(action));
    delete obj.type;

    switch (action.type) {

        // 更新数据
        case 'UPDATE_VERSION':
            return obj;

        default:
            return state;
    }
};
