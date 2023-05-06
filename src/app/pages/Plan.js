import React, { useRef, useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import MainWrapper from '../components/MainWrapper';
import SideModal from '../components/SideModal';
import TableUI from '../components/TableUI';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin3Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSideModal } from '../redux/layoutSlice';
import { fetchData } from '../redux/planingSlice';
import Animation from '../components/Animation';
import { deleteConfirmationAlert } from '../services/AlertService';

import { addPlan } from '../redux/planingSlice';

const Plan = () => {
  const dispatch = useDispatch();
  const initialFormDatas = {
    date: '',
    Days: '',
    shift: '',
    machine: '',
    product: '',
    password: '',
    manpower: '',
    status: '1',
  };
  const formRef = useRef();
  const [sidebarAction, setSidebarAction] = useState('add');
  const [formDatas, setFormDatas] = useState(initialFormDatas);

  const { data, status: planStatus } = useSelector((state) => state.planing);

  const ToolBar = () => {
    return (
      <>
        <Button
          value="Add Plan"
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
      name: 'DATE',
      key: 'DATE',
      options: {
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
      name: 'SHIFT',
      key: 'SHIFTNUMBER',
      options: {
        display: true,
      },
    },
    {
      name: 'MACHINE NAME',
      key: 'MACHINENAME',
      options: {
        display: true,
      },
    },
    {
      name: 'PRODUCT',
      key: 'PRODUCT',
      options: {
        display: true,
        sort: false,
      },
    },
    {
      name: 'PLAN',
      key: 'PLAN',
      options: {
        display: true,
        sort: false,
      },
    },
    {
      name: 'STATUS',
      key: 'STATUS',
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
      <Button
        icon={<RiDeleteBin3Line />}
        onlyicon="true"
        varient="danger outline"
        small="true"
        data-swal-toast-template="#my-template"
        onClick={() => handleDelete(tableMeta.rowData[0])}
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

  // api Details
  const handleAdd = () => {
    setFormDatas(initialFormDatas);
    setSidebarAction('add');
    dispatch(toggleSideModal());
  };

  const handleRetry = () => dispatch(fetchData());

  const handleChange = (e) =>
    setFormDatas({ ...formDatas, [e.target.name]: e.target.value });

  const handleAddPlan = async (e) => {
    e.preventDefault();
    if (sidebarAction === 'add') dispatch(addPlan(formDatas));
    setFormDatas(initialFormDatas);
    dispatch(toggleSideModal());
  };

  const handleModule = (e) => {
    dispatch(fetchData());
    let ModuleId = e.target.value;
    console.log(ModuleId);
    dispatch(fetchData(ModuleId));
  };

  const handleEdit = (value) => {
    setSidebarAction('edit');
    dispatch(toggleSideModal());
  };

  const handleDelete = async (id) => {
    const { isConfirmed } = await deleteConfirmationAlert.fire();
  };

  return (
    <>
      <MainWrapper title="Plan Entry">
        <div className="row mb-1">
          <div className="col-4">
            <select className="form-control">
              <option>--- Select Your Department ---</option>
              <option value="1">Grspu</option>
              <option value="2">APU</option>
              <option value="3">CMSPU</option>
              <option value="4">EPU</option>
            </select>
          </div>
          <div className="col-4">
            <select className="form-control" onChange={handleModule}>
              <option>--- Select Your Module ---</option>
              <option value="1">MainLine</option>
              <option value="2">Line2</option>
              <option value="3">Line3</option>
              <option value="7">Line4</option>
            </select>
          </div>
        </div>

        {planStatus === 'succeeded' ? (
          <TableUI
            toolbar={ToolBar}
            actions={Actions}
            header={header}
            data={data}
          />
        ) : planStatus === 'loading' ? (
          <Animation type="loading" isCenter />
        ) : planStatus === 'failed' && (
            <Animation type="error" isCenter retry={handleRetry} />
          ) ? (
          planStatus === 'idle'
        ) : (
          <Animation type="idle" isCenter />
        )}
      </MainWrapper>
      <SideModal
        buttons={Controls}
        title={
          sidebarAction === 'add'
            ? 'Add Plan'
            : sidebarAction === 'edit'
            ? 'Update Plan'
            : 'Plan'
        }>
        <form action="#" method="post" onSubmit={handleAddPlan}>
          <div className="row">
            <div className="col-6">
              <Input
                label="Date"
                placeholder="Please add date"
                name="date"
                type="Date"
                value={formDatas.date}
                required={true}
                onChange={handleChange}
              />
            </div>
            <div className="col-6">
              <Input
                type="number"
                label="NumberOf Days"
                placeholder="Please Enter NoOfDay"
                name="Days"
                value={formDatas.Days}
                required={true}
                onChange={handleChange}
              />
            </div>
            <div className="col-6">
              <label htmlFor="">Shift</label>
              <select
                className="form-control"
                name="shift"
                onChange={handleChange}
                value={formDatas.shift}>
                <option>-- Select Your Shift ---</option>
                <option value="1">A</option>
                <option value="2">B</option>
                <option value="3">C</option>
              </select>
            </div>
            <div className="col-6">
              <label>Department</label>
              <select className="form-control" onChange={handleChange}>
                <option>-- Select Your Department ---</option>
                <option value="1">A</option>
                <option value="2">B</option>
                <option value="3">C</option>
              </select>
            </div>
            <div className="col-12">
              <label htmlFor="">Machine</label>
              <select
                className="form-control"
                onChange={handleChange}
                name="machine"
                value={formDatas.machine}>
                <option>-- Select Your Machine ---</option>
                <option value="1">A</option>
                <option value="2">B</option>
                <option value="3">C</option>
              </select>
            </div>
            <div className="col-12">
              <label htmlFor="">Product</label>
              <select
                className="form-control"
                onChange={handleChange}
                name="product"
                value={formDatas.product}>
                <option>-- Select Your Product ---</option>
                <option value="1">A</option>
                <option value="2">B</option>
                <option value="3">C</option>
              </select>
            </div>
            <div className="col-6">
              <Input
                label="Password"
                placeholder="Please add Password"
                name="password"
                type="Password"
                required={true}
                onChange={handleChange}
              />
            </div>
            <div className="col-6">
              <Input
                label="ManPower"
                placeholder="Please add Manpower"
                name="manpower"
                type="Number"
                required={true}
                onChange={handleChange}
              />
            </div>
            {/* ALWAYS KEEP THIS BELOW */}
            <input
              type="submit"
              style={{ display: 'none' }}
              value="submit"
              ref={formRef}
            />
          </div>
        </form>
      </SideModal>
    </>
  );
};

export default Plan;
