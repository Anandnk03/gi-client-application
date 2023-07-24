import React, { Component } from 'react';
import CanvasJSReact from '../../assets/chartFils/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ChartLine extends Component {
  constructor() {
    super();
    this.toggleDataSeries = this.toggleDataSeries.bind(this);
  }

  toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === 'undefined' || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    this.chart.render();
  }

  render() {
    const options = {
      theme: 'light2',
      animationEnabled: true,
      //   title: {
      //     text: 'Units Sold VS Profit',
      //   },
      subtitles: [
        // {
        //   text: 'Click Legend to Hide or Unhide Data Series',
        // },
      ],
      axisX: {
        title: 'Month',
      },
      axisY: {
        // title: 'Units Sold',
        titleFontColor: '#6D78AD',
        lineColor: '#6D78AD',
        labelFontColor: '#6D78AD',
        tickColor: '#6D78AD',
      },
      axisY2: {
        // title: 'Profit in USD',
        titleFontColor: '#51CDA0',
        lineColor: '#51CDA0',
        labelFontColor: '#51CDA0',
        tickColor: '#51CDA0',
      },
      axisY3: {
        // title: 'Profit in USD',
        titleFontColor: '#51CDA0',
        lineColor: '#51CDA0',
        labelFontColor: '#51CDA0',
        tickColor: '#51CDA0',
      },
      toolTip: {
        shared: true,
      },
      legend: {
        cursor: 'pointer',
        itemclick: this.toggleDataSeries,
      },
      data: [
        {
          type: 'spline',
          name: 'Plan',
          showInLegend: true,
          //   xValueFormatString: 'MMM YYYY',
          //   yValueFormatString: '#,##0 Units',
          dataPoints: [
            { y: 19, label: 'Jan' },
            { y: 16, label: 'Feb' },
            { y: 16, label: 'Mar' },
            { y: 16, label: 'Apr' },
            { y: 15, label: 'May' },
            { y: 13, label: 'Jun' },
            { y: 14, label: 'Jul' },
            { y: 13, label: 'Aug' },
            { y: 15, label: 'Sep' },
            { y: 15, label: 'Oct' },
            { y: 17, label: 'Nov' },
            { y: 17, label: 'Dec' },
          ],
        },
        {
          type: 'spline',
          name: 'Actual',
          axisYType: 'secondary',
          showInLegend: true,
          //   xValueFormatString: 'MMM YYYY',
          //   yValueFormatString: '$#,##0.#',
          dataPoints: [
            { x: 0, y: 10 },
            { x: 1, y: 5 },
            { x: 2, y: 4 },
            { x: 3, y: 13 },
            { x: 4, y: 93 },
            { x: 5, y: 29 },
            { x: 6, y: 43 },
            { x: 7, y: 56 },
            { x: 8, y: 12 },
            { x: 9, y: 16 },
            { x: 10, y: 17 },
            { x: 11, y: 14 },
          ],
        },
        {
          type: 'spline',
          name: 'Gap',
          axisYType: 'secondary',
          showInLegend: true,
          //   xValueFormatString: 'MMM YYYY',
          //   yValueFormatString: '$#,##0.#',
          dataPoints: [
            { x: 0, y: 120 },
            { x: 1, y: 135 },
            { x: 2, y: 144 },
            { x: 3, y: 103 },
            { x: 4, y: 93 },
            { x: 5, y: 129 },
            { x: 6, y: 143 },
            { x: 7, y: 156 },
            { x: 8, y: 122 },
            { x: 9, y: 106 },
            { x: 10, y: 137 },
            { x: 11, y: 142 },
          ],
        },
      ],
    };

    return (
      <div>
        <CanvasJSChart options={options} onRef={(ref) => (this.chart = ref)} />
      </div>
    );
  }
}

export default ChartLine;
