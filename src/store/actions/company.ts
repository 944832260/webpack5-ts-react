// 清空数据
export const updateCompany = (obj: any) => {
    return {
        type: "UPDATE_COMPANYINFO",
        ...obj
    }
};
