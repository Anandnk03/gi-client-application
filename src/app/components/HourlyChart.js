import React, { Component } from 'react';
import CanvasJSReact from '../assets/chartFils/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class Chart extends Component {
  constructor() {
    super();
    this.toggleDataSeries = this.toggleDataSeries.bind(this);
    this.addSymbols = this.addSymbols.bind(this);
  }

  addSymbols(e) {
    var suffixes = ['', 'K', 'M', 'B'];
    var order = Math.max(
      Math.floor(Math.log(Math.abs(e.value)) / Math.log(1000)),
      0
    );
    if (order > suffixes.length - 1) order = suffixes.length - 1;
    var suffix = suffixes[order];
    return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
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
      animationEnabled: true,
      colorSet: 'colorSet2',
      backgroundColor: 'white',

      toolTip: {
        shared: true,
      },
      legend: {
        cursor: 'pointer',
        itemclick: this.toggleDataSeries,
        verticalAlign: 'top',
      },
      axisY: {
        title: 'Plan',
        suffix: '',
      },
      axisX: {
        title: 'Production Hours',
        suffix: '',
        //labelPlacement: 'inside',
      },

      data: [
        {
          type: 'column',
          name: 'Actual',
          showInLegend: true,
          indexLabel: '{y}',
          indexLabelPlacement: 'outside',
          indexLabelOrientation: 'horizontal',
          dataPoints: this.props.actual,
        },
        {
          type: 'spline',
          name: 'Plan',
          showInLegend: true,
          indexLabel: '{y}',
          indexLabelPlacement: 'outside',
          indexLabelOrientation: 'horizontal',
          dataPoints: this.props.dataPoints,
        },
        {
          type: 'line',
          name: 'Gap',
          showInLegend: true,
          indexLabel: '{y}',
          indexLabelPlacement: 'outside',
          indexLabelOrientation: 'horizontal',
          dataPoints: this.props.gapData,
        },
      ],
    };
    const containerProps = {};
    return (
      <div>
        <CanvasJSChart
          options={options}
          onRef={(ref) => (this.chart = ref)}
          containerProps={{
            width: '100%',
            height: '265px',
          }}
        />
      </div>
    );
  }
}
export default Chart;
