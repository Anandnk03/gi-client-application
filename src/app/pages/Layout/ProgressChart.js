import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import GaugeChart from 'react-gauge-chart';

const ProgressChart = ({ oeeData }) => {
  console.log('oeeData', oeeData);
  const data = Number(oeeData) / 100;
  console.log('Data', data);
  //const percentage = 45;
  const percentage = oeeData?.OEE;
  const color =
    percentage >= 75 && percentage <= 84
      ? `orange`
      : percentage >= 85
      ? `green`
      : `red`;

  return (
    // <div>
    //   style={{
    //     width: 200,
    //     height: 200,
    //     display: 'flex',
    //     alignItems: 'center',
    //     margin: 'auto',
    //   }}>
    //   <CircularProgressbar
    //     value={percentage}
    //     text={`${percentage}%`}
    //     strokeWidth={20}
    //     // oeeData={oeeData}
    //     styles={buildStyles({
    //       textSize: '16px',
    //       pathColor: color,
    //       textColor: color,
    //       trailColor: '#d6d6d6',
    //       backgroundColor: '#3e98c7',
    //       transformOrigin: 'center center',
    //     })}
    //   />
    // </div>
    <>
      <GaugeChart
        id="gauge-chart2"
        nrOfLevels={20}
        percent={data}
        textColor="#0a0202"
        animDelay="1"
      />
    </>
  );
};

export default ProgressChart;
