import React, { Component } from 'react';
import CanvasJSReact from '../../assets/chartFils/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class BarChart extends Component {
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
      data: [
        {
          // Change type to "doughnut", "line", "splineArea", etc.
          type: 'column',
          name: 'Plan',
          titleFontColor: '#51CDA0',
          lineColor: '#51CDA0',
          labelFontColor: '#51CDA0',
          tickColor: '#51CDA0',
          dataPoints: [
            { label: 'Jan', y: 19, color: 'blue' },
            { label: 'Feb', y: 16 },
            { label: 'Mar', y: 16 },
            { label: 'Apr', y: 16 },
            { label: 'May', y: 16 },
            { label: 'Jun', y: 16 },
          ],
        },
        {
          // Change type to "doughnut", "line", "splineArea", etc.
          type: 'column',
          name: 'Actual',
          dataPoints: [
            { label: 'Jan', y: 19, color: 'green' },
            { label: 'Feb', y: 16 },
            { label: 'Mar', y: 16 },
            { label: 'Apr', y: 16 },
            { label: 'May', y: 16 },
            { label: 'Jun', y: 16 },
          ],
        },
      ],
    };

    return (
      <div>
        <CanvasJSChart options={options} />
      </div>
    );
  }
}

export default BarChart;
