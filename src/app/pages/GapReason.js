import React, { useEffect, useRef, useState } from 'react';
import MainWrapper from '../components/MainWrapper';
import TableUI from '../components/TableUI';
import Animation from '../components/Animation';
import SideModal from '../components/SideModal';
import Button from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from 'react-icons/bi';
import { Type4M, department, machine, reasonMaster } from '../redux/commSlice';
import { fetchData } from '../redux/reasonSlice';
import { toggleSideModal } from '../redux/layoutSlice';
import Input from '../components/Input';
import uuid from 'react-uuid';
import { reasonHeader } from '../assets/HeaderView';
import { UserRole } from '../services/Helpers';

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
  };
  const [formData, setFormData] = useState(initialValue);
  const { data, status: reasonStatus } = useSelector((state) => state.reason);

  const handleRetry = () => dispatch();
  const {
    data: deptData,
    machineData,
    type4M,
    reasonData,
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

  // api

  const handleAdd = () => {
    setSidebarAction('add');
    dispatch(toggleSideModal());
  };

  const handleEdit = (id) => {
    setMachineId(id[11]);
    dispatch(toggleSideModal());
    setSidebarAction('edit');
  };
  const handleDepartment = (e) => {
    const depId = e.target.value;
    dispatch(machine(depId));
  };

  const handleModule = (e) => {
    const ModuleId = e.target.value;
    console.log(ModuleId);
    dispatch(fetchData(ModuleId));
  };

  const handle4MType = (e) => {
    const Id4M = e.target.value;
    const newData = {
      Mid: Number(Id4M),
      id: machineId,
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
    let newBreakReason = {
      ...formData,
      gapReasonTitle: reasonData.find((ma) => ma.reasonId === formData.reasonId)
        ?.GAPREASON,
      midDescription: reasonData.find((ma) => ma.MID === formData.id)
        ?.MDESCRIPTION,
      id: uuid(),
    };
    setViewReasonData([...viewReasonData, newBreakReason]);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(viewReasonData);

    setFormData(initialValue);
    setViewReasonData([]);
    dispatch(toggleSideModal());
    setSidebarAction('edit');
  };

  useEffect(() => {
    dispatch(department());
    dispatch(Type4M());
  }, [dispatch]);

  const handleDelete = (id, e) => {
    const newReasonData = viewReasonData.filter((data) => data.id !== id);
    setViewReasonData(newReasonData);
  };

  return (
    <>
      <MainWrapper title="Gap Reason Entry">
        <div className="row mb-1">
          <div className="col-4">
            <select
              className="form-select drop"
              name="ID"
              onChange={handleDepartment}>
              <option>--Select Your Department--</option>
              {deptData.map((item, index) => {
                return (
                  <option key={index} value={item?.ID}>
                    {item?.DEPARTMENTNAME}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-4">
            <select className="form-control" onChange={handleModule}>
              <option>--Select Your Machine--</option>
              {machineData.map((item, index) => {
                return (
                  <option key={index} value={item?.machine}>
                    {item?.MACHINENAME}
                  </option>
                );
              })}
            </select>
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
          <Animation type="idle" isCenter />
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
                    onChange={handle4MType}>
                    <option>--- Select 4M Type ---</option>
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
                    onChange={handleChange}>
                    <option>--- Select Your Reason ---</option>
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
                    placeholder="Please Enter NoOfDay"
                    name="lossTime"
                    value={formData.lossTime}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-5 mt-4">
                  <button className="btn btn-dark p-2"> Add Reason</button>
                </div>
              </div>
            </form>
            <div className="view-table-gapReason">
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
                          <td>{item.lossTime}</td>
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
      </SideModal>
    </>
  );
};

export default GapReason;
