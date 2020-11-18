import React from 'react';
import {Layout} from "antd/lib/index";
import { RenderRoutes } from '../../utils/routerUtils'
import { routerConfig } from '../../router/index'
const { Content } = Layout;


class MyContent extends React.Component {
    render() {
        let { routes } = this.props;
        return (
            <div>
                <Content style={{  padding: 24, background: '#f0f2f5', minHeight: '89vh', opacity:0.6 }}>
                <RenderRoutes routes={routerConfig}>
                  </RenderRoutes>
                </Content>
            </div>
        )
    }
}
export default MyContent;