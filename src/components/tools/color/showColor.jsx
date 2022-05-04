import React from 'react';

class ShowColor extends React.Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    render() {

        let hex = this.props.hex;
        console.log(hex);
        return <div style={{ borderRadius: '2vh', boxShadow: '5px 5px 5px #888888', backgroundColor:  this.props.hex , width: '600px', height: '400px', marginLeft: '250px' }}></div>;
    }
}


export default ShowColor;