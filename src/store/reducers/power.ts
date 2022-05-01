import { Action } from "@store/index";

const InitState: any = {};

export default function Power(state = InitState, action: Action) {

  let obj = JSON.parse(JSON.stringify(action));
  delete obj.type;

  switch (action.type) {

    // 更新数据
    case 'UPDATE_POWER':
      return obj;

    default:
      return state;
  }
};
