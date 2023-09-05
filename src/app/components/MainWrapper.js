import React, { useState } from 'react';
import {Route,Routes, useNavigate} from 'react-router-dom';
import Component from '../pages/Component';


const MainWrapper = ({ title, children,moduleComponent, setModuleComponent,handleAddbtn,handleModuleComponent,handleModuleOperation,handleModuleMachine}) => {

  const navigate = useNavigate();
  const[screen,setscreen]= useState('')

  
  // const setModuleComponent(1) =()=>{
  //   setscreen('component')
  // }

  // const handleOperation = ()=>{
  //   setscreen('operation')
  // }

  // const handleMachine =()=>{
  //   setscreen('machineOperation') 
  // }


  return (
    <div className="main-page">
      <div className="main-title">
        <h3>{moduleComponent === 1 ? 'Component': moduleComponent === 2 ? 'Operation' : moduleComponent === 3 ? 'Machine Operation' : null}</h3>
       
        <div className='btn_sec'>
        {moduleComponent ===1||moduleComponent ===2||moduleComponent ===3&&(
        <div className="btn-group component_btn_grp">
        <button type="button" className="btn" onClick={handleModuleComponent}>Component</button>
        <button type="button" className="btn" onClick={handleModuleOperation} >Operation</button>
        <button type="button" className="btn" onClick={handleModuleMachine} >Machine</button>
      </div>
        )}
  <button className='btn btn-dark ms-2 sidebar_btn' onClick={handleAddbtn}>Add Component</button>
        </div>
       </div>
      <div className="main-body">{children}</div>
    </div>
  );
};

export default MainWrapper;
