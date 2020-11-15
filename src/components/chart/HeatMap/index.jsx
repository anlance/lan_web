import React from 'react';
import echarts from 'echarts/lib/echarts';
// import echartTheme from './../themeLight';
import ReactEcharts from 'echarts-for-react';
import { Card } from 'antd';


function getVirtulData(year) {
      year = year || '2017';
      var date = +echarts.number.parseDate(year + '-01-01');
      var end = +echarts.number.parseDate((+year + 1) + '-01-01');
      var dayTime = 3600 * 24 * 1000;
      var data = [];
      for (var time = date; time < end; time += dayTime) {
            data.push([
                  echarts.format.formatTime('yyyy-MM-dd', time),
                  Math.floor(Math.random() * 10000)
            ]);
      }
      return data;
}


export default class Line extends React.Component {
      // componentWillMount() {
      //       //主题的设置要在willmounted中设置
      //       echarts.registerTheme('Imooc', echartTheme);
      // }


      getOption = () => {
            let option = {
                  title: {
                        top: 0,
                  },
                  tooltip: {},
                  visualMap: {
                        min: 0,
                        max: 10000,
                        type: 'piecewise',
                        orient: 'horizontal',
                        left: 'center',
                        top: 0,
                        textStyle: {
                              color: '#000'
                        }
                  },
                  calendar: {
                        top: 50,
                        left: 30,
                        right: 30,
                        cellSize: ['auto', 18],
                        range: '2016',
                        itemStyle: {
                              borderWidth: 0.5
                        },
                        yearLabel: { show: false }
                  },
                  series: {
                        type: 'heatmap',
                        coordinateSystem: 'calendar',
                        data: getVirtulData(2016)
                  }
            };
            return option
      }

      render() {
            return (
                  <ReactEcharts option={this.getOption()} theme="Imooc" style={{ height: '190px' }} />
            )
      }
}
