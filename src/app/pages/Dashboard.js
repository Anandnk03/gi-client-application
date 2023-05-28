import React from 'react';
import { UserRole } from '../services/Helpers';

const Dashboard = () => {
  return (
    <>
      <div className="oee-dashboard">
        <div className="container-fluid">
          <h2 className="tittle">Dashboard</h2>
          <div className="col-sm-4">
            <div className="row">
              <div className="card">
                <div className="card-header">
                  <span>Plan</span>
                  {UserRole('gapReasons', 'view') ? 'TRUE' : 'FALSE'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
