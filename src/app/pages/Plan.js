import React, { useRef, useState, useEffect } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import moment from 'moment';
import MainWrapper from '../components/MainWrapper';
import SideModal from '../components/SideModal';
import TableUI from '../components/TableUI';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin3Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSideModal } from '../redux/layoutSlice';
import Animation from '../components/Animation';
import { deleteConfirmationAlert } from '../services/AlertService';
import {
  fetchData,
  addPlan,
  updatePlan,
  archivePlan,
} from '../redux/planingSlice';
import { department, machine, module, product } from '../redux/commSlice';
import SelectInput from '../components/SelectInput';

const Plan = () => {
  const dispatch = useDispatch();
  const initialFormDatas = {
    date: '',
    endDate: '',
    Days: '',
    shift: '',
    machine: '',
    product: '',
    password: '',
    manpower: '',
    depart: '',
    status: '1',
  };
  const formRef = useRef();
  const [sidebarAction, setSidebarAction] = useState('add');
  const [formDatas, setFormDatas] = useState(initialFormDatas);

  const { data, status: planStatus } = useSelector((state) => state.planing);
  const {
    data: deptData,
    moduleOption,
    departmentStatus,
    dataOptions,
    machineData,
    productData,
    status: deptStatus,
  } = useSelector((state) => state.comm);

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

  const handleChange = (e) => {
    setFormDatas({ ...formDatas, [e.target.name]: e.target.value });

    if (e.target.name === 'machine') {
      dispatch(product(e.target.value));
    }
  };

  if (machineData.length === 0) {
    //dispatch(machine(formDatas?.depart));
    console.log('hai');
  }

  const handleAddPlan = async (e) => {
    e.preventDefault();
    let endDate = moment(formDatas.date)
      .add(formDatas?.Days, 'days')
      .format('YYYY-MM-DD');
    const newData = {
      ...formDatas,
      endDate: endDate,
    };
    console.log(newData);
    if (sidebarAction === 'add') dispatch(addPlan(newData));
    if (sidebarAction === 'edit') dispatch(updatePlan(formDatas));
    setFormDatas(initialFormDatas);
    dispatch(toggleSideModal());
  };

  const handleDepartment = (e) => {
    dispatch(module(e.value));
  };

  const handleModule = (e) => {
    dispatch(fetchData(e.value));
  };

  const handleEdit = (id) => {
    const currentData = data.find((da) => da.ID === id);
    let currentParsedData = {
      id: currentData.ID,
      machineId: currentData.MACHINEID,
      date: currentData.DATE,
      shift: currentData.SHIFTNUMBER,
      machine: currentData.MACHINENAME,
      product: currentData.PRODUCT,
      manpower: currentData.PLAN,
    };
    setFormDatas(currentParsedData);
    dispatch(toggleSideModal());
    setSidebarAction('edit');
  };

  const handleDelete = async (id) => {
    const { isConfirmed } = await deleteConfirmationAlert.fire();
    if (isConfirmed) {
      return dispatch(archivePlan(id));
    }
  };

  const titleName = 'Please Select Your Department and Module..!';

  useEffect(() => {
    if (departmentStatus === 'idle') dispatch(department());
  }, [dispatch, deptStatus]);

  return (
    <>
      <MainWrapper title="Plan Entry">
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
              options={moduleOption}
              handleChange={handleModule}
              placeholder="Select Your Module"
            />
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
        ) : planStatus === 'failed' ? (
          <Animation type="error" isCenter retry={handleRetry} />
        ) : planStatus === 'idle' ? (
          <Animation type="idle" isCenter titleName={titleName} />
        ) : (
          ''
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
            {sidebarAction === 'add' ? (
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
            ) : (
              <div className="col-6">
                <label>Date</label>
                <input
                  label="Date"
                  placeholder="Please add date"
                  name="date"
                  className="form-control"
                  type="Date"
                  value={formDatas.date}
                  readOnly
                  onChange={handleChange}
                />
              </div>
            )}
            {sidebarAction === 'add' ? (
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
            ) : (
              ''
            )}

            {sidebarAction === 'add' ? (
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
            ) : (
              <div className="col-6">
                <label htmlFor="">Shift</label>
                <input
                  className="form-control"
                  name="shift"
                  value={formDatas.shift}
                  readOnly
                />
              </div>
            )}
            {sidebarAction === 'add' ? (
              <div className="col-6">
                <label>Department</label>
                {/* <select
                  className="form-control"
                  name="depart"
                  onChange={handleChange}>
                  <option>-- Select Your Department ---</option>
                  {deptData.map((item, index) => {
                    return (
                      <option key={index} value={item?.ID}>
                        {item?.DEPARTMENTNAME}
                      </option>
                    );
                  })}
                </select> */}
                <SelectInput
                  options={dataOptions}
                  placeholder="Select Your Module"
                  handleChange={(e) => {
                    setFormDatas({ ...fetchData, depart: e.value });
                  }}
                  name="depart"
                />
              </div>
            ) : (
              ''
            )}
            {sidebarAction === 'add' ? (
              <div className="col-12">
                <label htmlFor="">Machine</label>
                <select
                  className="form-control"
                  onChange={handleChange}
                  name="machine">
                  <option>-- Select Your Machine ---</option>
                  {machineData.map((item, index) => {
                    return (
                      <option key={index} value={item?.machine}>
                        {item?.MACHINENAME}
                      </option>
                    );
                  })}
                </select>
              </div>
            ) : (
              <div className="col-12">
                <label htmlFor="">Machine</label>
                <input
                  className="form-control"
                  name="machine"
                  readOnly
                  value={formDatas.machine}
                  onChange={handleChange}
                />
              </div>
            )}
            {sidebarAction === 'add' ? (
              <div className="col-12">
                <label htmlFor="">Product</label>
                <select
                  className="form-control"
                  onChange={handleChange}
                  name="product"
                  value={formDatas.product}>
                  <option>-- Select Your Product ---</option>
                  {productData.map((item, index) => {
                    return (
                      <option key={index} value={item?.product}>
                        {item?.PRODUCTNAME}
                      </option>
                    );
                  })}
                </select>
              </div>
            ) : (
              <div className="col-12">
                <label htmlFor="">Product</label>
                <input
                  className="form-control"
                  readOnly
                  name="product"
                  value={formDatas.product}
                />
              </div>
            )}
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
                value={formDatas.manpower}
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
