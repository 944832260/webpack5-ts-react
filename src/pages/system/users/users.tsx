import { BaseState } from "@public/interface/baseState";
import { useSetState } from "ahooks";
import { Table } from "antd";
import React from "react"

export default () => {
    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        },
    ];
    const [state, setState] = useSetState<BaseState>({
        columnsData: [
            {
                id: '1',
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号',
            },
            {
                id: '2',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
        ]
    })
    return (
        <div className="public_page">
            <Table
                dataSource={state.columnsData}
                columns={columns}
                rowKey={(item: { id: number }) => item.id}
            />
        </div>
    )
}