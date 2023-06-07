import React, { useState, useEffect } from 'react';
import ProgressChart from './Layout/ProgressChart';
import HourlyChart from '../components/HourlyChart'
import ProgressBar from './Layout/OeeChart';

const Dashboard = () => {
  const [hourly, setHourly] = useState([]);

  const datapoints = hourly;

  return (
    <>
      <div className="oee-dashboard">
        <div className="header_bar">
          <h2>Compressor Motor-158</h2>
        </div>
      </div>
      <div className="production-dashboard">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 col-md-12 col-sm-12">
              <div className="card-detils">
                <div className="cards">
                  <div className="production-detils">
                    <div className="row text-center">
                      <div className="col-4">
                        <label>Shift Date</label>
                        <h5>12-12-2023</h5>
                      </div>
                      <div className="col-4">
                        <label>Shift</label>
                        <h5>1</h5>
                      </div>
                      <div className="col-4">
                        <label>Man Power</label>
                        <h5>8</h5>
                      </div>
                      <div className="line-code">
                        <hr />
                      </div>

                      <div className="col-4">
                        <label>Shift Plan</label>
                        <h5>420</h5>
                      </div>
                      <div className="col-4">
                        <label>Current Plan</label>
                        <h5>120</h5>
                      </div>
                      <div className="col-4">
                        <label>Shift Gap</label>
                        <h5>50</h5>
                      </div>
                      <div className="line-code">
                        <hr />
                      </div>
                      <div className="col-4">
                        <label>Actual Qty</label>
                        <h5>100</h5>
                      </div>
                      <div className="col-4">
                        <label>Accept Qty</label>
                        <h5>256</h5>
                      </div>
                      <div className="col-4">
                        <label>NC Qty</label>
                        <h5>10</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hourlchart">
                <h5>Hourly Production</h5>
                <HourlyChart
                  datapoints={datapoints}
                // actual={actual}
                // gapData={gapData}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12">
              <div className="oee-details">
                <div className="cardss">
                  <div className="oee-chart">
                    <label>OEE</label>
                    <ProgressChart
                    // oeeData={oeeData} 
                    />
                  </div>
                  <div className="oee-split">
                    <div className="row">
                      <div className="col-sm-4">
                        <label>Availabilty</label>
                        <ProgressBar percentage="100"
                        />
                      </div>
                      <div className="col-sm-4">
                        <label>Performance</label>
                        <ProgressBar percentage="100" />
                      </div>
                      <div className="col-sm-4">
                        <label>Quality</label>
                        <ProgressBar percentage="100" />
                      </div>
                    </div>
                  </div>
                  <div className="time-table">
                    <div className="cards">
                      {/* <h4 className="text-center">{oeeData?.machineName}</h4> */}
                      <div className="row mt-8">
                        <div className="col-4">
                          <h5>Total Time</h5>
                          <span className="time">120</span>
                        </div>
                        <div className="col-4">
                          <h5>Plan Down</h5>
                          <span className="time">
                            600
                          </span>
                        </div>
                        <div className="col-4">
                          <h5>UnPlan Down</h5>
                          <span className="time">
                            120
                          </span>
                        </div>
                        <div className="line-code">
                          <hr />
                        </div>
                        <div className="col-6">
                          <h5>Available(Mm)</h5>
                          <span className="time">120</span>
                        </div>
                        <div className="col-6">
                          <h5>Production(Mm)</h5>
                          <span className="time">120</span>
                        </div>
                        <div className="line-code">
                          <hr />
                        </div>
                        <div className="col-2"></div>
                        <div className="col-8">
                          <h5>Part Description</h5>
                          <span className="time">120</span>
                        </div>
                        <div className="col-2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="col-lg-4 col-md-12 col-sm-12">
              <div className="status">
                <div className="cards"></div>
                <h4 className="text-center">Status</h4>
                <div className="row">
                  <div className="col-3">
                    <h5>PLAN</h5>
                    <span
                      // className={
                      //   status?.PlanOK === 1
                      //     ? `plan bg-green`
                      //     : status?.PlanOK === 0
                      //       ? ` plan bg-danger `
                      //       : 'OK'
                      // }
                      className='plan bg-green'
                    >
                      OK
                    </span>
                  </div>
                  <div className="col-3">
                    <h5>FOA</h5>
                    <span
                      // className={
                      //   status?.FOAOK === 1
                      //     ? `foa bg-green`
                      //     : status?.FOAOK === 0
                      //       ? ` foa bg-danger `
                      //       : 'Not OK'
                      // }
                      className='foa bg-green'
                    >
                      {/* {status?.FOAOK === 1 ? `FOA Ok` : 'Not OK'} */}
                      OK
                    </span>
                  </div>
                  <div className="col-3">
                    <h5>PMO</h5>
                    <span
                      // className={
                      //   status?.PMOOK === 1
                      //     ? `pmo bg-green`
                      //     : status?.PMOOK === 0
                      //       ? ` pmo bg-danger `
                      //       : 'Not OK'
                      // }
                      className='pmo bg-green'
                    >
                      {/* {status?.PMOOK === 1 ? `PMO Ok` : 'Not OK'} */}
                      OK
                    </span>
                  </div>
                  <div className="col-3">
                    <h5>PYC</h5>
                    <span
                      // className={
                      //   status?.PYCOK === 1
                      //     ? `pyc bg-green`
                      //     : status?.PYCOK === 0
                      //       ? ` pyc bg-danger `
                      //       : 'Not OK'
                      // }
                      className='pyc bg-green'
                    >
                      {/* {status?.PYCOK === 1 ? `PYC Ok` : 'Not OK'} */}
                      OK
                    </span>
                  </div>
                </div>
              </div>
              <div className="gap-reason">
                <h4 className="text-center">Hourly Gap Reason</h4>
                <div className="table table-hover downtime-table">
                  <table>
                    <thead>
                      <th>Hours</th>
                      <th>Plan / Actual</th>
                      <th>GAP</th>
                      <th>Gap Reason</th>
                    </thead>
                    <tbody>

                      <tr >
                        <td>
                          {/* {item?.Hourdescripition} */}
                          1
                        </td>
                        <td>
                          {/* {item?.HOURPLAN} / {item?.HOURQTY} */}
                          120 / 100
                        </td>
                        <td>
                          {/* {item?.GAP} */}
                          20
                        </td>
                        <td>
                          {/* <textarea
                                className={'reason color' + item?.CssColor}>
                                {item?.GAPREASON}
                              </textarea> */}
                          <div
                            // className={'reason color' + item?.CssColor}
                            className='reason color'
                          >
                            <p>
                              {/* {item?.GAPREASON} */}
                              No Reason Entered
                            </p>
                          </div>
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>
                <div className="copyright">
                  © 2023, by
                  <a
                    href="https://www.embridgesolutions.in/"
                    className="colors"
                    target="_blank">
                    Embridge Solutions
                  </a>
                  Your Partner in Industry 4.0
                </div>
              </div>
              {/* <div className="np-time">
                <div className="table table-hover downtime-table">
                  <table>
                    <thead>
                      <th>NPSTART</th>
                      <th>NPEND</th>
                      <th>NPT(min)</th>
                      <th>REASON</th>
                    </thead>
                    <tbody>
                      {npt.map((item, index) => {
                        let startDate = item?.npstart?.split('T')[0];
                        let startTime = item?.npstart
                          ?.split('T')[1]
                          .split('.')[0];
                        var shiftStart = startDate + ' ' + startTime;

                        let endDate = item?.npend?.split('T')[0];
                        let endTime = item?.npend?.split('T')[1].split('.')[0];
                        let shiftEnd = endDate + ' ' + endTime;

                        return (
                          <tr key={index}>
                            <td>{shiftStart}</td>
                            <td>{shiftEnd}</td>
                            <td>{item?.NPT}</td>
                            <td>{item?.Reason}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
