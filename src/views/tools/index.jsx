import React from 'react';
import { Row, Col, Input, Empty, Card, Tooltip, Badge } from 'antd';
import MyQrCode from '../../components/tools/qrcode';
import MyJsonViewer from '../../components/tools/jsonViewer';
import { empty } from '../../utils/strUtils';
import { toolEnum, toolPlaceholderEnum } from './toolEnum';
import { colors, fgColors } from './list';
import './index.css'

const { TextArea } = Input;

class Tools extends React.Component {

      constructor(props) {
            super(props);
            this.state = {
                  data: '', // 输入的数据
                  tool: toolEnum.QRCODE, // 工具名 Enum
            }
      }

      // 改变输入的数据
      changeData = (e) => {
            this.setState({
                  data: e.target.value
            })
      }

      // 切换工具
      switchTool = (toolStr) => {
            this.setState({
                  tool: toolStr,
                  data: undefined
            });
      };

      render() {

            let { data, tool } = this.state;

            let emptyDiv = <div className="emptyDiv"><Empty description="暂无数据" /></div>;
            let showData = empty;
            let placeholder = toolPlaceholderEnum.QRCODE;

            let qrCodeFgColor = fgColors[Math.floor((Math.random()*fgColors.length))];

            let qrCode = <div className="emptyDiv"><MyQrCode qrUrl={data} fgColor={qrCodeFgColor} /></div>;
            let jsonViewer = <div style={{ textAlign: 'left', height: '35vh' }}><MyJsonViewer jsonSrc={data} /></div>

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

            let textAreaSize = { minRows: 15, maxRows: 19 }

            const cardStyle = {
                  fontSize: '20px',
                  textAlign: 'center',
                  height: '100%',
                  overflowY: 'auto',
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
                                          <TextArea onChange={this.changeData} value={data} placeholder={placeholder} autoSize={textAreaSize}
                                                allowClear={true} showCount={true} style={{ fontSize: '20px' }} />
                                          <span style={{ fontSize: '20px', color: 'grey' }}>
                                                {colors.map(color => (
                                                      <Badge color={color}/>
                                                ))}
                                                <Badge status="processing" />
                                          </span>
                                    </Card>
                              </Col>
                              <Col span={11} offset={2}>
                                    <Card style={cardStyle} hoverable>
                                          {showData}
                                    </Card>
                              </Col>
                        </Row>
                        <div style={{ padding: '20px' }}>
                              <Card style={cardStyle} >
                                    <Card.Grid style={tool == toolEnum.QRCODE ? gridSelectedStyle : gridStyle} onClick={() => this.switchTool(toolEnum.QRCODE)}>二维码生成</Card.Grid>
                                    <Card.Grid style={tool == toolEnum.JSON ? gridSelectedStyle : gridStyle} onClick={() => this.switchTool(toolEnum.JSON)}>JSON 格式化</Card.Grid>
                                    <Tooltip title="敬请期待" color="volcano" key="volcano">
                                          <Card.Grid style={gridStyle} >未完待续 ......</Card.Grid>
                                    </Tooltip>
                              </Card>
                        </div>
                  </div>
            )
      }
}

export default Tools;