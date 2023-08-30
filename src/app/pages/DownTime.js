import React, { useEffect, useRef, useState } from 'react';
import MainWrapper from '../components/MainWrapper';
import TableUI from '../components/TableUI';
import Animation from '../components/Animation';
import SideModal from '../components/SideModal';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from 'react-icons/bi';
import Button from '../components/Button';
import { toggleSideModal } from '../redux/layoutSlice';
import NptModal from '../components/Modals';
import { department, machine } from '../redux/commSlice';
import SelectInput from '../components/SelectInput';
import { NewReason, fetchData, fetchDownReason } from '../redux/downSlice';
import GapReasonForm from '../components/GapReasonForm';
import Modal from 'react-bootstrap/Modal';

const DownTime = () => {
  const dispatch = useDispatch();
  const formRef = useRef();
  const [sidebarAction, setSidebarAction] = useState('add');
  const [reasonId, setReasonIddata] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleRetry = () => dispatch();

  /// api
  const initialValue = {
    downTime: '',
    startTime: '',
    endTime: '',
    reasonID: '',
    reason: '',
    time: '',
    machineId: '',
    newReason: '',
    usedOee: '',
    rootCause: '',
  };

  const [reason, setReasonData] = useState(initialValue);
  const { data, status: downTimeStatus } = useSelector(
    (state) => state.downTime
  );

  const { dataOptions, machineOption } = useSelector((state) => state.comm);
  const handleAdd = () => {
    dispatch(toggleSideModal());
    setSidebarAction('add');
  };

  const ToolBar = () => {
    return (
      <>
        <Button
          value="Add New Reason"
          varient="dark ms-2"
          small="true"
          onClick={handleAdd}
        />
      </>
    );
  };

  const header = [
    {
      name: 'id',
      key: 'id',
      options: {
        display: 'excluded',
        filter: false,
        print: false,
        download: false,
      },
    },
    {
      name: 'Down StartTime',
      key: 'DownStart',
      options: {
        sort: false,
        display: true,
        setCellProps: () => {
          return {
            style: {
              textAlign: 'left',
              fontWeight: 'bold',
            },
          };
        },
      },
    },
    {
      name: 'Down EndTime',
      key: 'DownEnd',
      options: {
        sort: false,
        display: true,
        setCellProps: () => {
          return {
            style: {
              textAlign: 'left',
              fontWeight: 'bold',
            },
          };
        },
      },
    },
    {
      name: 'Duration(Min)',
      key: 'duration',
      options: {
        sort: false,
        display: true,
        setCellProps: () => {
          return {
            style: {
              textAlign: 'left',
              fontWeight: 'bold',
            },
          };
        },
      },
    },
    {
      name: 'MACHINEID',
      key: 'MACHINEID',
      options: {
        display: 'excluded',
        filter: false,
        print: false,
        download: false,
      },
    },
  ];

  const Actions = (value, tableMeta, updateValue) => (
    <>
      <div className="row text-center">
        <div className="col-6" style={{ width: '100%' }}>
          <Button
            icon={<BiEdit />}
            onlyicon="true"
            varient="dark outline"
            small="true"
            onClick={() => handelClickReason(tableMeta.rowData)}
          />
        </div>
      </div>
    </>
  );

  const Controls = (
    <>
      <Button
        type="button"
        varient="dark "
        value={
          sidebarAction === 'add'
            ? 'Save'
            : sidebarAction === 'edit'
            ? 'Update'
            : sidebarAction === 'quality'
            ? 'Update Rejection Qty'
            : ''
        }
        small="true"
        onClick={() => formRef.current.click()}
      />
    </>
  );

  const handelClickReason = (value) => {
    console.log(value);
    let endTime = value[1];
    let time = value[1]?.split(' ')[1];
    const newData = {
      downTime: value[3],
      startTime: value[1],
      endTime: endTime,
      reasonID: value[0],
      time: time,
      machineId: value[4],
    };
    setReasonData(newData);
    setReasonIddata(value[0]);
    setShow(true);
  };

  const startTime = reason.startTime;
  const overallGapTime = reason.downTime;

  const handleChange = (e) => {
    setReasonData({
      ...reason,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddNewReason = (e) => {
    e.preventDefault();
    const newData = {
      newReason: reason?.newReason,
      rootCause: reason?.rootCause,
      usedOee: reason?.usedOee,
    };
    console.log(newData);
    dispatch(NewReason(newData));
    dispatch(toggleSideModal());
    setSidebarAction('add');
    setReasonData(initialValue);
  };
  useEffect(() => {
    if (downTimeStatus === 'idle') {
      dispatch(department());
    }
    dispatch(fetchDownReason());
  }, [dispatch]);
  return (
    <>
      <MainWrapper title="Role">
        <div className="row mb-1">
          <div className="col-4">
            <SelectInput
              options={dataOptions}
              handleChange={(e) => dispatch(machine(e.value))}
              placeholder="Select Your Department"
            />
          </div>
          <div className="col-4">
            <SelectInput
              options={machineOption}
              handleChange={(e) => dispatch(fetchData(e.value))}
              placeholder="Select Your Machine"
              noOptionsMessage="Please Select Department First"
            />
          </div>
        </div>
        {downTimeStatus === 'succeeded' ? (
          <TableUI
            toolbar={ToolBar}
            actions={Actions}
            header={header}
            data={data}
          />
        ) : downTimeStatus === 'Loading' ? (
          <Animation type="loading" isCenter />
        ) : downTimeStatus === 'failed' ? (
          <Animation type="error" isCenter retry={handleRetry} />
        ) : downTimeStatus === 'idle' ? (
          <Animation type="idle" isCenter titleName={'Select Your Reason'} />
        ) : (
          ''
        )}
      </MainWrapper>
      <SideModal
        buttons={Controls}
        title={
          sidebarAction === 'add'
            ? 'New Role'
            : sidebarAction === 'edit'
            ? 'Update Role'
            : ''
        }>
        {sidebarAction === 'add' && (
          <form action="#" method="post" onSubmit={handleAddNewReason}>
            <div className="row">
              <div className="col-sm-6">
                <label className="">RootCause</label>
                <select
                  className="form-control"
                  name="rootCause"
                  onChange={handleChange}
                  required
                  value={reason.rootCause}>
                  <option value="">---Select RootCause---</option>
                  <option>MACHINE</option>
                  <option>METHOD</option>
                  <option>MATERIAL</option>
                  <option>MAN</option>
                  <option>MANAGEMENT</option>
                </select>
              </div>
              <div className="col-sm-6">
                <label className="">UsedForOee</label>
                <select
                  className="form-control"
                  name="usedOee"
                  onChange={handleChange}
                  required
                  value={reason.usedOee}>
                  <option>---Select UsedForOee---</option>
                  <option>YES</option>
                  <option>NO</option>
                </select>
              </div>
              <div className="">
                <label>New Reason</label>
                <textarea
                  className="form-control textarea"
                  value={reason.newReason}
                  name="newReason"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <input
              type="submit"
              style={{ display: 'none' }}
              value="submit"
              ref={formRef}
            />
          </form>
        )}
      </SideModal>
      <NptModal
        handleClose={handleClose}
        show={show}
        className="modal fade bd-example-modal-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Select Reason
          </Modal.Title>
        </Modal.Header>
        <GapReasonForm
          startTime={startTime}
          overallGapTime={overallGapTime}
          time={reason.time}
          endTime={reason.endTime}
          reasonId={reasonId}
          machineID={reason.machineId}
          handleClose={handleClose}
        />
      </NptModal>
    </>
  );
};

export default DownTime;
