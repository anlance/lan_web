import React from 'react';
import { ChromePicker } from 'react-color';

class MyColor extends React.Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
    }

    render() {
        return <ChromePicker color={this.props.color} onChange={this.props.onChange} disableAlpha={true}/>;
    }
}


export default MyColor;