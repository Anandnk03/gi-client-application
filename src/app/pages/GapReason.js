import React, { useEffect, useState } from 'react';
import MainWrapper from '../components/MainWrapper';
import TableUI from '../components/TableUI';
import Animation from '../components/Animation';
import SideModal from '../components/SideModal';
import Button from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from 'react-icons/bi';
import { department, machine } from '../redux/commSlice';
import { fetchData } from '../redux/reasonSlice';
import { toggleSideModal } from '../redux/layoutSlice';

const GapReason = () => {
  const dispatch = useDispatch();
  const [sidebarAction, setSidebarAction] = useState('add');

  const { data, status: reasonStatus } = useSelector((state) => state.reason);

  const handleRetry = () => dispatch();
  const { data: deptData, machineData } = useSelector((state) => state.comm);

  const ToolBar = () => {
    return (
      <>
        <Button
          value="Add ReasonMaster"
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
  ];
  const Actions = (value, tableMeta, updateValue) => (
    <>
      <Button
        icon={<BiEdit />}
        onlyicon="true"
        varient="dark outline"
        small="true"
        onClick={() => handleEdit(tableMeta.rowData[0])}
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
        //onClick={() => formRef.current.click()}
      />
    </>
  );

  // api

  const handleAdd = () => {
    setSidebarAction('add');
    dispatch(toggleSideModal());
  };

  const handleEdit = (id) => {
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

  useEffect(() => {
    dispatch(department());
  }, [dispatch]);

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
        <form action="#" method="post"></form>
      </SideModal>
    </>
  );
};

export default GapReason;
