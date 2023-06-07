import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const OeeChart = ({ percentage }) => {
  const color =
    percentage >= 75 && percentage <= 84
      ? `orange`
      : percentage >= 85
      ? `green`
      : `red`;
  return (
    <div
      style={{
        width: 125,
        height: 130,
        display: 'flex',
        alignItems: 'center',
        margin: 'auto',
      }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        strokeWidth={15}
        percentage={percentage}
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

export default OeeChart;
