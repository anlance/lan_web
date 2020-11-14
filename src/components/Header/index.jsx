import React from 'react';
import { Menu } from 'antd';
import './index.css'
import { HomeOutlined, CarryOutOutlined, ToolOutlined, SettingOutlined } from '@ant-design/icons';



class Header extends React.Component {

      constructor(props) {
            super(props);
      }


      render() {
            return (
                  <Menu mode="horizontal" style={{ background: 'rgba(153,204,204,0.4)' }} className="Menu">
                        <Menu.Item key="home" icon={<HomeOutlined />} className="Item" >
                              首页
                        </Menu.Item>
                        <Menu.Item key="file" icon={<CarryOutOutlined />} className="Item" >
                              归档
                        </Menu.Item>
                        <Menu.Item key="tool" icon={<ToolOutlined />} className="Item">
                              工具
                        </Menu.Item>
                        <Menu.Item key="setting" icon={<SettingOutlined />} style={{ float: 'right' }} className="Float-Item">
                              设置
                        </Menu.Item>
                  </Menu>
            )
      }
}

export default Header;