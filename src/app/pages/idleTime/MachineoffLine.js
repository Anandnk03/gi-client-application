import React, { useEffect, useRef, useState } from 'react';
import MainWrapper from '../../components/MainWrapper';
import { useDispatch, useSelector } from 'react-redux';
import Animation from '../../components/Animation';
import TableUI from '../../components/TableUI';
import Button from '../../components/Button';
import { BiEdit } from 'react-icons/bi';
import { toggleSideModal } from '../../redux/layoutSlice';
import { AddMachine, fetchData, updateMachine } from '../../redux/IdleSlice';
import SideModal from '../../components/SideModal';
import Input from '../../components/Input';
import SelectInput from '../../components/SelectInput';
import { department } from '../../redux/commSlice';
import { Alert } from '../../services/AlertService';

const MachineOffLine = () => {
  const dispatch = useDispatch();
  const formRef = useRef();
  const [sidebarAction, setSidebarAction] = useState('add');
  const { MachineStatus, MachineData } = useSelector((state) => state.idle);
  const { dataOptions } = useSelector((state) => state.comm);

  const initialValue = {
    MachineName: '',
    AssemblyId: '',
    AssemblySequence: '',
    MachineId: '',
  };
  const [formData, setFormData] = useState(initialValue);

  const handleRetry = () => dispatch();

  const ToolBar = () => {
    return (
      <>
        <Button
          value="Add New Machine"
          varient="dark ms-2"
          small="true"
          onClick={handleAdd}
        />
      </>
    );
  };

  const Actions = (value, tableMeta, updateValue) => (
    <>
      <div className="row text-center">
        <div className="col-6" style={{ width: '100%' }}>
          <Button
            icon={<BiEdit />}
            onlyicon="true"
            varient="dark outline"
            small="true"
            onClick={() => handleEdit(tableMeta.rowData)}
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
            : ''
        }
        small="true"
        onClick={() => formRef.current.click()}
      />
    </>
  );

  const handleAdd = () => {
    setFormData(initialValue);
    dispatch(toggleSideModal());
    setSidebarAction('add');
  };

  const handleEdit = (value) => {
    const newData = {
      MachineId: value[0],
      MachineName: value[1],
      AssemblySequence: value[3],
      AssemblyId: value[4],
    };
    setFormData(newData);
    dispatch(toggleSideModal());
    setSidebarAction('edit');
  };

  const handleChange = (e, actionMeta, value) => {
    console.log(e);
    setFormData({
      ...formData,
      [e.target?.name]: e.target?.value,
    });
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
      name: 'Machine Name',
      key: 'MACHINENAME',
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
      name: 'Assembly Name',
      key: 'DEPARTMENTNAME',
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
      name: 'Assembly Sequence',
      key: 'Assembly_Sequence',
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
      name: 'Assembly Id',
      key: 'ASSEMBLYID',
      options: {
        sort: false,
        display: false,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const filter = MachineData.filter(
      (da) => da.ASSEMBLYID === formData?.AssemblyId
    );
    const CheckData = filter.find(
      (item) => item.Assembly_Sequence === Number(formData?.AssemblySequence)
    );
    const MachineCheck = filter.find(
      (item) => item.MACHINENAME === formData.MachineName
    );
    if (MachineCheck)
      return Alert('error', 'This MachineName Already Exist...!');
    if (CheckData) return Alert('error', 'This Sequence Already Exist...!');
    dispatch(AddMachine(formData));
    setFormData(initialValue);
    dispatch(toggleSideModal());
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (
      MachineData.find(
        (value) =>
          value.MACHINENAME != formData.MachineName &&
          value.Assembly_Sequence != formData.AssemblySequence
      )
    ) {
      const filter = MachineData.filter(
        (da) => da.ASSEMBLYID === Number(formData?.AssemblyId)
      );
      const CheckData = filter.find(
        (item) => item.Assembly_Sequence === Number(formData?.AssemblySequence)
      );
      const MachineCheck = filter.find(
        (item) => item.MACHINENAME === formData.MachineName
      );
      if (MachineCheck)
        return Alert('error', 'This MachineName Already Exist...!');
      if (CheckData) return Alert('error', 'This Sequence Already Exist...!');
      dispatch(updateMachine(formData));
      setFormData(initialValue);
      dispatch(toggleSideModal());
    } else {
      const filter = MachineData.filter(
        (da) => da.ASSEMBLYID === Number(formData?.AssemblyId)
      );
      const CheckData = filter.find(
        (item) => item.Assembly_Sequence === Number(formData?.AssemblySequence)
      );
      if (CheckData) return Alert('error', 'This Sequence Already Exist...!');
      dispatch(updateMachine(formData));
      setFormData(initialValue);
      dispatch(toggleSideModal());
    }
  };

  useEffect(() => {
    if (MachineStatus) dispatch(fetchData());
    dispatch(department());
  }, [dispatch]);

  return (
    <>
      <MainWrapper title="MachineAdd">
        {MachineStatus === 'succeeded' ? (
          <TableUI
            toolbar={ToolBar}
            actions={Actions}
            header={header}
            data={MachineData}
          />
        ) : MachineStatus === 'Loading' ? (
          <Animation type="loading" isCenter />
        ) : MachineStatus === 'failed' ? (
          <Animation type="error" isCenter retry={handleRetry} />
        ) : MachineStatus === 'idle' ? (
          <Animation type="idle" isCenter titleName={'Select Your Reason'} />
        ) : (
          ''
        )}{' '}
      </MainWrapper>
      <SideModal
        buttons={Controls}
        title={
          sidebarAction === 'add'
            ? 'New Machine'
            : sidebarAction === 'edit'
            ? 'Update Machine'
            : ''
        }>
        {sidebarAction === 'add' && (
          <form action="#" method="post" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-6">
                <Input
                  label="MachineName"
                  type="text"
                  placeholder="Machine Name"
                  onChange={handleChange}
                  name="MachineName"
                  value={formData.MachineName}
                />
              </div>
              <div className="col-6">
                <SelectInput
                  label="Assembly"
                  formData={formData.AssemblyId}
                  options={dataOptions}
                  name="AssemblyId"
                  handleChange={(e) =>
                    setFormData({
                      ...formData,
                      AssemblyId: e.value,
                    })
                  }
                />
              </div>
              <div className="col-12">
                <Input
                  label="Assembly Sequence"
                  type="Number"
                  placeholder="Assembly Sequence"
                  onChange={handleChange}
                  name="AssemblySequence"
                  value={formData.AssemblySequence}
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
        {sidebarAction === 'edit' && (
          <form action="#" method="post" onSubmit={handleUpdate}>
            <div className="row">
              <label
                className="text-center mt-3 bold"
                style={{ fontWeight: 'bold' }}></label>
              <div className="col-6">
                <Input
                  label="Machine Name"
                  type="text"
                  name="MachineName"
                  value={formData.MachineName}
                  onChange={handleChange}
                />
              </div>
              <div className="col-6">
                <Input
                  label="Assembly Sequence"
                  type="Number"
                  name="AssemblySequence"
                  min={1}
                  value={formData.AssemblySequence}
                  onChange={handleChange}
                />
              </div>
              <SelectInput
                label="Assembly"
                formData={formData.AssemblyId}
                options={dataOptions}
                name="AssemblyId"
                handleChange={(e) =>
                  setFormData({
                    ...formData,
                    AssemblyId: e.value,
                  })
                }
              />
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
    </>
  );
};

export default MachineOffLine;
