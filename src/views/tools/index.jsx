import React from 'react';
import { Row, Col, Input, Empty, Card } from 'antd';
import MyQrCode from '../../components/tools/qrcode'
import MyJsonViewer from '../../components/tools/jsonViewer'
import { empty } from '../../utils/strUtils'
import { toolEnum, toolPlaceholderEnum } from './toolEnum'
import './index.css'

const { TextArea } = Input;

class Tools extends React.Component {

      constructor(props) {
            super(props);
            this.state = {
                  data: '', // 输入的数据
                  tool: toolEnum.QRCODE, // 工具名 Enum
                  switched: false
            }
      }

      // 改变输入的数据
      changeData = (e) => {
            this.setState({
                  data: e.target.value,
                  switched: false
            })
      }

      // 切换工具
      switchTool = (toolStr) => {
            this.setState({
                  tool: toolStr,
                  data: '',
                  switched: true
            });
            console.log(this.state.switched);
      };

      render() {

            let { data, tool, switched } = this.state;

            let textAreaSize = { minRows: 15, maxRows: 19 }

            let emptyDiv = <div className="emptyDiv"><Empty description="暂无数据"/></div>;
            let showData = empty;
            let placeholder = toolPlaceholderEnum.QRCODE;

            let qrCode = <div className="emptyDiv"><MyQrCode qrUrl={data} /></div>;

            let jsonViewer = <div style={{textAlign:'left',height:'35vh'}}><MyJsonViewer jsonSrc={data} /></div>

            switch (this.state.tool) {
                  case toolEnum.QRCODE:
                        showData = empty(data) ? emptyDiv : qrCode;
                        placeholder = toolPlaceholderEnum.QRCODE;
                        break;
                  case toolEnum.JSON:
                        showData = empty(data) ? emptyDiv : jsonViewer;
                        placeholder = toolPlaceholderEnum.JSON;
                        break;
                  default:
                        showData = empty;
                        break;
            }

            const cardStyle = {
                  fontSize: '20px',
                  textAlign: 'center',
                  height: '100%',
                  overflowY:'auto',
                  borderRadius: '1vh'
            };

            // 工具格样式
            const gridStyle = {
                  width: '20%',
                  textAlign: 'center'
            };

            const gridSelectedStyle = {
                  width: '20%',
                  textAlign: 'center',
                  color: 'blue',
                  backgroundColor: '#FAD7A0',
                  boxShadow: '5px 5px 5px #888888',
            }

            return (
                  <div style={{ minHeight: '87vh', backgroundColor: 'rgba(234, 236, 238 ,0.9)', borderRadius: '1vh' }}>
                        <Row style={{ minHeight: '60vh', padding: '20px' }}>
                              <Col span={11} >
                                    <Card style={cardStyle} hoverable>
                                    <TextArea onPressEnter={this.changeData} placeholder={placeholder} autoSize={textAreaSize} 
                                          allowClear={true} showCount={true} style={{fontSize:'20px'}}/>
                                    <span style={{fontSize:'20px',color:'grey'}}>输入内容，按下回车，即可得到答案</span>
                                    </Card>
                              </Col>
                              <Col span={11} offset={2}>
                                    <Card style={cardStyle} hoverable>
                                          {showData}
                                    </Card>
                              </Col>
                        </Row>
                        <div style={{ padding: '20px' }}>
                              <Card title="<<<-------- 工具     -------->>>" style={cardStyle} headStyle={{fontSize:'25px'}}>
                                    <Card.Grid style={tool == toolEnum.QRCODE?gridSelectedStyle:gridStyle} onClick={() => this.switchTool(toolEnum.QRCODE)}>二维码生成</Card.Grid>
                                    <Card.Grid style={tool == toolEnum.JSON?gridSelectedStyle:gridStyle} onClick={() => this.switchTool(toolEnum.JSON)}>JSON 格式化</Card.Grid>
                                    <Card.Grid style={gridStyle} >待开发 ......</Card.Grid>
                              </Card>
                        </div>
                  </div>
            )
      }
}

export default Tools;