import React, { lazy } from 'react';
//import Dashboard from './app/pages/Dashboard';
import './app/assets/css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { isAuthenticated } from './app/services/Helpers';
import { Navigate, Route, Routes } from 'react-router-dom';
import Index from './app/pages';

const Login = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('./app/pages/Login')), 500);
  });
});

const App = () => {
  let routes = (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* <Route path='/register' element={<Register />} /> */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
  if (isAuthenticated()) {
    return <Index />;
  } else {
    return <div>{routes}</div>;
  }
};

export default App;
