import { Action } from "@store/index";

const InitState: {
  enterpriseName?: string,
  enterpriseAbbreviation?: string,
  tenantId?: any,
} = {
  enterpriseName: '',
  enterpriseAbbreviation: '',
  tenantId: null,
};

export default function Company(state = InitState, action: Action) {

  let obj = JSON.parse(JSON.stringify(action));
  delete obj.type;

  switch (action.type) {

    // 更新数据
    case 'UPDATE_COMPANYINFO':
      return obj;

    default:
      return state;
  }
};
