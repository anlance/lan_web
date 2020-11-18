import React from 'react';
import { Menu, Layout } from 'antd';
import './index.css'
import { Link } from 'react-router-dom';
import { HomeOutlined, CarryOutOutlined, ToolOutlined, SettingOutlined } from '@ant-design/icons';
const { Header } = Layout;


class MyHeader extends React.Component {

      constructor(props) {
            super(props);
      }


      render() {
            
            let iconStyle = {fontSize: '30px'};

            return (
                  <Header style={{ background: '#fff', padding: 0, opacity:0.6}}>
                        <Menu mode="horizontal" style={{ background: 'rgba(153,204,204,0.4)', fontSize:'30px' }} >
                              <Menu.Item key="home" icon={<HomeOutlined style={iconStyle}/>} style={{ marginLeft: '50px' }} >
                                    <Link to="/">首页</Link>
                              </Menu.Item>
                              <Menu.Item key="tool" icon={<ToolOutlined style={iconStyle}/>} >
                                    <Link to="/tools">工具</Link>
                              </Menu.Item>
                              <Menu.Item key="setting" icon={<SettingOutlined style={iconStyle}/>} style={{ float: 'right',marginRight: '50px' }} >
                                    设置
                              </Menu.Item>
                        </Menu>
                  </Header>
            )
      }
}

export default MyHeader;