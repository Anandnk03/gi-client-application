import React from 'react';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const BarChartComp = ({ data }) => {
  var colors = data.data.map((da) =>
    da >= 75 && da <= 84 ? `orange` : da >= 85 ? `green` : `red`
  );
  const state = {
    labels: data.labels,
    datasets: [
      {
        label: 'Actual',
        fill: false,
        lineTension: 0.5,
        borderColor: colors,
        backgroundColor: colors,
        borderWidth: 2,
        borderRadius: 10,
        data: data.data,
      },
      {
        label: 'Plan',
        fill: false,
        lineTension: 0.5,
        backgroundColor: '#b31bf5',
        borderColor: '#b31bf5',
        borderWidth: 2,
        borderRadius: 10,
        data: data.plan,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    legend: {
      display: true,
      position: 'right',
    },

    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };
  return (
    <div className="hourlychart">
      <div className="cards" style={{ backgroundColor: 'azure' }}>
        <div className="card-body">
          <Bar height={data.height} data={state} options={options} />
          <div className="row">
            <div className="col-sm-3">
              <span
                style={{
                  backgroundColor: 'green',
                  color: 'green',
                  borderRadius: '6px',
                  fontSize: '10px',
                }}>
                above{' '}
                <span
                  style={{
                    backgroundColor: 'green',
                    color: 'black',
                    borderRadius: '6px',
                  }}>
                  Above 85%
                </span>
              </span>
            </div>
            <div className="col-sm-3">
              <span
                style={{
                  backgroundColor: 'yellow',
                  color: 'yellow',
                  borderRadius: '6px',
                  fontSize: '10px',
                }}>
                above
                <span
                  style={{
                    backgroundColor: 'yellow',
                    color: 'black',
                    borderRadius: '6px',
                  }}>
                  75% to 85 %
                </span>
              </span>
            </div>
            <div className="col-sm-3">
              <span
                style={{
                  backgroundColor: 'red',
                  color: 'red',
                  borderRadius: '6px',
                  fontSize: '10px',
                }}>
                above{' '}
                <span
                  style={{
                    backgroundColor: 'red',
                    color: 'black',
                    borderRadius: '6px',
                    textAlign: 'center',
                  }}>
                  Below 75%
                </span>
              </span>
            </div>
            <div className="col-sm-3">
              <span
                style={{
                  backgroundColor: '#b31bf5',
                  color: 'black',
                  borderRadius: '6px',
                  fontSize: '10px',
                }}>
                PLAN
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarChartComp;
