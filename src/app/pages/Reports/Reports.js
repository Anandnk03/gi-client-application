import React from 'react';
import ChartLine from '../Layout/ChartLine';
import DoughnutChart from '../Layout/DoughnutChart';
import BarChart from '../Layout/BarChart';
import ProgressChart from '../Layout/ProgressChart';
import MainWrapper from '../../components/MainWrapper';


const Reports = () => {
  return (
    <>
      <MainWrapper title="Production">
        <main class="content">
          <div class="container-fluid p-0">
            <div class="mb-3">
              <div className="row">
                <div className="col-12" style={{ textAlign: 'right' }}>
                  <button className="btn btn-outline-dark text-right">
                    Select Your Machine
                  </button>
                </div>
              </div>
            </div>
            <div class="row">

              <div class="card flex-fill w-100">

                <div class="chart">
                  {/* <canvas id="chartjs-line"></canvas> */}
                  <ChartLine />
                </div>
              </div>
            </div>
          </div>
        </main>
      </MainWrapper>
    </>
  );
};

export default Reports;
