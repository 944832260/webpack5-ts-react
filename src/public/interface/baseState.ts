import { ColumnsType } from "antd/lib/table";

// 基础State数据
export interface BaseState {
	isRefresh?:boolean
	isLoading?: boolean,//是否loading
	isModal?: boolean,//
	isDrawer?: boolean,//
	isTemplateImportModal?: boolean,//批量导入弹窗
	pageNum?: number,//页码
	pageSize?: number,//每页条数
	current?: number,
	size?: number,
	total?: number,//总条数
	columns?: ColumnsType,//列表头部
	columnsData?: any[],//列表数据
	columnsTwo?: ColumnsType,//列表头部
	columnsDataTwo?: any[],//列表数据
	columnsThree?: ColumnsType,//列表头部
	columnsDataThree?: any[],//列表数据
	selectedRowKeys?: any[];//选中列表key
	selectedRows?: any[];//选中列表key数组
	searchContent?: any,//查询条件内容
	submitSearchContent?: any,//提交时查询条件内容
	detailData?: any,//详情
	isSearchOpen?: boolean,//搜索展开项
	isExportStoreList?: boolean,//导出
}