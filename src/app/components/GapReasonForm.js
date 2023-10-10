import moment from 'moment';
import React, { useState } from 'react';
import uuid from 'react-uuid';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Alert } from '../services/AlertService';
import SelectInput from './SelectInput';
import { useDispatch, useSelector } from 'react-redux';
import { updateReason } from '../redux/downSlice';
import { fetchData } from '../redux/downSlice';

const GapReasonForm = ({
  startTime,
  overallGapTime,
  time,
  endTime,
  reasonId,
  handleClose,
  machineID,
}) => {
  const dispatch = useDispatch();
  const { optionData } = useSelector((state) => state.downTime);

  const initialFormDatas = {
    reason: '',
    gapMinute: overallGapTime,
    endTime: null,
    brakeTime: '',
    timeStart: '',
  };

  const format = 'YYYY-MM-DD HH:mm:ss';
  const [formDatas, setFormDatas] = useState(initialFormDatas);
  const [remainingTime, setRemainingTime] = useState(overallGapTime);
  const [breakups, setBreakups] = useState([]);

  const handleChange = (e) => {
    setFormDatas({ ...formDatas, [e.target.name]: e.target.value });
  };
  const handleAdd = (e) => {
    e.preventDefault();
    if (formDatas?.gapMinute === 0) {
      return alert(`You Don"t add the Reason Your DownTime As '0'`);
    }
    if (formDatas?.reason.length === 0) {
      return alert('Please Select Your Reason');
    }

    setRemainingTime(remainingTime - formDatas.gapMinute);

    const existingBreakup = breakups[breakups.length - 1];
    setBreakups([
      ...breakups,
      {
        id: uuid(),
        gapMinute: formDatas.gapMinute,
        reason: formDatas.reason,
        reasonFilter: optionData.find((da) => da.value === formDatas.reason)
          ?.label,
        reasonId: reasonId,
        starttime: existingBreakup ? existingBreakup.endTime : startTime,
        endTime: moment(startTime)
          .add(formDatas.gapMinute - remainingTime + overallGapTime, 'minutes')
          .format(format),
      },
    ]);
    setFormDatas({
      gapMinute: Number(remainingTime) - Number(formDatas.gapMinute),
      reason: '',
    });
  };

  const reasonHeader = [
    {
      columnData: 'StartTime',
    },
    {
      columnData: 'EndTime',
    },
    {
      columnData: 'LossTime',
    },
    {
      columnData: 'Reason',
    },
    {
      columnData: 'Delete',
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (breakups.length === 0) {
      return Alert('error', 'Sorry, Place Click Add Before Updating...!');
    }
    const nptReason = [];
    breakups.map((da) => {
      return nptReason.push({
        reasonID: da.reason,
        id: da.reasonId,
        startTime: da.starttime,
        endTime: da.endTime,
      });
    });
    dispatch(updateReason(nptReason));
    console.log('machineID', machineID);
    dispatch(fetchData(machineID));
    handleClose(false);
  };

  const handleDelete = (id) => {
    const currentData = breakups.find((data) => data.id === id);
    const newReasonData = breakups.filter((data) => data.id !== id);
    setRemainingTime(Number(remainingTime) + Number(currentData.gapMinute));
    setFormDatas({
      ...formDatas,
      gapMinute: Number(remainingTime) + Number(currentData.gapMinute),
    });
    setBreakups(newReasonData);
  };

  return (
    <>
      <h3 className="text-center">LossTime: {overallGapTime}</h3>
      <form
        action=""
        method="post"
        className="update-npt-form"
        onSubmit={handleAdd}>
        <div className="row update-form">
          <div className="col-3">
            <label>StartTime</label>
            <input className="form-control" type="text" readOnly value={time} />
          </div>
          <div className="col-3">
            <label>EndTime</label>
            <input
              className="form-control"
              name="endTime"
              type="text"
              readOnly
              value={endTime}
            />
          </div>
          <div className="col-2">
            <label>Change Time</label>
            <input
              type="number"
              name="gapMinute"
              onChange={handleChange}
              max={remainingTime}
              min={0}
              value={formDatas.gapMinute}
              className="form-control"
            />
          </div>
          <div className="col-3">
            <label>Reason</label>
            <SelectInput
              options={optionData}
              name="value"
              value={formDatas.reason}
              handleChange={(e) =>
                setFormDatas({ ...formDatas, reason: e.value })
              }
            />
          </div>
          <div className="col-1 button-class">
            <button className="btn btn-success" type="submit">
              Add
            </button>
          </div>
        </div>
      </form>
      <div className="view-table-gapReason mt-2">
        {breakups.length > 0 ? (
          <div className="card">
            <table className="table table-striped">
              <thead className="header-table text-center">
                <tr>
                  {reasonHeader.map((header, index) => {
                    return (
                      <th key={index}>
                        {optionData.length > 0 ? header.columnData : ''}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {breakups.map((item, index) => {
                  return (
                    <tr key={index} className="text-center">
                      {<td>{item.starttime}</td>}
                      <td>{item.endTime}</td>
                      <td>{item.gapMinute}</td>
                      <td>{item.reasonFilter}</td>
                      <td>
                        <button
                          className="btn btn-secondary"
                          type="button"
                          onClick={(e) => handleDelete(item.id, e)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          ''
        )}
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Update
          </Button>
        </Modal.Footer>
      </div>
    </>
  );
};

export default GapReasonForm;
