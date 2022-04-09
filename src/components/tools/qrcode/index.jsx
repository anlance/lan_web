import React from 'react';
import QRCode from 'qrcode.react';

class MyQrCode extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <QRCode
                value={this.props.qrUrl} //value参数为生成二维码的链接
                size={250}               //二维码的宽高尺寸
                fgColor={this.props.fgColor}        //二维码的颜色
            />
        )
    }
}

export default MyQrCode;