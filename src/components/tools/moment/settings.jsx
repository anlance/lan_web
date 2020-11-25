import React from 'react';
import { Select } from 'antd';
import { timeFormat } from './momnetList';

const { Option } = Select;

class MyMomentSetting extends React.Component {

      constructor(props) {
            super(props);
      }

      changeFormat = (format) => {
            this.props.getFormat(format);
      }

      render() {
            return (
                  <Select style={{ width: '150px' }} defaultValue="YYYY-MM-DD HH:mm:ss" onChange={this.changeFormat}>
                        {timeFormat.map(format => (
                              <Option value={format} key={format}>{format}</Option>
                        ))}
                  </Select>
            )
      }
}

export default MyMomentSetting;