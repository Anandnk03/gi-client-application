import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import GapReason from './GapReason';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/NavBar';
import Plan from './Plan';
import RegisterScreen from './RegisterScreen';
import DownTime from './DownTime';
import Rejection from './Rejection';
import Component from './Component'
import HourlyDashBoard from './HourlyDashBoard';
import MonthlyReports from './Reports/MonthlyReports';
import Role from './Role';
import User from './User';
import Operation from './Operation';
import MachineOperation from './MachineOperation';



const Index = () => {
  const menuItems = [
    {
      path: '/component',
      element: <Component />,
    },
    {
      path: '/operation',
      element: <Operation />,
    },
    {
      path: '/machine_operation',
      element: <MachineOperation />,
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
    },
    {
      path: '/hourlyDashboard',
      element: <HourlyDashBoard />,
    },
    {
      path: '/PlanEntry',
      element: <Plan />,
    },
    {
      path: '/reason',
      element: <GapReason />,
    },
    {
      path: '/downtime',
      element: <DownTime />,
    },
    {
      path: '/rejection',
      element: <Rejection />,
    },
    {
      path: '/monthlyReports',
      element: <MonthlyReports />,
    },
    {
      path: '/role',
      element: <Role />,
    },
    {
      path: '/user',
      element: <User />,
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
    {
      path: '/register',
      element: <RegisterScreen />
    },


  ];

  return (
    <div className="main-wrapper">
      <Sidebar />
      <div className="main-layout">
        <NavBar />
        <div className="content-wrapper">
          <Routes>
            {menuItems &&
              menuItems.map(({ path, element }) => (
                <Route path={path} element={element} />
              ))}
          </Routes>
        </div>
      </div>
    </div>
  );
};
export default Index;
