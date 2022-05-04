import React from 'react';
import { Menu, Layout } from 'antd';
import './index.css'
import { Link } from 'react-router-dom';
import { HomeOutlined, ToolOutlined, UserOutlined, FolderOpenOutlined } from '@ant-design/icons';
import LoginModal from '../loginModal';
import { GET } from "../../api/http";
import { URL } from '../../api/url';

const { Header } = Layout;
const login_menu_code = '004';

class MyHeader extends React.Component {


    constructor(props) {
        super(props);
        this.initMenu();
        this.state = {
            menuItemList: JSON.parse(window.localStorage.getItem("menuItemList")),
        }
    }

    /**
     * 初始化菜单
     */
    initMenu = () => {
        if (window.localStorage.getItem("menuItemList") == null || window.localStorage.getItem("menuItemList") === '') {
            GET(URL.basicUrl.listMenu, null)
                .then(response => {
                    if (response.success === true) {
                        window.localStorage.setItem("menuItemList", JSON.stringify(response.data));
                        this.changeMenu();
                    }
                });
        }
    }

    /**
     * 绑定子组件
     * @param {LoginModal} ref 子组件
     */
    onRefLoginModal = (ref) => {
        this.loginModal = ref;
    }

    /**
     * 打开登录Modal
     */
    showLoginModel = () => {
        if (this.loginModal) {
            this.loginModal.showModel();
        }
    }

    /**
     * 获取图标
     * @param {string} iconName  图标名字
     * @returns 图标
     */
    getIcon = (iconName) => {
        let icon = null;
        let iconStyle = { fontSize: '25px' };
        switch (iconName) {
            case 'HomeOutlined':
                icon = <HomeOutlined style={iconStyle} />;
                break;
            case 'ToolOutlined':
                icon = <ToolOutlined style={iconStyle} />;
                break;
            case 'UserOutlined':
                icon = <UserOutlined style={iconStyle} />;
                break;
            case 'HomeOutlFolderOpenOutlinedined':
                icon = <FolderOpenOutlined style={iconStyle} />;
                break;
            default:
                icon = <HomeOutlined style={iconStyle} />;
                break;
        }
        return icon;
    }

    /**
     * 获取菜单点击事件
     * @param {string} itemKey 菜单key 
     * @returns 菜单点击事件
     */
    getMenuItemClickFunction = (itemKey) => {
        let click = null;
        switch (itemKey) {
            case login_menu_code:
                click = this.showLoginModel;
                break;
            default:
                break;
        }
        return click;
    }

    /**
     * 获取菜单style
     * @param {string} itemKey 菜单key 
     * @returns 菜单style
     */
    getMenuItemStyle = (itemKey) => {
        let style = null;
        switch (itemKey) {
            case login_menu_code:
                style = { float: 'right', marginRight: '50px' };
                break;
            default:
                style = { marginLeft: '50px' };
                break;
        }
        return style;
    }

    /**
     * 获取每个菜单元素
     * @param {JSON} item 菜单对象
     * @returns  每个菜单元素
     */
    getMenuItem = (item) => {
        let menuItem = null;
        menuItem = <Menu.Item key={item.key} icon={this.getIcon(item.icon)}
            style={this.getMenuItemStyle(item.key)}
            onClick={this.getMenuItemClickFunction(item.key)} >
            {item.url !== null ? <Link to={item.url}>{item.name}</Link> : item.name}
        </Menu.Item>;
        return menuItem;
    }

    /**
     * 获取菜单列表
     * @returns 菜单列表
     */
    getMenuItemList = () => {
        if (this.state['menuItemList'] != null) {
            return this.state['menuItemList'].map(item => {
                return this.getMenuItem(item);
            })
        }
    }

    /**
     * 登录成功后，修改菜单
     */
    changeMenu = () => {
        this.setState({
            menuItemList: JSON.parse(window.localStorage.getItem("menuItemList"))
        });
    }


    render() {

        return (
            <Header style={{ background: '#fff', padding: 0, opacity: 0.6 }}>
                <LoginModal onRef={this.onRefLoginModal} changeMenu={this.changeMenu} />
                <Menu mode="horizontal" style={{ background: 'rgba(153,204,204,0.4)', fontSize: '25px' }} >
                    {this.getMenuItemList()}
                </Menu>
            </Header >
        )
    }
}

export default MyHeader;