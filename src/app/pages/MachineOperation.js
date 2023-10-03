import Button from '../components/Button';
import { BiEdit } from 'react-icons/bi';
import TableUI from '../components/TableUI';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSideModal } from '../redux/layoutSlice';
import SideModal from '../components/SideModal';
import Input from '../components/Input';
import Animation from '../components/Animation';
import MainWrapper from '../components/MainWrapper';
import SelectInput from '../components/SelectInput';

import { getComponentData } from '../redux/ComponentSlice';
import { getOperationData } from '../redux/operationSlice';
import jwtDecode from 'jwt-decode';
import { getMachine } from '../redux/commSlice';
import {
  addMachineOperation,
  updateMachineOperation,
  getMachineOperationData,
} from '../redux/machineOperationSlice';

const MachineOperation = () => {
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
    programId: '',
    quantityPerCycle: '',
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
    ProgramId: '',
    QuantityPerCycle: '',
  };

  const [formData, setFormData] = useState(initialValue);
  const [sidebarAction, setSidebarAction] = useState('addcomponent');
  const [editData, setEditData] = useState(editInitialValue);

  const { componentData } = useSelector((state) => state.component);

  const { operationData: optionData } = useSelector((state) => state.operation);

  const {
    data: machineOperationData,
    MachineOperation_Status: machineOperationStatus,
  } = useSelector((state) => state.machineOperation);

  const { machineData, status: deptStatus } = useSelector(
    (state) => state.comm
  );

  const MachineHeader = [
    {
      name: 'id',
      key: 'Id',
      options: {
        display: 'excluded',
        filter: false,
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
      name: 'Operation Name',
      key: 'OperationName',
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
      name: 'Machine Name',
      key: 'MachineName',
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
      name: 'Program Id',
      key: 'ProgramId',
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
      name: 'Quantity PerCycle',
      key: 'QuantityPerCycle',
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
      name: 'Toct',
      key: 'Toct',
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
      name: 'Output PerHour',
      key: 'OutputPerhour',
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
      name: 'Cycle Time',
      key: 'CycleTime',
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

  const MachineAction = (value, tableMeta, updateValue) => (
    <div className="row text-center">
      <div className="col-6" style={{ width: '100%' }}>
        <Button
          icon={<BiEdit />}
          onlyicon="true"
          varient="dark outline"
          small="true"
          onClick={() => handleMachineOperationEdit(tableMeta.rowData[0])}
        />
      </div>
    </div>
  );

  const handleRetry = () => dispatch(getComponentData(), getOperationData());

  const handleMachineOperationEdit = (Id) => {
    const machineoperation = machineOperationData.find((da) => da.Id === Id);
    let machineOperationParsedData = {
      Id: machineoperation.Id,
      MachineName: machineoperation.MachineName,
      ProgramId: machineoperation.ProgramId,
      QuantityPerCycle: machineoperation.QuantityPerCycle,
      Toct: machineoperation.Toct,
      PerhourOutput: machineoperation.OutputPerhour,
      CycleTime: machineoperation.CycleTime,
    };
    setEditData(machineOperationParsedData);
    dispatch(toggleSideModal());
    setSidebarAction('editMachineOperation');
  };

  const formRef = useRef();

  const Controls = (
    <>
      <Button
        type="button"
        varient="dark "
        value={
          sidebarAction === 'addMachineOperation'
            ? 'Add Machine Operation'
            : 'Edit Machine Operation'
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
          value="Add MachineOperation"
          small="true"
          onClick={handleAddMachineOperationbtn}
        />
      </>
    );
  };

  const handleAddMachineOperationbtn = async () => {
    dispatch(toggleSideModal());
    setSidebarAction('addMachineOperation');
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

  const handlemachineUpdate = async (e) => {
    e.preventDefault();
    dispatch(updateMachineOperation(editData));
    setFormData(editInitialValue);
    dispatch(toggleSideModal());
    dispatch(getMachineOperationData());
  };

  const handleAddMachineOperation = (e) => {
    e.preventDefault();
    dispatch(addMachineOperation(formData));
    dispatch(getMachineOperationData());
    dispatch(toggleSideModal());
  };

  useEffect(() => {
    if (deptStatus === 'idle') {
      dispatch(getMachine());
      dispatch(getOperationData());
      dispatch(getMachineOperationData());
      dispatch(getComponentData());
    }
  });
  return (
    <>
      <MainWrapper title="Machine Operation">
        <>
          {machineOperationStatus === 'succeeded' ? (
            <TableUI
              toolbar={ToolBar}
              actions={MachineAction}
              header={MachineHeader}
              data={machineOperationData}
            />
          ) : machineOperationStatus === 'loading' ? (
            <Animation type="loading" isCenter />
          ) : machineOperationStatus === 'failed' ? (
            <Animation type="error" isCenter retry={handleRetry} />
          ) : machineOperationStatus === 'idle' ? (
            <Animation type="idle" isCenter titleName="" />
          ) : (
            ''
          )}
        </>
      </MainWrapper>

      <SideModal
        buttons={Controls}
        title={
          sidebarAction === 'addMachineOperation'
            ? 'Add Your Machine Operation'
            : 'Edit Your Machine Operation'
        }>
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
                  name="value"
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
                  required
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
        {sidebarAction === 'editMachineOperation' && (
          <form action="#" method="post" onSubmit={handlemachineUpdate}>
            <div className="row">
              <label
                className="text-center mt-3 bold"
                style={{ fontWeight: 'bold' }}></label>

              <div className="col-6">
                <Input
                  label="Machine Name"
                  type="text"
                  name="MachineName"
                  required
                  readOnly
                  onChange={handleEditChange}
                  value={editData.MachineName}
                  autoComplete="off"
                />
              </div>

              <div className="col-6">
                <Input
                  label="Program Id"
                  type="text"
                  name="ProgramId"
                  required
                  onChange={handleEditChange}
                  value={editData.ProgramId}
                  autoComplete="off"
                />
              </div>

              <div className="col-6">
                <Input
                  label="Quantity PerCycle"
                  type="number"
                  name="QuantityPerCycle"
                  required
                  onChange={handleEditChange}
                  value={editData.QuantityPerCycle}
                  autoComplete="off"
                />
              </div>

              <div className="col-6">
                <Input
                  label="Toct"
                  type="text"
                  name="Toct"
                  required
                  onChange={handleEditChange}
                  value={editData.Toct}
                  autoComplete="off"
                />
              </div>

              <div className="col-6">
                <Input
                  label="Output PerHour"
                  type="number"
                  name="PerhourOutput"
                  required
                  onChange={handleEditChange}
                  value={editData.PerhourOutput}
                  autoComplete="off"
                />
              </div>

              <div className="col-6">
                <Input
                  label="Cycle Time"
                  type="number"
                  name="CycleTime"
                  required
                  onChange={handleEditChange}
                  value={editData.CycleTime}
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
      </SideModal>
    </>
  );
};

export default MachineOperation;
