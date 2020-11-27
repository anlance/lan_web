import React from 'react';
import moment from 'moment';

class MyMoment extends React.Component {

      constructor(props) {
            super(props);
      }

      render() {

            let { time, format } = this.props;
            let timeStr = moment(parseInt(time)).format(format);

            return (
                  <div>{timeStr}</div>
            )
      }
}

export default MyMoment;