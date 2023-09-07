import React, { useState } from 'react';
import {Route,Routes, useNavigate} from 'react-router-dom';
import Component from '../pages/Component';


const MainWrapper = ({ title, children,moduleComponent, setModuleComponent,handleAddbtn,handleModuleComponent,handleModuleOperation,handleModuleMachine}) => {

  const navigate = useNavigate();
  const[screen,setscreen]= useState('')

  
  return (
    <div className="main-page">
      <div className="main-title">
        <h3>{moduleComponent === 1 ? 'Component': moduleComponent === 2 ? 'Operation' : moduleComponent === 3 ? 'Machine Operation' :title}</h3>
       
        <div className='btn_sec'>
       {moduleComponent === 1 ? 
        <div className="btn-group component_btn_grp">
        
        <button type="button" className="btn" onClick={handleModuleOperation} >Operation</button>
        <button type="button" className="btn" onClick={handleModuleMachine} >Machine</button>
      </div>
       :moduleComponent === 2?
       <div className="btn-group component_btn_grp">
       <button type="button" className="btn" onClick={handleModuleComponent}>Component</button>
       <button type="button" className="btn" onClick={handleModuleMachine} >Machine</button>
       </div>
       :moduleComponent === 3?
       <div className="btn-group component_btn_grp">
       <button type="button" className="btn" onClick={handleModuleComponent}>Component</button>
       <button type="button" className="btn" onClick={handleModuleOperation} >Operation</button>
       </div>
       :null
      }
      {moduleComponent === 1 ? 
        <button className='btn btn-dark ms-2 sidebar_btn' onClick={handleAddbtn}>Add Component</button>
        :null}
        </div>
       </div>
      <div className="main-body">{children}</div>
    </div>
  );
};

export default MainWrapper;
