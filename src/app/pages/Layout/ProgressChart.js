import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import GaugeChart from 'react-gauge-chart';

const ProgressChart = ({ oeeData }) => {

  return (
    <>
      <GaugeChart
        id="gauge-chart2"
        nrOfLevels={20}
        percent={oeeData}
        textColor="#0a0202"
        animDelay="1"
      />
    </>
  );
};

export default ProgressChart;
