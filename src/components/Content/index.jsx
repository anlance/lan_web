import React from 'react';
import { Layout } from "antd/lib/index";
import { RenderRoutes } from '../../utils/routerUtils'
import { routerConfig } from '../../router/index'
const { Content } = Layout;


class MyContent extends React.Component {
    render() {
        let { routes } = this.props;
        return (
            <div>
                <Content style={{background: 'rgba(240,242,245,0.6)', minHeight: '89vh', paddingLeft:'20px',paddingRight:'20px', paddingTop:'20px' }}>
                <RenderRoutes routes={routerConfig}>
                  </RenderRoutes>
                </Content>
            </div>
        )
    }
}
export default MyContent;