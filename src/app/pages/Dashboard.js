import React, { useState, useEffect } from 'react';
import ProgressChart from './Layout/ProgressChart';
import HourlyChart from '../components/HourlyChart';
import ProgressBar from './Layout/OeeChart';
import MenuModal from './Layout/Modals';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { department, machine } from '../redux/commSlice';
import SelectInput from '../components/SelectInput';
import { fetchData } from '../redux/dashboard';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [isPastData, setIsPastData] = useState(false);

  const initialValue = {};
  const [formData, setFromData] = useState(initialValue);

  const {
    status: machineStatus,
    dataOptions,
    departmentStatus,
    machineOption,
  } = useSelector((state) => state.comm);
  const { data } = useSelector((state) => state.dashboard);

  let actualData = [];
  let hourlyPlan = [];
  let gapData = [];

  data?.HourlyData?.map((resData) => {
    const newData = {
      label: resData?.Hourdescripition,
      y: resData?.HOURPLAN,
    };
    const Actual = {
      y: resData?.HOURQTY,
    };
    const gap = {
      y: resData?.GAP,
    };

    actualData.push(Actual);
    hourlyPlan.push(newData);
    gapData.push(gap);
  });

  let oeeData = [];
  let AvailableEff = [];
  let ProductionEff = [];
  let QualityEff = [];
  let machineName = [];
  let totalTime = [];
  let PlannedDownTime = [];
  let UnPlannedDownTime = [];
  let ProductionHrs = [];
  let AvailableHrs = [];
  let shift = [];
  let shiftDate = [];
  let NCQty = [];
  data?.oeeData?.map((item) => {
    oeeData.push(item?.OEE);
    AvailableEff.push(item?.AvailableEff);
    ProductionEff.push(item?.ProductionEff);
    QualityEff.push(item?.QualityEff);
    machineName.push(item?.machineName);
    totalTime.push(item?.ElapsedTime);
    PlannedDownTime.push(item?.PlannedDownTime);
    UnPlannedDownTime.push(item?.UnPlannedDownTime);
    ProductionHrs.push(item?.ProductionHrs);
    AvailableHrs.push(item?.AvailableHrs);
    shift.push(item?.Shift);
    shiftDate.push(item?.ShiftDate);
    NCQty.push(item?.NCQty);
  });

  let actual = [];
  let currentPlan = [];
  let manPower = [];
  let partNumber = [];
  let rejQty = [];
  let shiftPlan = [];
  data?.LiveData?.map((item) => {
    actual.push(item?.actual);
    currentPlan.push(item?.currentplan);
    manPower.push(item?.manpower);
    partNumber.push(item?.partnumber);
    rejQty.push(item?.rejeqty);
    shiftPlan.push(item?.shiftplan);
  });

  const handleMenu = (e) => {
    setShow(true);
  };

  const handleClick = () => {
    setIsPastData(!isPastData);
  };
  const handleMachine = (e) => {
    dispatch(machine(e.value));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchData(formData));
    setFromData(initialValue);
    setShow(false);
    setIsPastData(false);
  };
  const handleChange = (e) => {
    setFromData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (machineStatus === 'idle') dispatch(machine());
    if (departmentStatus === 'idle') dispatch(department());
    if (show === false && departmentStatus === 'idle') setShow(true);
  }, [dispatch]);
  return (
    <>
      <div className="oee-dashboard">
        <div className="header_bar">
          <h2>{machineName}</h2>
          <button
            className="btn btn-outline-dark text-right"
            onClick={handleMenu}>
            Select Your Machine
          </button>
        </div>
      </div>
      <div className="production-dashboard">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 col-md-12 col-sm-12">
              <div className="card-details">
                <div className="cards">
                  <div className="production-detils">
                    <div className="row text-center">
                      <div className="col-4">
                        <label>Shift Date</label>
                        <h5>{shiftDate}</h5>
                      </div>
                      <div className="col-4">
                        <label>Shift</label>
                        <h5>{shift}</h5>
                      </div>
                      <div className="col-4">
                        <label>Man Power</label>
                        <h5>{manPower}</h5>
                      </div>
                      <div className="line-code">
                        <hr />
                      </div>
                      <div className="col-4">
                        <label>Shift Plan</label>
                        <h5>{shiftPlan}</h5>
                      </div>
                      <div className="col-4">
                        <label>Current Plan</label>
                        <h5>{currentPlan}</h5>
                      </div>
                      <div className="col-4">
                        <label>Shift Gap</label>
                        <h5>{Number(actual) - Number(shiftPlan)}</h5>
                      </div>
                      <div className="line-code">
                        <hr />
                      </div>
                      <div className="col-4">
                        <label>Actual Qty</label>
                        <h5>{actual}</h5>
                      </div>
                      <div className="col-4">
                        <label>Accept Qty</label>
                        <h5>{actual - NCQty}</h5>
                      </div>
                      <div className="col-4">
                        <label>NC Qty</label>
                        <h5>{NCQty}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hourlchart">
                <h5>Hourly Production</h5>
                <HourlyChart
                  dataPoints={hourlyPlan}
                  actual={actualData}
                  gapData={gapData}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12">
              <div className="oee-details">
                <div className="cardss">
                  <div className="oee-chart">
                    <label>OEE</label>
                    <ProgressChart oeeData={oeeData} />
                  </div>
                  <div className="oee-split">
                    <div className="row">
                      <div className="col-sm-4 ava">
                        <label>Availability</label>
                        <ProgressBar percentage={AvailableEff} />
                      </div>
                      <div className="col-sm-4">
                        <label>Performance</label>
                        <ProgressBar percentage={ProductionEff} />
                      </div>
                      <div className="col-sm-4">
                        <label>Quality</label>
                        <ProgressBar percentage={QualityEff} />
                      </div>
                    </div>
                  </div>
                  <div className="time-table">
                    <div className="cards">
                      {/* <h4 className="text-center">{oeeData?.machineName}</h4> */}
                      <div className="row mt-8">
                        <div className="col-4">
                          <h5>Total Time</h5>
                          <span className="time">{totalTime}</span>
                        </div>
                        <div className="col-4">
                          <h5>Plan Down</h5>
                          <span className="time">{PlannedDownTime}</span>
                        </div>
                        <div className="col-4">
                          <h5>UnPlan Down</h5>
                          <span className="time">{UnPlannedDownTime}</span>
                        </div>
                        <div className="line-code">
                          <hr />
                        </div>
                        <div className="col-6">
                          <h5>Available(Mm)</h5>
                          <span className="time">{AvailableHrs}</span>
                        </div>
                        <div className="col-6">
                          <h5>Production(Mm)</h5>
                          <span className="time">{ProductionHrs}</span>
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
                      {data?.HourlyData?.map((item) => {
                        return (
                          <tr>
                            <td> {item?.Hourdescripition}</td>
                            <td>
                              {item?.HOURPLAN} / {item?.HOURQTY}
                            </td>
                            <td>{item?.GAP}</td>
                            <td>
                              <div className={'reason color' + item?.CssColor}>
                                <p>{item?.GAPREASON}</p>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MenuModal handleClose={handleClose} show={show}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Select Your Machine Name. *If PassData Click CheckBox
          </Modal.Title>
        </Modal.Header>
        <form action="/dashboard/" method="get" onSubmit={handleSearch}>
          <div className="modal-form">
            <div className="row">
              <div className="col-4 mt-1">
                <SelectInput
                  options={dataOptions}
                  placeholder="Select You Department"
                  handleChange={handleMachine}
                  name="value"
                />
              </div>
              <div className="col-6 mt-1">
                <SelectInput
                  options={machineOption}
                  handleChange={(e) => {
                    setFromData({ ...formData, id: e.value });
                  }}
                />
              </div>
              <div className="col-2 mt-3">
                <span>PassData</span>
                &nbsp;
                <input
                  class="form-check-input"
                  checked={isPastData}
                  type="checkbox"
                  onClick={handleClick}
                />
              </div>
              {isPastData && (
                <>
                  <div className="col-6" style={{ marginBottom: '10px' }}>
                    <span>Shift Date</span>
                    <input
                      label="Date"
                      placeholder="Please add date"
                      name="sDate"
                      className="form-control"
                      type="Date"
                      value={formData.sDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-6" style={{ marginBottom: '10px' }}>
                    <span>Shift</span>
                    <select
                      name="shift"
                      value={formData.shift}
                      onChange={handleChange}
                      className="form-control">
                      <option>----Select Shift---</option>
                      <option value="1">A</option>
                      <option value="2">B</option>
                      <option value="3">C</option>
                    </select>
                  </div>
                </>
              )}
            </div>
          </div>
          <Modal.Footer>
            <Button type="submit">View</Button>
          </Modal.Footer>
        </form>
      </MenuModal>
    </>
  );
};

export default Dashboard;
