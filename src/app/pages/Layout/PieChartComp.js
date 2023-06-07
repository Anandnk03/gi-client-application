import React from 'react';
import Chart from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

const PieChartComp = ({ data }) => {
  const colors = [
    '#7dcad8',
    '#e5e5e1',
    '#d3d3e1',
    '#94c4ab',
    '#f4c6c5',
    '#f4bc2c',
    '#7dcad8',
  ];

  const state = {
    labels: data.labels,
    datasets: [
      {
        label: 'OEE',
        fill: false,
        lineTension: 0.1,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 4,
        data: data.data,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          boxWidth: 2,
          boxHeight: 2,
        },
      },
    },

    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  };
  return (
    <div className="card  mt-3">
      <div className="card-body">
        <div className="graph-card-title">
          <h3>{data.title}</h3>
        </div>
        <Doughnut height={data.height} data={state} options={options} />
      </div>
    </div>
  );
};

export default PieChartComp;
