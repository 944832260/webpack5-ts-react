import React, { useEffect, } from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, } from 'antd';
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
import './layouts.scss';
import Navconfig from './nav.config';
import { UpdateUSER } from '@store/actions/user';
import { useSetState } from 'ahooks';
import { Outlet, useNavigate } from 'react-router-dom';
interface State {
    collapsed: boolean,
    openKeys: any,
    rootSubmenuKeys: any,
    currentMenu: any,
    name: string,
    Navconfig: any[],
    routes: any[],
    isSystem: boolean,
}

const Layouts = (props) => {
    const navigate = useNavigate()
    const [state, setState] = useSetState<State>({
        collapsed: false,//菜单收缩
        openKeys: ['/home'],//当前展开的 SubMenu 菜单项 key 数组
        rootSubmenuKeys: [],//menu所有有子菜单的key
        currentMenu: ['/home'],//刷新的时候根据路由判断是那个目录
        name: '',//用户昵称
        Navconfig: [],
        routes: [],
        isSystem: false,//是否显示个人设置
    })
    useEffect(() => {
    console.log(props,'55555555555555555555')
        menuOnlyKey()
        currentMenu()
    },[])

    //设置当前的menu颜色
    const currentMenu = () => {
        // let { Navconfig } = state;
        let currentMenu = [], openKeys = [];
        // let current = `/${props.location.pathname.split('/')[1]}`;
        let current = location.pathname;
        if (current == '/') {
            current = '/home'
            navigate('/home')
        }
        // 如果没有子菜单有这个就可以
        currentMenu.push(current)
        // 如果有子菜单要加这个循环，展开当前子菜单
        Navconfig.forEach((e, i) => {
            if (e.children) {
                e.children.forEach((ee, ii) => {
                    if (current.indexOf(ee.path) !== -1) {
                        openKeys.push(e.path)
                        currentMenu = [ee.path]
                    }
                })
            }
        })
        // console.log(props, current, 'current', currentMenu, openKeys, Navconfig)
        setState({ currentMenu, openKeys })
    }
    // menu获取所有有子菜单的key
    const menuOnlyKey = () => {
        // let { Navconfig } = state;
        let rootSubmenuKeys = [];
        Navconfig.forEach(e => {
            if (e.children) {
                rootSubmenuKeys.push(e.path)
            }
        })
        setState({ rootSubmenuKeys })
    }
    // 通过menu的key只展开一个菜单
    const onOpenChange = openKeys => {
        // console.log(openKeys,state.rootSubmenuKeys,'openKeysopenKeysopenKeysopenKeys')
        const latestOpenKey = openKeys.find(key => state.openKeys.indexOf(key) === -1);
        if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setState({ openKeys });
        } else {
            setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };
    // 当前选中的菜单
    const menuChange = (ev: any) => {
        console.log(ev, 'menuChangemenuChangemenuChangemenuChange')
        let currentMenu: any[]
        currentMenu = ev.selectedKeys
        setState({ currentMenu })
    }
    // 导航路由切换
    const router = (path) => {
        navigate(path)
    }
    return (
        <div id='Layouts'>
            <Layout className='layouDD'>
                <Sider trigger={null} collapsible collapsed={state.collapsed}
                >
                    <div className='logo' >
                        {localStorage.getItem('tenantName')}
                        {/* <img style={{ width: 50, height: 50 }} src={require('../../assets/icons/logo.png')} alt='' /> */}
                    </div>
                    <Menu
                        className='icons menus'
                        selectedKeys={state.currentMenu}
                        mode='inline'
                        theme='dark'
                        openKeys={state.openKeys}
                        onOpenChange={onOpenChange}
                        onSelect={(ev) => { menuChange(ev) }}
                    >
                        {
                            Navconfig.map((e, i) => {
                                if (e.children) {
                                    return (
                                        <SubMenu
                                            className='sub-menu'
                                            key={e.path}
                                            title={
                                                <div className='meun-children'>
                                                    <i className={`menu-icon iconfont icon-${e.icon}`} ></i>
                                                    <span>{e.name}</span>
                                                </div>
                                            }
                                        >
                                            {
                                                e.children.map((ee, ii) => {
                                                    return (
                                                        <Menu.Item
                                                            className='meun-children'
                                                            key={ee.path}
                                                            onClick={() => {  router(ee.path) }}
                                                        >
                                                            {/* <i className={`menu-icon iconfont icon-${ee.icon}`} ></i> */}
                                                            <span >{ee.name}</span>
                                                        </Menu.Item>
                                                    )
                                                })
                                            }
                                        </SubMenu>
                                    )
                                } else {
                                    return (
                                        <Menu.Item
                                            className='meun-children'
                                            key={e.path}
                                            onClick={() => { router(e.path) }}>
                                            <i className={`menu-icon iconfont icon-${e.icon}`} ></i>
                                            <span >{e.name}</span>
                                        </Menu.Item>
                                    )
                                }
                            })
                        }
                    </Menu>
                </Sider>
                <Layout className='layoutCD'>
                    <Header className='header' style={{ background: '#fff', padding: 0 }}>
                        <div className='header_d'>
                            <div className='userInfo'>
                                <div>
                                    <span className='topName' >{state.name}</span>
                                </div>
                                <div className='lingdang'>
                                    <span
                                        className='iconfont icon-users topIcon'
                                        onMouseEnter={() => { setState({ isSystem: true }) }}
                                        onMouseLeave={() => { }}//鼠标移出触发
                                    // onClick={() => { window.open('/message') }}
                                    ></span>
                                </div>
                            </div>
                        </div>
                    </Header>
                    <Content
                        className='layoutContent'
                    >
                        <Outlet />
                        {/* {
                            renderRoutes(state.routes)
                        } */}
                        {/* <div className='copyright'>
                        Copyright&nbsp;&nbsp;
                        <i className='iconfont icon-copyright'></i>
                        &nbsp;&nbsp;2020 新之科技
                        &nbsp;&nbsp;web：{CopyrightData[CopyrightData.length - 1].copyright}
                    </div> */}
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        USER: state.USER,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        UpdateUSER: (obj: any) => {
            dispatch(UpdateUSER(obj))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Layouts);