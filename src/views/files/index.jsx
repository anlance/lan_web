import React from 'react';
import MyUpLoadFile  from '../../components/tools/file';



class Index extends React.Component {

      constructor(props) {
            super(props);
      }

      render() {
            let { routes } = this.props

            return (
                  <div style={{ minHeight: '87vh', backgroundColor: 'rgba(234, 236, 238 ,0.9)', borderRadius: '1vh' }}>
                        <div ><MyUpLoadFile/></div>
                  </div>
            )
      }
}

export default Index;