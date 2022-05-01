interface NavObj {
    path: string,//菜单路由
    name: string,//菜单名称
    icon: string,//菜单图标
    code: string,//菜单编码
    id: string,//菜单id
    parentid: string,//菜单父id
    children?: NavObj[],//子菜单
}
const navconfig: NavObj[] = [
    {
        path: '/home',
        name: '首页',
        icon: 'home',
        code: 'home',
        id: '1',
        parentid: null,
    },
    {
        path: '/system',
        name: '系统设置',
        icon: 'system',
        code: 'system',
        id: '8',
        parentid: null,
        children: [
            {
                path: '/system/users',
                name: '用户管理',
                icon: 'users',
                code: 'ep_user_page',
                id: '8-1',
                parentid: '8',
            }, {
                path: '/system/roles',
                name: '角色管理',
                icon: 'role',
                code: 'ep_role_page',
                id: '8-2',
                parentid: '8',
            }, 
        ]
    },
]

export default navconfig;