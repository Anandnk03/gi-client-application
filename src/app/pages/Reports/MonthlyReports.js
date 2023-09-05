import React from 'react';
import ChartLine from '../Layout/ChartLine';
import DoughnutChart from '../Layout/DoughnutChart';
import BarChart from '../Layout/BarChart';
import ProgressChart from '../Layout/ProgressChart';


const MonthlyReports = () => {
  return (
    <>
      <main class="content">
        <div class="container-fluid p-0">
          <div class="mb-3">
            <div className="row">
              <div className="col-6">
                <h1 class="h3 d-inline align-middle">Production </h1>
              </div>
              <div className="col-6" style={{ textAlign: 'right' }}>
                <button className="btn btn-outline-dark text-right">
                  Select Your Machine
                </button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-lg-6">
              <div class="card flex-fill w-100">
                <div class="card-header">
                  <h5 class="card-title">Line Chart</h5>
                </div>
                <div class="card-body">
                  <div class="chart">
                    {/* <canvas id="chartjs-line"></canvas> */}
                    <ChartLine />
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12 col-lg-6">
              <div class="card">
                <div class="card-header">
                  <h5 class="card-title">Monthly Production</h5>
                </div>
                <div class="card-body">
                  <div class="chart">
                    <BarChart />
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div class="col-12 col-lg-6 mt-1">
              <div class="card">
                <div class="card-header">
                  <h5 class="card-title">Gap Reason</h5>
                </div>
                <div class="card-body">
                  <div class="chart chart-sm">
                    <DoughnutChart />
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12 col-lg-6 mt-1">
              <div class="card">
                <div class="card-header">
                  <h5 class="card-title">OEE</h5>
                </div>
                <div class="card-body text-center">
                  <div class="chart chart-sm">
                    <div className="row">
                      <div className="col-12 progressChart">
                        <ProgressChart oeeData={0.8} />
                      </div>
                      <div className="col-4 mt-1">
                        <label className="text-center">Availability</label>
                        <ProgressChart oeeData={0.4} />
                      </div>
                      <div className="col-4 mt-1">
                        <label className="text-center">Performance</label>
                        <ProgressChart oeeData={0.6} />
                      </div>
                      <div className="col-4 mt-1">
                        <label className="text-center">Quality</label>
                        <ProgressChart oeeData={0.9} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MonthlyReports;
