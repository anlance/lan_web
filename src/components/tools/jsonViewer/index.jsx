import React from 'react';
import ReactJson  from 'react-json-view';

class MyJsonViewer extends React.Component {

      constructor(props) {
            super(props);
      }

      render() {
            return (
                  <ReactJson src={eval("(" + this.props.jsonSrc + ")")} displayObjectSize={false} displayDataTypes={false} theme="rjv-default" />
            )
      }
}

export default MyJsonViewer;