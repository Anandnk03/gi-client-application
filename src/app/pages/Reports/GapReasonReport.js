import React, { useEffect, useState } from 'react';
import MainWrapper from '../../components/MainWrapper';
import DoughnutChart from '../Layout/DoughnutChart';
import MenuModal from '../Layout/Modals';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SelectInput from '../../components/SelectInput';
import { useDispatch, useSelector } from 'react-redux';
import { department, machine } from '../../redux/commSlice';

const GapReasonReport = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [isPastData, setIsPastData] = useState(false);

  const { dataOptions, departmentStatus, machineOption } = useSelector(
    (state) => state.comm
  );

  const initialValue = {};
  const [formData, setFromData] = useState(initialValue);

  const handleSearch = (e) => {
    e.preventDefault();
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
  const handleMenu = () => {
    setShow(true);
  };
  useEffect(() => {
    if (departmentStatus === 'idle') dispatch(department());
    if (show === false && departmentStatus === 'idle') {
      setShow(true);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <MainWrapper
        title="Gap Reason"
        handleMachineName={handleMenu}
        type="true">
        <main class="content">
          <div class="container-fluid p-0">
            <div class="row">
              <div class="card">
                <div class="chart chart-sm">
                  <DoughnutChart />
                </div>
              </div>
            </div>
          </div>
        </main>
      </MainWrapper>
      <MenuModal handleClose={handleClose} show={show}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Select Your Machine Name. *If Past data Click CheckBox
          </Modal.Title>
        </Modal.Header>
        <form action="/dashboard/" method="get" onSubmit={handleSearch}>
          <div className="modal-form">
            <div className="row">
              <div className="col-4 mt-1">
                <SelectInput
                  options={dataOptions}
                  placeholder="Select You Department"
                  handleChange={(e) => dispatch(machine(e.value))}
                  noOptionsMessage=""
                  name="value"
                />
              </div>
              <div className="col-6 mt-1">
                <SelectInput
                  options={machineOption}
                  noOptionsMessage="Please Select Your Department First"
                  handleChange={(e) => {
                    setFromData({ ...formData, id: e.value });
                  }}
                />
              </div>
              <div className="col-2 mt-3">
                <span>PastData</span>
                &nbsp;
                <input
                  className="form-check-input"
                  checked={isPastData}
                  type="checkbox"
                  onClick={() =>
                    isPastData ? setIsPastData(false) : setIsPastData(true)
                  }
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

export default GapReasonReport;
