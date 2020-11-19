import React from 'react';
import { Avatar, Image } from 'antd';
import imgURL from '../../assets/img/avatar.jpg';



class MyAvatar extends React.Component {

      constructor(props) {
            super(props);
      }

      render() {

            return (
                  <Avatar
                        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 200 }}
                        src={<Image src={imgURL} />}
                  />
            )
      }
}
export default MyAvatar;