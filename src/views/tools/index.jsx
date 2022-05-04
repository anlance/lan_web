import React from 'react';
import { Row, Col, Input, Empty, Card, Tooltip, Badge } from 'antd';

import { empty } from '../../utils/strUtils';
import { toolEnumList } from './toolEnum';
import { colors } from './list';
import MyColor from '../../components/tools/color';
import './index.css'

const { TextArea } = Input;

/**
 * 工具格默认样式
 */
const gridStyle = {
    width: '20%',
    textAlign: 'center'
};

class Tools extends React.Component {

    constructor(props) {
        super(props);
        let settings = <div>    </div>;
        this.state = {
            data: '', // 输入的数据
            format: 'YYYY-MM-DD HH:mm:ss',
            setting: <div>    </div>,
            key: 0,
            tool: toolEnumList(undefined, settings, 'YYYY-MM-DD HH:mm:ss')[0], // 工具名 Enum
        }
    }

    // 改变输入的数据
    changeData = (e) => {
        let data = e.target.value;
        this.setState({
            data: e.target.value,
            tool: toolEnumList(data, this.state.settings, this.state.format)[this.state.key]
        })
    }

    /**
     * 获取展示的elment
     */
    getShowData = () => {
        let emptyDiv = <div className="emptyDiv"><Empty description="暂无数据" /></div>;
        return empty(this.state.data) ? emptyDiv : this.state.tool['view'];
    }

    /**
     * 切换工具
     * @param {int} key 工具下标
     */
    switchTool = (key) => {
        this.setState({
            key: key,
            tool: toolEnumList(this.state.data, this.state.settings, this.state.format)[key],
            data: undefined
        });
    };

    // 得到时间格式
    getFormat = (format) => {
        this.setState({
            format: format
        })
    }

    /**
     * 获取所有的工具
     */
    getGridToolItem = () => {
        return toolEnumList(this.state.data, this.state.settings, this.state.format).map(item => {
            return this.getToolItme(item);
        })
    }

    /**
     * 获取每一个工具元素
     * @param {toolItem} toolItem 工具元素
     */
    getToolItme = (toolItem) => {
        const gridSelectedStyle = {
            width: '20%',
            textAlign: 'center',
            color: 'blue',
            backgroundColor: '#FAD7A0',
            boxShadow: '5px 5px 5px #888888',
        }
        return <Card.Grid style={this.state.tool['type'] === toolItem['type'] ? gridSelectedStyle : gridStyle} onClick={() => this.switchTool(toolItem['key'])}>{toolItem['name']}</Card.Grid>;
    }

    /**
     * 是否是颜色组件
     */
    isColor = () => {
        return this.state.key === 4;
    }

    /**
     * 颜色发生变化
     * @param {color} color 
     * @param {e} event 
     */
    handleColorChange = (color, event) => {
        if (color !== undefined) {
            this.setState({
                data: color.hex,
                tool: toolEnumList(color.hex, this.state.settings, this.state.format)[this.state.key]
            })
        } 
    }

    render() {

        let textAreaSize = { minRows: 15, maxRows: 19 };

        const cardStyle = {
            fontSize: '20px',
            textAlign: 'center',
            height: '100%',
            overflowY: 'auto',
            borderRadius: '1vh'
        };

        let editColor = this.isColor() ? <div style={{ paddingLeft: '400px' }}><MyColor color={this.state.data} onChange={this.handleColorChange} /></div> : null;

        return (
            <div style={{ minHeight: '87vh', backgroundColor: 'rgba(234, 236, 238 ,0.9)', borderRadius: '1vh' }}>
                <Row style={{ minHeight: '60vh', padding: '20px' }}>
                    <Col span={11} >
                        <Card style={cardStyle} hoverable>
                            <TextArea onChange={this.changeData} value={this.state.data} placeholder={this.state.tool.placeHolder} autoSize={textAreaSize}
                                allowClear={true} showCount={true} style={{ fontSize: '20px' }} />
                            {editColor}
                            <span style={{ fontSize: '20px', color: 'grey' }}>
                                {colors.map(color => (
                                    <Badge color={color} key={color} />
                                ))}
                                <Badge status="processing" />
                            </span>
                        </Card>
                    </Col>
                    <Col span={2} >
                        {/* {this.state.tool['settings']} */}
                    </Col>
                    <Col span={11} >
                        <Card style={cardStyle} hoverable>
                            {this.getShowData()}
                        </Card>
                    </Col>
                </Row>
                <div style={{ padding: '20px' }}>
                    <Card style={cardStyle} >
                        {this.state.cardGrid}
                        {this.getGridToolItem()}
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