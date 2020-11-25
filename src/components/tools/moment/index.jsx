import React from 'react';
import moment from 'moment';

class MyMoment extends React.Component {

      constructor(props) {
            super(props);
      }

      render() {

            let { time, format } = this.props;
            let cn = moment(parseInt(time)).format(format);

            return (
                  <div>{cn}</div>
            )
      }
}

export default MyMoment;