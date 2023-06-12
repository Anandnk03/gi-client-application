import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import GapReason from './GapReason';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/NavBar';
import Plan from './Plan';
import RegisterScreen from './RegisterScreen';
<<<<<<< HEAD
import DownTime from './DownTime';
import Rejection from './Rejection';
=======
import HourlyDashBoard from './HourlyDashBoard';
>>>>>>> 34e02ece50c3e0c04acd0ced7fda672184b5a17f

const Index = () => {
  const menuItems = [
    {
      path: '/',
      element: <Dashboard />,
    },
    {
      path: '/hourlydashboard',
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
      path: '*',
      element: <Navigate to="/" replace />,
    },
    { path: '/register', element: <RegisterScreen /> },
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
