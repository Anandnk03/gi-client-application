import React from 'react';
import Button from '../components/Button';
import { BiEdit } from 'react-icons/bi'; import TableUI from '../components/TableUI';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSideModal } from '../redux/layoutSlice';
import SideModal from '../components/SideModal';
import Input from '../components/Input';
import Animation from '../components/Animation';
import MainWrapper from '../components/MainWrapper';
import SelectInput from '../components/SelectInput';
import Swal from 'sweetalert2';
import {
  addComponent,
  updateComponent,
  getComponentData,
} from '../redux/ComponentSlice';
import {
  addOperation,
  getOperationData,
} from '../redux/operationSlice';
import jwtDecode from 'jwt-decode';
import { getMachine } from '../redux/commSlice';
import {
  addMachineOperation,
  getMachineOperationData,
} from '../redux/machineOperationSlice';

const Component = () => {
  const dispatch = useDispatch();

  const token = localStorage.getItem('token');
  const decoder = jwtDecode(token);

  const initialValue = {
    componentNumber: '',
    componentName: '',
    createBy: decoder.name,
    operationNumber: '',
    operationName: '',
    machineName: '',
    perhourOutput: '',
    toct: '',
    cycleTime: '',
    programId:'',
    quantityPerCycle:''

  };

  const editInitialValue = {
    ComponentId: '',
    ComponentName: '',
    ComponentNumber: '',
    OperationId: '',
    OperationName: '',
    OperationNumber: '',
    Id: '',
    MachineName: '',
    Toct: '',
    CycleTime: '',
    PerhourOutput: '',
    
  };

  const [formData, setFormData] = useState(initialValue);
  const [sidebarAction, setSidebarAction] = useState('addcomponent');
  const [editData, setEditData] = useState(editInitialValue);


  const {
    data,
    status: componentStatus,
    componentData,
  } = useSelector((state) => state.component);
  


  const {
    operationData: optionData,
  } = useSelector((state) => state.operation);

  const {msg_status } =
    useSelector((state) => state.machineOperation);


  const { machineData, status: deptStatus } = useSelector((state) => state.comm);

  const componentHeader = [
    {
      name: 'id',
      key: 'ComponentId',
      options: {
        display: 'excluded',
        filter: true,
        print: false,
        download: false,
      },
    },
    {
      name: 'Component Name',
      key: 'ComponentName',
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
      name: 'Component Number',
      key: 'ComponentNumber',
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
  ];


  const ComponentAction = (value, tableMeta, updateValue) => (
    <div className="row text-center">
      <div className="col-6" style={{ width: '100%' }}>
        <Button
          icon={<BiEdit />}
          onlyicon="true"
          varient="dark outline"
          small="true"
          onClick={() => handleComponentEdit(tableMeta.rowData[0])}
        />
      </div>
    </div>
  );

  
  const handleRetry = () => dispatch(getComponentData());

  const handleComponentEdit = (ComponentId) => {
    const currentData = data.find((da) => da.ComponentId === ComponentId);
    let currentParsedData = {
      ComponentId: currentData.ComponentId,
      ComponentName: currentData.ComponentName,
      ComponentNumber: currentData.ComponentNumber,
    };
    setEditData(currentParsedData);
    dispatch(toggleSideModal());
    setSidebarAction('editComponent');
  };

 
  const formRef = useRef();

  const Controls = (
    <>
      <Button
        type="button"
        varient="dark "
        value={
          sidebarAction === 'addComponent'
            ? 'Add Component'
            : sidebarAction === 'addOperation'
              ? 'Add Operation'
              : sidebarAction === 'addMachineOperation'
                ? 'Add Machine Operation'
                : 'Edit Component'
        }
        small="true"
        onClick={() => formRef.current.click()}
      />
    </>
  );

  const ToolBar = () => {
    return (
      <>
        <Button
          varient="dark ms-2"
          value='Add Product'
          small="true"
          onClick={handleAddComponentbtn}
        />
      </>
    );
  };

  const handleAddComponentbtn = async () => {
    dispatch(toggleSideModal());
    setSidebarAction('addComponent');
  };



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddComponent = (e) => {
    e.preventDefault();
    dispatch(addComponent(formData));
    setFormData(initialValue);
    setSidebarAction('addOperation');
  };

  const handleAddOperation = (e) => {
    e.preventDefault();
    dispatch(addOperation(formData));
    dispatch(getOperationData());
    setFormData(initialValue);
    setSidebarAction('addMachineOperation');
  };

  const handleComponentUpdate = async (e) => {
    e.preventDefault();
    dispatch(updateComponent(editData));
    dispatch(getOperationData());
    dispatch(getMachineOperationData());
    dispatch(toggleSideModal());

  };


  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger ms-2',
    },
    buttonsStyling: false,
  });

  const handleAddMachineOperation = (e) => {
    e.preventDefault();
    dispatch(addMachineOperation(formData));
    dispatch(getMachineOperationData());
    setFormData(initialValue);
    dispatch(toggleSideModal());
 
  
    if (msg_status === 'idle') {
      swalWithBootstrapButtons
        .fire({
          icon: 'success',
          title: 'Product Added Successfullly',
          showCancelButton: true,
          confirmButtonText: 'Add Machine Operation',
          cancelButtonText: 'Exit',
        })
        .then((result) => {
          if (result.isConfirmed) {
            dispatch(toggleSideModal());

          } else if (result.dismiss === Swal.DismissReason.cancel) {

            setSidebarAction('addMachineOperation');

          }
        });

    }
    else if (msg_status === 'success') {
      swalWithBootstrapButtons
        .fire({
          icon: 'success',
          title: 'Product Added Successfullly',
          showCancelButton: true,
          confirmButtonText: 'Add Machine Operation',
          cancelButtonText: 'Exit',
        })
        .then((result) => {
          if (result.isConfirmed) {
            dispatch(toggleSideModal());

          } else if (result.dismiss === Swal.DismissReason.cancel) {

            setSidebarAction('addMachineOperation');

          }
        });
    }

  };



  useEffect(() => {
    if (deptStatus === 'idle') {
      dispatch(getMachine());
      dispatch(getComponentData());
      dispatch(getOperationData());
      dispatch(getMachineOperationData());
    }
  });

  return (
    <>
      <MainWrapper
        title="Component"

      >
        {componentStatus === 'succeeded' ? (

          <TableUI
            toolbar={ToolBar}
            actions={ComponentAction}
            header={componentHeader}
            data={data}
          />

        ) : componentStatus === 'loading' ? (
          <Animation type="loading" isCenter />
        ) : componentStatus === 'failed' ? (
          <Animation type="error" isCenter retry={handleRetry} />
        ) : componentStatus === 'idle' ? (
          <Animation type="idle" isCenter titleName="" />
        ) : (
          ''
        )}
      </MainWrapper>

      <SideModal
        buttons={Controls}
        title={
          sidebarAction === 'addComponent'
            ? 'Add Your Component'
            : sidebarAction === 'addOperation'
              ? 'Add Your Operation'
              : sidebarAction === 'addMachineOperation'
                ? 'Add Your Machine Operation'
                : sidebarAction === 'editComponent'
                  ? 'Edit Your Component' : ''

        }>
        {sidebarAction === 'addComponent' && (
          <form action="#" method="post" onSubmit={handleAddComponent}>
            <div className="row">
              <label
                className="text-center mt-3 bold"
                style={{ fontWeight: 'bold' }}></label>

              <div className="col-6">
                <Input
                  label="Component Name"
                  type="text"
                  name="componentName"
                  onChange={handleChange}
                  value={formData.componentName}
                  required
                  autoComplete="off"
                />
              </div>

              <div className="col-6">
                <Input
                  label="Component Number"
                  required
                  type="text"
                  autoComplete="off"
                  name="componentNumber"
                  onChange={handleChange}
                  value={formData.componentNumber}
                />
              </div>

              <input
                type="submit"
                style={{ display: 'none' }}
                value="submit"
                ref={formRef}
              />
            </div>
          </form>
        )}

        {sidebarAction === 'addOperation' && (
          <form action="#" method="post" onSubmit={handleAddOperation}>
            <div className="row">
              <label
                className="text-center mt-3 bold"
                style={{ fontWeight: 'bold' }}></label>
              <div className="col-6">
              <SelectInput
              label="Select Component Name"
              options={componentData}
              value ={formData.componentName}
              
              handleChange={(e) =>
                setFormData({
                  ...formData,
                  componentName: e.value,
                })
              
              }
              name="componentName"
              required
              placeholder="select Component Name"
            />
              </div>

              <div className="col-6">
                <Input
                  label="Operation Name"
                  type="text"
                  name="operationName"
                  required
                  onChange={handleChange}
                  value={formData.operationName}
                  autoComplete="off"
                />
              </div>
              <div className="col-6">
                <Input
                  label="Operation Number"
                  type="text"
                  name="operationNumber"
                  required
                  onChange={handleChange}
                  value={formData.operationNumber}
                  autoComplete="off"
                />
              </div>
              <input
                type="submit"
                style={{ display: 'none' }}
                value="submit"
                ref={formRef}
              />
            </div>
          </form>
        )}

        {sidebarAction === 'addMachineOperation' && (
          <form action="#" method="post" onSubmit={handleAddMachineOperation}>
            <div className="row">
              <label
                className="text-center mt-3 bold"
                style={{ fontWeight: 'bold' }}></label>
              <div className="col-6">
                <SelectInput
                  label="Select Component Name"
                  options={componentData}
                  value={formData.componentName}
                  handleChange={(e) =>
                    setFormData({
                      ...formData,
                      componentName: e.value,
                    })
                  }
                  name="componentName"
                  required
                  placeholder="Select Component Name"
                />
              </div>

              <div className="col-6">
                <SelectInput
                  label="Select Operation Name"
                  options={optionData}
                  handleChange={(e) =>
                    setFormData({
                      ...formData,
                      operationName: e.value,
                    })
                  }
                  name="operationName"
                  required
                  placeholder="Select Operation Name"
                />
              </div>

              <div className="col-6">
                <SelectInput
                  label="Select Machine Name"
                  options={machineData}
                  value={formData.machineName}
                  handleChange={(e) =>
                    setFormData({
                      ...formData,
                      machineName: e.value,
                    })
                  }
                  name="machineName"
                  required
                  placeholder="Select Machine Name"
                />
              </div>
              <div className="col-6">
              <Input
                  label="Program Id"
                  type="text"
                  name="programId"
                  required
                  onChange={handleChange}
                  value={formData.programId}
                  autoComplete="off"
              />
          </div>

          <div className="col-6">
          <Input
              label="Quantity PerCycle"
              type="number"
              name="quantityPerCycle"
              required
              onChange={handleChange}
              value={formData.quantityPerCycle}
              autoComplete="off"
          />
      </div>

              <div className="col-6">
                <Input
                  label="Toct"
                  type="text"
                  name="toct"
                  onChange={handleChange}
                  value={formData.toct}
                  autoComplete="off"
                />
              </div>

              <div className="col-6">
                <Input
                  label="Output PerHour"
                  type="number"
                  name="perhourOutput"
                  required
                  onChange={handleChange}
                  value={formData.perhourOutput}
                  autoComplete="off"
                />
              </div>

              <div className="col-6">
                <Input
                  label="Cycle Time"
                  type="number"
                  name="cycleTime"
                  required
                  onChange={handleChange}
                  value={formData.cycleTime}
                  autoComplete="off"
                />
              </div>
              <input
                type="submit"
                style={{ display: 'none' }}
                value="submit"
                ref={formRef}
              />
            </div>
          </form>
        )}

        {sidebarAction === 'editComponent' && (
          <form action="#" method="post" onSubmit={handleComponentUpdate}>
            <div className="row">
              <label
                className="text-center mt-3 bold"
                style={{ fontWeight: 'bold' }}></label>
              <div className="col-6">
                <Input
                  label="Component Name"
                  type="text"
                  name="ComponentName"
                  required
                  autoComplete="off"
                  value={editData.ComponentName}
                  onChange={handleEditChange}
                />
              </div>
              <div className="col-6">
                <Input
                  label="Component Number"
                  type="text"
                  name="ComponentNumber"
                  autoComplete="off"
                  required
                  value={editData.ComponentNumber}
                  onChange={handleEditChange}
                />
              </div>
              <input
                type="submit"
                style={{ display: 'none' }}
                value="submit"
                ref={formRef}
              />
            </div>
          </form>
        )}

      </SideModal>
    </>
  );
};

export default Component;
