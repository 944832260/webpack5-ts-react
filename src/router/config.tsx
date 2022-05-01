import React, { lazy, ReactNode, } from 'react';
import { RouteObject } from 'react-router-dom'

import Layouts from '@components/layouts/layouts'
const lazyLoad = (Children): ReactNode => {
    return (
        <React.Suspense fallback={null}>
            <Children />
        </React.Suspense>
    )
}

const Config: any[] = [
    {
        path: '/login',
        element: lazyLoad(lazy(() => import('@pages/login/login'))),
        // element:Login(),
        // exact: true,
        // name: '登录',
    },
    {
        path: '/',
        element: <Layouts />,
        // name: '登录',
        children: [
            {
                path: '/home',
                // code: 'public',
                element: lazyLoad(lazy(() => import('@pages/home/home'))),
                // exact: true,
                // name: '首页',
            },
            {
                path: '/system/roles',
                // code: 'public',
                element: lazyLoad(lazy(() => import('@pages/system/roles/roles'))),
                // exact: true,
                // name: '首页',
            },
            {
                path: '/system/users',
                // code: 'public',
                element: lazyLoad(lazy(() => import('@pages/system/users/users'))),
                // exact: true,
                // name: '首页',
            },
            {
                path: '/*',
                // code: '404',
                element: lazyLoad(lazy(() => import('@pages/system/nopower/nopower'))),
                // name: '404',
            }
        ]
    },
];



export default Config