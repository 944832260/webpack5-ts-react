import * as React from 'react';
import Config from './config';
import { renderRoutes } from 'react-router-config';
import RouterWaiter from 'react-router-waiter'
import { ConfigProvider,  } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

const Routers = () =>{
    return (
                <RouterWaiter routes={Config}/>
    );
}
export default Routers;
