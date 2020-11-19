import React from 'react';
import { Row, Col, Input, Empty } from 'antd';
import MyQrCode from '../../components/qrcode'
import { empty } from '../../utils/strUtils'

const { TextArea } = Input;

class Tools extends React.Component {

      constructor(props) {
            super(props);
            this.state = {
                  qrUrl:''
            }
      }

      // 改变二维码的链接
      changeQrUrl = (e) => {
            this.setState({
                  qrUrl:e.target.value
            })
      }

      render() {

            let texAreaSize = {minRows: 10}

            let showData = empty(this.state.qrUrl) ? <Empty/> : <MyQrCode qrUrl={this.state.qrUrl}/>;

            return (
                  <div style={{ minHeight: '87vh', backgroundColor: 'rgba(234, 236, 238 ,0.9)', borderRadius:'20px' }}>
                        <Row style={{height:'50vh', padding:'20px'}}>
                              <Col span={12}>
                                    <TextArea onPressEnter={this.changeQrUrl} placeholder="输入需要生成二维码的链接" autoSize={texAreaSize} allowClear={true} showCount={true} style={{borderRadius:'20px'}}/>
                              </Col>
                              <Col span={12}>
                                    {showData}
                              </Col>
                        </Row>
                        <Row>
                              <Col span={4} style={{height:'50px',backgroundColor:"#fff"}}>二维码生成</Col>
                              <Col span={4} >tool 2</Col>
                              <Col span={4} >tool 3</Col>
                              <Col span={4} >tool 4</Col>
                        </Row>
                  </div>
            )
      }
}

export default Tools;