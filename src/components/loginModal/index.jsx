import React from 'react';
import { Form, Input, Button, Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import './index.css'
import { URL } from '../../api/url';
import { GET, POST } from "../../api/http";
import { hex_md5 } from "../../utils/md5Util";

class LoginModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
        if (props.onRef) {
            props.onRef(this)
        }
    }

    /**
     * 登录表单提交
     * @param {JSON} values 表单提交的值
     */
    onFinish = (values) => {
        // 获取盐
        const params = { username: values.username };
        GET(URL.basicUrl.getSalt, params)
            .then(response => {
                let loginPass = hex_md5(hex_md5(hex_md5(values.password) + response.data.salt) + response.data.randomCode);
                this.doLogin(values.username, loginPass);
            });
    };


    /**
     *  登录
     * @param {string} username 用户名 
     * @param {string} loginPass 登录密码
     */
    doLogin = (username, loginPass) => {
        let getTokenParm = {
            "username": username,
            "password": loginPass,
            "grant_type": "password",
            "scope": "ui",
            "client_id": "browser",
            "client_secret": "browser"
        };
        POST(URL.authUrl.getToken, getTokenParm)
            .then(response => {
                if (response.success === true) {
                    // 设置 token
                    window.localStorage.setItem("token", response.data.access_token);
                    this.changeMenu();
                }
            })
    }

    /**
     * 登录成功，改变菜单
     */
    changeMenu = () => {
        GET(URL.basicUrl.listMenu, null)
            .then(response => {
                if (response.success === true) {
                    window.localStorage.setItem("menuItemList", JSON.stringify(response.data));
                    this.props.changeMenu();
                    this.onCloseLoginForm();
                }
            });
    }


    /**
     * 关闭登录Model
     */
    onCloseLoginForm = () => {
        this.setState({
            visible: false,
        });
    };

    /**
     * 展示登录Model
     */
    showModel = () => {
        this.setState({
            visible: true,
        });
    };

    render() {

        let borderRadiusStyle = { borderRadius: '1vh' };

        return (
            <Modal
                title="登录"
                width={500}
                onCancel={this.onCloseLoginForm}
                visible={this.state.visible}
                centered={true}
                footer={null}
                bodyStyle={{ paddingBottom: 40, marginTop: 20 }}
                closeIcon={<CloseOutlined style={{ color: 'red' }} />}
            >
                <Form
                    name="basic"
                    wrapperCol={{
                        span: 16,
                        offset: 4,
                    }}
                    onFinish={this.onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名!',
                            },
                        ]}
                    ><Input placeholder='用户名' allowClear style={borderRadiusStyle} />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码!',
                            },
                        ]}
                    ><Input.Password placeholder='密码' style={borderRadiusStyle} />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            span: 6,
                            offset: 9,
                        }}
                    >
                        <Button type="primary" size="large" htmlType="submit" style={borderRadiusStyle} block>
                            登录
                        </Button>
                    </Form.Item>
                </Form >
            </Modal>
        )
    }
};

export default LoginModal;