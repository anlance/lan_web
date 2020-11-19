import React from 'react';
import MyAvatar from '../../components/avatar'



class Index extends React.Component {

      constructor(props) {
            super(props);
      }

      render() {
            let { routes } = this.props

            return (
                  <div style={{height: '100%'}}>
                        {/* <MyAvatar/> */}
                  </div>
            )
      }
}

export default Index;