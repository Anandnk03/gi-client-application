import React, { Component } from 'react';
import CanvasJSReact from '../../assets/chartFils/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class DoughnutChart extends Component {
  render() {
    const options = {
      animationEnabled: true,
      //   title: {
      //     text: 'Customer Satisfaction',
      //   },
      subtitles: [
        {
          text: '71% Positive',
          verticalAlign: 'center',
          fontSize: 24,
          dockInsidePlotArea: true,
        },
      ],
      data: [
        {
          type: 'doughnut',
          showInLegend: true,
          indexLabel: '{name}: {y}',
          yValueFormatString: "#,###'%'",
          dataPoints: [
            { name: 'Machine', y: 5 },
            { name: 'Method', y: 31 },
            { name: 'Material', y: 40 },
            { name: 'Man', y: 17 },
          ],
        },
      ],
    };
    return (
      <div>
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}
export default DoughnutChart;
