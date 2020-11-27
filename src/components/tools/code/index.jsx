import { message } from 'antd';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopyOutlined } from '@ant-design/icons';

class MyEncode extends React.Component {

      constructor(props) {
            super(props);
      }

      encodeUnicode = (str) => {
            var res = [];
            for (var i = 0; i < str.length; i++) {
                  res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
            }
            return "\\u" + res.join("\\u");
      }


      decodeUnicode = (str) => {
            str = str.replace(/\\/g, "%");
            return unescape(str);
      }


      render() {

            let { str } = this.props;

            let endcodeStr = this.encodeUnicode(str);

            return (
                  <div style={{ wordWrap: 'break-word', wordBreak: 'normal' }}>
                        <CopyToClipboard text={endcodeStr} onCopy={() => message.success("copied!", 1)}>
                              <div>
                                    <div>{endcodeStr}</div>
                                    <div style={{ paddingTop: '150px', fontSize:'10px' }}><CopyOutlined />点击内容即可复制</div>
                              </div>
                        </CopyToClipboard>
                  </div>
            )
      }
}

export default MyEncode;