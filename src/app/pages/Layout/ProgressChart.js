import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressChart = ({ oeeData }) => {
  //const percentage = 45;
  const percentage = oeeData?.OEE;
  const color =
    percentage >= 75 && percentage <= 84
      ? `orange`
      : percentage >= 85
        ? `green`
        : `red`;

  return (
    <div
      style={{
        width: 200,
        height: 200,
        display: 'flex',
        alignItems: 'center',
        margin: 'auto',
      }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        strokeWidth={20}
        // oeeData={oeeData}
        styles={buildStyles({
          textSize: '16px',
          pathColor: color,
          textColor: color,
          trailColor: '#d6d6d6',
          backgroundColor: '#3e98c7',
          transformOrigin: 'center center',
        })}
      />
    </div>
  );
};

export default ProgressChart;
