import React from 'react';
import ReactJson from 'react-json-view';
import { isJSONStr } from '../../../utils/strUtils'

class MyJsonViewer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let { jsonSrc } = this.props;

        // 处理非JSON字符串情况
        if (isJSONStr(jsonSrc)) {
            jsonSrc = eval("(" + this.props.jsonSrc + ")");
        } else {
            jsonSrc = {
                "errorCode": '001',
                "errorMsg": '输入数据格式错误, 非JSON字符串'
            }
        }

        return (
            <ReactJson src={jsonSrc} displayObjectSize={false} displayDataTypes={false} theme="rjv-default" style={{ fontSize: '15px', lineHeight: '15px' }} />
        )
    }
}

export default MyJsonViewer;