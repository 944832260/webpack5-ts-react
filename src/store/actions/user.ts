// 更新数据
export const UpdateUSER = (obj: any) => {
	return {
		type: "UPDATE_USER",
		...obj
	}
};

// 清空数据
export const ClearUSER = (obj: any) => {
	return {
		type: "CLEAR_USER",
		...obj
	}
};
