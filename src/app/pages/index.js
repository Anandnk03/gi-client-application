import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import HomePage from './HomePage';
import TestPage from './TestPage';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/NavBar';

const Index = () => {
  const menuItems = [
    {
      path: '/',
      element: <Dashboard />,
    },

    {
      path: '/PlanEntry',
      element: <TestPage />,
    },
    {
      path: '/home',
      element: <HomePage />,
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
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
