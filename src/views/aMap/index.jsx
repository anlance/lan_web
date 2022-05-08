import React from 'react';
import { Map, APILoader, Polyline, Geolocation } from '@uiw/react-amap';
import { GET } from "../../api/http";
import { URL } from '../../api/url';
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            aMapKey: window.localStorage.getItem('aMapKey'),
            path: null
        }
        this.getPath();
    }

    /**
     * 获取定位数组
     */
    getPath = (startTime, endTime) => {
        let vo = {
            startTime: startTime,
            endTime: endTime
        }
        GET(URL.basicUrl.getPath, vo)
            .then(response => {
                if (response.success === true) {
                    this.setState({
                        path: response.data
                    })
                }
            });
    }

    onChange = (dates, dateStrings) => {
        // console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dates);
        // console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        console.log('From: ', dateStrings);
        this.getPath(dateStrings[0],dateStrings[1]);
    }

    render() {

        return (


            <div style={{ width: '100%', height: '85vh' }}>
                <APILoader version="2.0.5" akay={this.state.aMapKey}>
                    <Geolocation
                        // 是否使用高精度定位，默认:true
                        enableHighAccuracy={true}
                        // 超过10秒后停止定位，默认：5s
                        timeout={10000}
                        // 定位按钮的停靠位置
                        buttonPosition="RB"
                        // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                        // buttonOffset={new AMap.Pixel(10, 20)}
                        // 定位成功后是否自动调整地图视野到定位点
                        zoomToAccuracy={true}
                        onComplete={(data) => {
                            console.log('返回数据：', data);
                            // setData(data);
                        }}
                        onError={(data) => {
                            console.log('错误返回数据：', data);
                            // setData(data);
                        }} />

                    <RangePicker
                        ranges={{
                            Today: [moment(), moment()],
                            'This Month': [moment().startOf('month'), moment().endOf('month')],
                        }}
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        onChange={this.onChange}
                        style={{marginBottom: '20px'}}
                    />

                    <Map >
                        <Polyline
                            visiable={true}
                            strokeOpacity={1}
                            strokeWeight={8}
                            lineJoin={'round'}
                            lineCap={'round'}
                            showDir={true}
                            path={this.state.path}
                        />
                    </Map>
                </APILoader>
            </div>
        )
    }
}

export default Index;