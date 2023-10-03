import React from 'react';

const MainWrapper = ({ title, children, type, handleMachineName }) => {
  return (
    <div className="main-page">
      <div className="main-title">
        <h3>{title}</h3>
        {type === 'true' ? (
          <div className="select-machine">
            <button
              className="btn btn-outline-dark text-right"
              onClick={handleMachineName}>
              Select Your Machine
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
      <div className="main-body">{children} </div>
    </div>
  );
};

export default MainWrapper;
