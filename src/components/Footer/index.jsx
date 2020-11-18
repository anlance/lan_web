import React from 'react';
import { BugOutlined } from '@ant-design/icons';
import './index.css'
import { Layout } from 'antd';
const { Footer } = Layout;



class MyFooter extends React.Component {

      constructor(props) {
            super(props);
            this.state = {
                  curTime: new Date()
            };
      }

      componentDidMount() {
            this.timer = setInterval(
                  () => this.trick(), 1000
            );
      }

      componentWillUnmount() {
            clearInterval(this.timer);
      }


      trick() {
            this.setState({
                  curTime: new Date(),
                  top:"1"
            });
      }

      render() {

            // 时间
            let defaultTime = '2020/11/14 21:32:00';
            let curTime = this.state.curTime;
            let date = curTime.getTime() - new Date(defaultTime).getTime();
            let day = Math.floor(date / (24 * 3600 * 1000));
            date = date % (24 * 3600 * 1000);
            let hour = Math.floor(date / (3600 * 1000));
            date = date % (3600 * 1000);
            let minute = Math.floor(date / (60 * 1000));
            date = date % (60 * 1000);
            let second = Math.floor(date / 1000);
            
            // 心跳
            let heart = <BugOutlined style={{animation: 'heart 1s infinite', paddingLeft:'3px'}}/>;


            return (
                  <Footer className="Footer" >
                        <span>已见这世界 {day} 天 {hour} 小时 {minute} 分 {second} 秒 </span>
                        {heart}
                  </Footer>
            )
      }
}

export default MyFooter;