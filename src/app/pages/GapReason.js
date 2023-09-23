import React, { useEffect, useRef, useState } from 'react';
import MainWrapper from '../components/MainWrapper';
import TableUI from '../components/TableUI';
import Animation from '../components/Animation';
import SideModal from '../components/SideModal';
import Button from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from 'react-icons/bi';
import { Type4M, department, machine, reasonMaster } from '../redux/commSlice';
import { UpdateReason, createMaster, fetchData } from '../redux/reasonSlice';
import { toggleSideModal } from '../redux/layoutSlice';
import Input from '../components/Input';
import uuid from 'react-uuid';
import { reasonHeader } from '../assets/HeaderView';
import { UserRole } from '../services/Helpers';
import SelectInput from '../components/SelectInput';
import jwtDecode from 'jwt-decode';
import { Alert } from '../services/AlertService';

const GapReason = () => {
  const dispatch = useDispatch();
  const [machineId, setMachineId] = useState();
  const [sidebarAction, setSidebarAction] = useState('add');
  const [viewReasonData, setViewReasonData] = useState([]);
  const formRef = useRef();
  const initialValue = {
    id: '',
    reasonId: '',
    lossTime: '',
    newReason: '',
  };



  const [formData, setFormData] = useState(initialValue);
  const { data, status: reasonStatus } = useSelector((state) => state.reason);

  const token = localStorage.getItem('token');
  const decodeToken = jwtDecode(token);

  const handleRetry = () => dispatch();
  const {
    dataOptions,
    machineOption,
    type4M,
    reasonData,
    departmentStatus,
    moduleOption,
    type4mOption,
  } = useSelector((state) => state.comm);

  const ToolBar = () => {
    return (
      <>
        {UserRole('gapReason', 'add') && (
          <Button
            value="Add New Reason"
            varient="dark ms-2"
            small="true"
            onClick={handleAdd}
          />
        )}
      </>
    );
  };

  const header = [
    {
      name: 'id',
      key: 'ID',
      options: {
        display: 'excluded',
        filter: false,
        print: false,
        download: false,
      },
    },
    {
      name: 'ShiftDate',
      key: 'SHIFTDATE',
      options: {
        display: true,
        sort: false,
      },
    },
    {
      name: 'Shift',
      key: 'SHIFT',
      options: {
        display: true,
        sort: false,
      },
    },
    {
      name: 'MachineName',
      key: 'MACHINENAME',
      options: {
        display: true,
        sort: false,
      },
    },
    {
      name: 'Hour',
      key: 'HOURDESCRIPITION',
      options: {
        display: true,
        sort: false,
      },
    },
    {
      name: 'StartTime',
      key: 'HOURSTARTTIME',
      options: {
        display: true,
        sort: false,
      },
    },
    {
      name: 'EndTime',
      key: 'HOURENDTIME',
      options: {
        display: true,
        sort: false,
      },
    },

    {
      name: 'HourlyPlan',
      key: 'HOURLYPLAN',
      options: {
        display: true,
        sort: false,
      },
    },
    {
      name: 'Actual',
      key: 'Actual',
      options: {
        display: true,
        sort: false,
      },
    },
    {
      name: 'GapQuantity',
      key: 'GapQUANTITY',
      options: {
        display: true,
        sort: false,
      },
    },
    {
      name: 'GapMin',
      key: 'GapMinutes',
      options: {
        display: true,
        sort: false,
      },
    },
    {
      name: 'MACHINEID',
      key: 'MACHINEID',
      options: {
        display: false,
        sort: false,
      },
    },
  ];

  const Actions = (value, tableMeta, updateValue) => (
    <>
      <Button
        icon={<BiEdit />}
        onlyicon="true"
        varient="dark outline"
        small="true"
        onClick={() => handleEdit(tableMeta.rowData)}
      />
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
              : 'Friend'
        }
        small="true"
        onClick={() => formRef.current.click()}
      />
    </>
  );



  const handleAdd = () => {
    setSidebarAction('add');
    dispatch(toggleSideModal());
  };

  const handleEdit = (id) => {
    const newData = {
      hourlyId: id[0],
      machineId: id[11],
    };
    setMachineId(newData);
    dispatch(toggleSideModal());
    setSidebarAction('edit');
  };
  const handleDepartment = (e) => {
    dispatch(machine(e.value));
  };

  const handleModule = (e) => {
    dispatch(fetchData(e.value));
  };

  const handle4MType = (e) => {
    const Id4M = e.target.value;
    const newData = {
      Mid: Number(Id4M),
      id: machineId?.machineId,
    };
    dispatch(reasonMaster(newData));
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleAddReason = (e) => {
    e.preventDefault();

    if ((formData.id === '') || (formData.id === '--- Select 4M Type ---')) {
      Alert('error', 'Select Your 4m Type');
    }

    else if ((formData.reasonId === '') || (formData.reasonId === '--- Select Your Reason ---')) {
      Alert('error', 'Select Your Gap Reason');
    }


    else {
      let newBreakReason = {
        ...formData,
        gapReasonTitle: reasonData.find((ma) => ma.reasonId == formData.reasonId)
          ?.GAPREASON,
        midDescription: reasonData.find((ma) => ma.MID == formData.id)
          ?.MDESCRIPTION,
        id: uuid(),
        hourlyId: Number(machineId.hourlyId),
        Mid: formData.id,
        CreateBy: decodeToken.name,
      };
      setViewReasonData([...viewReasonData, newBreakReason]);


    }

  };

  let value1 = 0;
  viewReasonData.map((item) => {

    return (
      value1 = value1 + parseInt(item.lossTime)
    )

  })


  const handleUpdate = (e) => {
    e.preventDefault();

    if (viewReasonData.length === 0) {
      return Alert('error', 'Please Add Your Reason Than Update..');
    }

    else if (value1 > 60) {

      Alert('error', `Your Loss time is ${value1 + 'Min'} Only Fill 60 Minutes LossTime`);
    }

    else if (value1 < 60) {
      const remainingLossTime = 60 - value1;
      Alert('error', `Your LossTime is ${value1 + 'Min'} Fill Remaining ${remainingLossTime + 'Min'} LossTime`);
    }

    else {
      dispatch(UpdateReason(viewReasonData));
      setFormData(initialValue);
      setViewReasonData([]);
      dispatch(toggleSideModal());
      setSidebarAction('edit');

    }
  };

  const handleDelete = (id, e) => {
    const newReasonData = viewReasonData.filter((data) => data.id != id);
    setViewReasonData(newReasonData);
  };

  const handleDropDepart = (e) => {
    dispatch(machine(e.value));
  };

  const updateNewReason = (e) => {
    e.preventDefault();
    dispatch(createMaster(formData));
    setFormData(initialValue);
    dispatch(toggleSideModal());
  };

  const titleName = 'Please Select Your Department and Machine..!';
  useEffect(() => {
    if (departmentStatus === 'idle') dispatch(department());
    dispatch(Type4M());
  }, [dispatch]);


  return (
    <>
      <MainWrapper title="Gap Reason Entry">
        <div className="row mb-1">
          <div className="col-4">
            <SelectInput
              options={dataOptions}
              handleChange={handleDepartment}
              placeholder="Select Your Department"
            />
          </div>
          <div className="col-4">
            <SelectInput
              options={machineOption}
              handleChange={handleModule}
              placeholder="Select Your Machine"
              noOptionsMessage="Please Select Department First"
            />
          </div>
        </div>

        {reasonStatus === 'succeeded' ? (
          <TableUI
            toolbar={ToolBar}
            actions={Actions}
            header={header}
            data={data}
          />
        ) : reasonStatus === 'loading' ? (
          <Animation type="loading" isCenter />
        ) : reasonStatus === 'failed' ? (
          <Animation type="error" isCenter retry={handleRetry} />
        ) : reasonStatus === 'idle' ? (
          <Animation type="idle" isCenter titleName={titleName} />
        ) : (
          ''
        )}
      </MainWrapper>
      <SideModal
        buttons={Controls}
        title={
          sidebarAction === 'add'
            ? 'Add New Gap Reason Master'
            : sidebarAction === 'edit'
              ? 'Update Gap Reason'
              : 'Plan'
        }>
        {sidebarAction === 'edit' && (
          <>
            <form action="#" method="post" onSubmit={handleAddReason}>
              <div className="row">
                <div className="col-4">
                  <span>4M Types</span>
                  <select
                    className="form-control"
                    name="id"
                    required={true}
                    onChange={handle4MType}>
                    <option disable>--- Select 4M Type ---</option>
                    {type4M.map((item, index) => {
                      return (
                        <option key={index} value={item?.ID}>
                          {item?.MDESCRIPTION}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-8">
                  <span>Gap Reason</span>
                  <select
                    className="form-control"
                    name="reasonId"
                    required={true}
                    onChange={handleChange}>
                    <option disable>--- Select Your Reason ---</option>
                    {reasonData.map((item, index) => {
                      return (
                        <option key={index} value={item?.reasonId}>
                          {item?.GAPREASON}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-5">
                  <Input
                    type="number"
                    label="Loss Time"
                    placeholder="Please Enter Loss Time"
                    name="lossTime"
                    required={true}
                    value={formData.lossTime}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-5 mt-4">
                  <button className="btn btn-dark p-2">Add Reason</button>
                </div>
              </div>
            </form>
            <div className="view-table-gapReason">
              {viewReasonData.length > 0 ? (
                <div className="card">
                  <table className="table table-striped">
                    <thead className="header-table">
                      <tr>
                        {reasonHeader.map((header, index) => {
                          return (
                            <th key={index}>
                              {reasonData.length > 0 ? header.columnData : ''}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {viewReasonData.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.gapReasonTitle}</td>
                            <td>{item.midDescription}</td>
                            <td>{item.lossTime + 'Min'}</td>
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
            </div>
            <form method="post" onSubmit={handleUpdate}>
              <input
                type="submit"
                style={{ display: 'none' }}
                value="submit"
                ref={formRef}
              />
            </form>
          </>
        )}
        {sidebarAction === 'add' && (
          <>
            <form method="post" action="#" onSubmit={updateNewReason}>
              <div className="row">
                <div className="col-6">
                  <SelectInput
                    options={dataOptions}
                    handleChange={handleDropDepart}
                    placeholder="Select Your DepartMent"
                  />
                </div>
                <div className="col-6">
                  <SelectInput
                    options={machineOption}
                    placeholder="Select Your Machine"
                    name="value"
                    handleChange={(e) =>
                      setFormData({ ...formData, MachineId: e.value })
                    }
                  />
                </div>
                <div className="col-12 mt-2">
                  <SelectInput
                    options={type4mOption}
                    placeholder="Select Your 4mType"
                    name="value"
                    handleChange={(e) =>
                      setFormData({ ...formData, typeID: e.value })
                    }
                  />
                </div>
                <div className="col-12 ">
                  <Input
                    type="text"
                    placeholder="Enter Your New Reason"
                    required
                    name="newReason"
                    value={formData.newReason}
                    onChange={handleChange}
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
          </>
        )}
      </SideModal>
    </>
  );
};

export default GapReason;
