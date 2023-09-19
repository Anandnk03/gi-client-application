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
import Reports from './Reports/Reports';
import Role from './Role';
import User from './User';
import Operation from './Operation';
import MachineOperation from './MachineOperation';
import MonthlyReport from './Reports/MonthlyReport';
import GapReasonReport from './Reports/GapReasonReport';
import OeeReport from './Reports/OeeReport';
import MachineStatus from './MachineStatus';



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
      path: '/reports',
      element: <Reports />,
    },
    {
      path: '/monthly_reports',
      element: <MonthlyReport />,
    },
    {
      path: '/gapreason_reports',
      element: <GapReasonReport />,
    },
    {
      path: '/oee_reports',
      element: <OeeReport />,
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
    {
      path: '/machine_status',
      element: <MachineStatus />
    },

  ];

  return (
    <div className="main-wrapper">
      <Sidebar />
      <div className="main-layout">
        <NavBar />
        <div className="content_layout">
          <div className="content-wrapper">
            <Routes>
              {menuItems &&
                menuItems.map(({ path, element }) => (
                  <Route path={path} element={element} />
                ))}
            </Routes>
          </div>
          <div className="copyright">
            <p>&copy; Designed & Developed by <span>Embridge Solutions Pvt Ltd</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;
