import React from 'react';
import { Layout } from "antd/lib/index";
import { RenderRoutes } from '../../utils/routerUtils'
import { routerConfig } from '../../router/index'
import { GET } from "../../api/http";
import { URL } from '../../api/url';
const { Content } = Layout;


class MyContent extends React.Component {

    /**
     * 获取mapKey
     */
    getMapKey = () => {
        GET(URL.basicUrl.getMapKey, null)
            .then(response => {
                if (response.success === true) {
                    window.localStorage.setItem('aMapKey', response.data);
                }
            });
    }

    render() {

        this.getMapKey();

        return (
            <div>
                <Content style={{ background: 'rgba(240,242,245,0.6)', minHeight: '89vh', paddingLeft: '20px', paddingRight: '20px', paddingTop: '20px' }}>
                    <RenderRoutes routes={routerConfig}>
                    </RenderRoutes>
                </Content>
            </div>
        )
    }
}
export default MyContent;