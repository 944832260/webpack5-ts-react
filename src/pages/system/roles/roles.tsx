import { BaseState } from "@public/interface/baseState";
import { useSetState } from "ahooks";
import { Button, Col, Form, Input, Row, Table } from "antd";
import React from "react"

export default () => {
    let [form] = Form.useForm()
    const columns = [
        {
            title: '角色名称',
            dataIndex: 'name',
            key: 'name',
        },
    ];
    const [state, setState] = useSetState<BaseState>({
        columnsData: [
            {
                id: '1',
                name: '超级管理员',
            },
            {
                id: '2',
                name: '普通用户',
            },
        ]
    })
    const onFinish = () => { }
    const onFinishFailed = () => { }
    return (
        <div className="public_page">
            <Form
                name="basic"
                layout="inline"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
            >
                <Row className="search_content">
                    <Col className="search_item">
                        <Form.Item
                            label='角色名称'
                            name="keywords"
                        >
                            <Input placeholder='文件名，文件标签' />
                        </Form.Item>
                    </Col>
                    <Col className="search_btn_box">
                        <Form.Item >
                            <Button type="primary" htmlType="submit">查询</Button>
                        </Form.Item>
                        <Form.Item >
                            <Button
                                onClick={() => {
                                    form.setFieldsValue({
                                        keywords: ''
                                    })
                                }}
                            >重置</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <div className='public_line'></div>
            <div className="public_content">
                <Table
                    dataSource={state.columnsData}
                    columns={columns}
                    rowKey={(item: { id: number }) => item.id}
                />
            </div>
        </div>
    )
}