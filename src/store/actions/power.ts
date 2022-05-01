// 清空数据
export const updatePower = (obj: any) => {
	return {
		type: "UPDATE_POWER",
		...obj
	}
};
