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
      backgroundColor: 'azure',
      toolTip: {
        shared: true,
      },
      legend: {
        cursor: 'pointer',
        itemclick: this.toggleDataSeries,
        verticalAlign: 'top',
      },
      data: [
        {
          type: 'column',
          name: 'Plan',
          showInLegend: true,
          dataPoints: this.props.datapoints,
        },
        {
          type: 'area',
          name: 'Actual',
          markerBorderColor: 'azure',
          markerBorderThickness: 1,
          showInLegend: true,
          dataPoints: this.props.actual,
          // dataPoints:'200',

        },
        {
          type: 'line',
          name: 'Gap',
          showInLegend: true,
          dataPoints: this.props.gapData,
          // dataPoints:'200',
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
export default Chart;
