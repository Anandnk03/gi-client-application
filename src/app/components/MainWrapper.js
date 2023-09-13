import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Component from '../pages/Component';


const MainWrapper = ({ title, children, moduleComponent, handleModuleComponent, handleModuleOperation, handleModuleMachine }) => {

  const navigate = useNavigate();
  const [screen, setscreen] = useState('')
  return (
    <div className="main-page">
      <div className="main-title">
        <h3>{moduleComponent === 1 ? 'Component' : moduleComponent === 2 ? 'Operation' : moduleComponent === 3 ? 'Machine Operation' : title}</h3>
      </div>
      <div className="main-body">{children}</div>
    </div>
  );
};

export default MainWrapper;
