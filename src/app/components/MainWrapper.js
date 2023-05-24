import React from 'react';

const MainWrapper = ({ title, children }) => {
  return (
    <div className="main-page">
      <div className="main-title">
        <h3>{title}</h3>
      </div>
      <div className="main-body">{children}</div>
    </div>
  );
};

export default MainWrapper;
