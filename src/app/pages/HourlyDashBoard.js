import React, { useEffect, useState } from 'react';
import MenuModal from './Layout/Modals';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { department, machine } from '../redux/commSlice';
import SelectInput from '../components/SelectInput';
import { hourlyData } from '../redux/dashboard';

const HourlyDashBoard = () => {
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
  const { hourly } = useSelector((state) => state.dashboard);
  /// api

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
    dispatch(hourlyData(formData));
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

  const unique = [];
  const distinct = [];
  const shift = [];
  const Machine = [];
  for (let i = 0; i < hourly.length; i++) {
    if (!unique[hourly[i].MACHINENAME]) {
      distinct.push(hourly[i].MACHINENAME);
      shift.push(hourly[i].SHIFT);
      Machine.push(hourly[i].MACHINEBAY);
      unique[hourly[i].MACHINENAME] = 1;
    }
  }

  const filteredData = [];
  distinct.map((dis, index) => {
    const filter = hourly.filter((item) => item.MACHINENAME === dis);
    filteredData.push({
      title: dis,
      Machine: Machine[index],
      shift: shift[index],
      values: filter,
    });
  });

  useEffect(() => {
    if (machineStatus === 'idle') dispatch(machine());
    if (departmentStatus === 'idle') dispatch(department());
    if (show === false && departmentStatus === 'idle') setShow(true);
  }, [dispatch]);

  return (
    <>
      <div className="oee-dashboard">
        <div className="header_bar">
          <h2>Hourly Production Dashboard</h2>
          <button
            className="btn btn-outline-dark text-right"
            onClick={handleMenu}>
            Select Your Machine
          </button>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          {filteredData?.map((item, index) => {
            let plans_total = 0;
            let actual_total = 0;
            let gap_total = 0;
            return (
              <div className="col-sm-6 col-lg-6 col-md-6 " key={index}>
                <div className="card mt-3">
                  <div className="card-header">
                    <div className="row">
                      <div className="col-9">
                        <span>
                          {item.title}-{item.machine}
                        </span>
                      </div>
                      <div className="col-3">
                        <span>Shift: {item.shift}</span>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <table className="table table-striped table-bordered table-condensed">
                      <tbody>
                        <tr>
                        <th>Hours</th>
                          {item?.values?.map((da, index) => {
                            return <td key={index}>{da.HOURDESCRIPITION}</td>;
                          })}
                          <th>Total</th>
                        </tr>
                        <tr>
                          <th>Plan</th>
                          {item?.values?.map((da, index) => {
                            plans_total = Number(plans_total) + Number(da.Plan);
                            return da.Plan > 0 ? (
                              <td key={index}>{da.Plan}</td>
                            ) : (
                              ''
                            );
                          })}
                          {plans_total > 0 ? (
                            <td className="totalAll">{plans_total}</td>
                          ) : (
                            <td colSpan="10" className="tdNoPlan">
                              No Plan !
                            </td>
                          )}
                        </tr>
                        <tr>
                          <th>Actual</th>
                          {item?.values?.map((da, index) => {
                            actual_total =
                              Number(actual_total) + Number(da.Actual);
                            return (
                              <td key={index} className="styleactual">
                                {da.Actual}
                              </td>
                            );
                          })}
                          <td className="totalall">{actual_total}</td>
                        </tr>
                        <tr className="status">
                          <th>Gap</th>
                          {item?.values?.map((da, index) => {
                            gap_total = Number(gap_total) + Number(da.Gap);
                            gap_total = gap_total < 0 ? 0 : gap_total;
                            return (
                              <td key={index} className={'color' + da.CssColor}>
                                {da.Gap <= 0 ? '' : da.Gap}
                              </td>
                            );
                          })}
                          <td className="totalall">{gap_total}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })}
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
                  noOptionsMessage=""
                />
              </div>
              <div className="col-6 mt-1">
                <SelectInput
                  options={machineOption}
                  noOptionsMessage="Please Select Department First"
                  handleChange={(e) => {
                    setFromData({ ...formData, id: e.value });
                  }}
                />
              </div>
              <div className="col-2 mt-3">
                <span>PassData</span>
                &nbsp;
                <input
                  className="form-check-input"
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

export default HourlyDashBoard;
