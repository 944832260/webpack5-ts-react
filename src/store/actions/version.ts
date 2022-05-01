// 清空数据
export const updateVersion = (obj: any) => {
    return {
        type: "UPDATE_VERSION",
        ...obj
    }
};
