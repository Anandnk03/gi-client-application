import React, { useRef, useState, useEffect } from 'react';
import SelectInput from '../components/SelectInput';
import TableUI from '../components/TableUI';
import MainWrapper from '../components/MainWrapper';
import Animation from '../components/Animation';
import SideModal from '../components/SideModal';
import Button from '../components/Button';
import { BiEdit } from 'react-icons/bi';
import { MdTipsAndUpdates } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { department, machine, module } from '../redux/commSlice';
import {
  category,
  createReason,
  fetchData,
  reason,
  updateNcQty,
  updateReasonQty,
} from '../redux/rejection';
import { toggleSideModal } from '../redux/layoutSlice';
import Input from '../components/Input';
import { Alert } from '../services/AlertService';
import jwtDecode from 'jwt-decode';

const Rejection = () => {
  const dispatch = useDispatch();
  const formRef = useRef();
  const [sidebarAction, setSidebarAction] = useState('add');
  const { departmentStatus, moduleOption, dataOptions, machineOption } =
    useSelector((state) => state.comm);
  const token = localStorage.getItem('token');
  const decodeToken = jwtDecode(token);
  const {
    data,
    status: rejectionStatus,
    categoryData,
    reasonOption,
  } = useSelector((state) => state.rejection);

  const initialValue = {
    AcceptedQuantity: '',
    MachineID: '',
    MachineName: '',
    NCCleared: '',
    NCQuantity: '',
    NCtoClear: '',
    QuantityProduced: '',
    Shift: '',
    ShiftDataID: '',
    ShiftDate: '',
    updateNc: '',
    newReason: '',
    ncClearQty: '',
  };

  const [formData, setFormData] = useState(initialValue);
  const [rowData, SetRowData] = useState([]);

  const handleRetry = () => dispatch();
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
      name: 'ShiftDataID',
      key: 'ShiftDataID',
      options: {
        display: 'excluded',
        filter: false,
        print: false,
        download: false,
      },
    },
    {
      name: 'DATE',
      key: 'ShiftDate',
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
      name: 'MachineName',
      key: 'MachineName',
      options: {
        sort: false,
        display: true,
      },
    },
    {
      name: 'QuantityProduced',
      key: 'QuantityProduced',
      options: {
        sort: false,
        display: true,
      },
    },
    {
      name: 'NCQuantity',
      key: 'NCQuantity',
      options: {
        sort: false,
        display: true,
      },
    },
    {
      name: 'Nc to be Cleared',
      key: 'NCtoClear',
      options: {
        sort: false,
        display: true,
      },
    },
  ];

  const Actions = (value, tableMeta, updateValue) => (
    <>
      <div className="row">
        <div className="col-6">
          <Button
            icon={<BiEdit />}
            onlyicon="true"
            varient="dark outline"
            small="true"
            onClick={() => handleEdit(tableMeta.rowData)}
          />
        </div>
        <div className="col-6">
          <Button
            icon={<MdTipsAndUpdates />}
            onlyicon="true"
            varient="danger outline"
            small="true"
            data-swal-toast-template="#my-template"
            onClick={() => handleQuality(tableMeta.rowData)}
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
            ? 'Update Nc Qty'
            : sidebarAction === 'quality'
            ? 'Update Rejection Qty'
            : ''
        }
        small="true"
        onClick={() => formRef.current.click()}
      />
    </>
  );
  // api calling...

  const handleAdd = (e) => {
    dispatch(toggleSideModal());
    setSidebarAction('add');
  };

  const handleDepart = (e) => {
    dispatch(module(e.value));
    dispatch(machine(e.value));
  };

  const handleModule = (e) => {
    dispatch(fetchData(e.value));
  };

  const handleEdit = (value) => {
    let shitId = value[0];
    const currentData = data.find((da) => da.ShiftDataID === shitId);
    setFormData(currentData);
    let newData = {
      ShiftDate: currentData?.ShiftDate,
      ShiftDataID: currentData?.ShiftDataID,
      QuantityProduced: currentData?.QuantityProduced,
      NCCleared: currentData?.NCCleared,
      NCQuantity: currentData?.NCQuantity,
      NCtoClear: currentData?.NCtoClear,
      MachineID: currentData?.MachineID,
    };
    SetRowData(newData);
    dispatch(toggleSideModal());
    setSidebarAction('edit');
  };

  const handleQuality = (value) => {
    let shitId = value[0];
    const currentData = data.find((da) => da.ShiftDataID === shitId);
    setFormData(currentData);
    let newData = {
      ShiftDate: currentData?.ShiftDate,
      ShiftDataID: currentData?.ShiftDataID,
      QuantityProduced: currentData?.QuantityProduced,
      NCCleared: currentData?.NCCleared,
      NCQuantity: currentData?.NCQuantity,
      NCtoClear: currentData?.NCtoClear,
      MachineID: currentData?.MachineID,
    };
    SetRowData(newData);
    dispatch(toggleSideModal());
    setSidebarAction('quality');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateNcQty = (e) => {
    e.preventDefault();
    if (formData?.updateNc === undefined) {
      return Alert('error', 'Oops ! ,Sorry, Invalid Nc Qty. Please try again');
    }
    const TotalNc = Number(formData?.updateNc) + Number(rowData?.NCQuantity);
    if (TotalNc > Number(rowData?.QuantityProduced)) {
      return Alert(
        'error',
        'Oops, Invalid Nc Qty. NC Qty must be less than or equal to Produced Qty. Please try again'
      );
    }
    const newData = {
      shiftDataId: rowData?.ShiftDataID,
      updateNc: formData?.updateNc,
    };
    dispatch(updateNcQty(newData));
    dispatch(toggleSideModal());
    setFormData(initialValue);
    SetRowData();
  };
  const titleName = 'Please Select Your Department and Module..!';

  const Action = [
    { value: '0', label: 'Rejected' },
    { value: '1', label: 'Accepted' },
  ];

  const handleReason = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddNewReason = (e) => {
    e.preventDefault();
    const newData = {
      MachineID: Number(formData?.MachineID),
      ActionId: formData?.ActionId,
      CategoryID: formData?.CategoryID,
      newReason: formData?.newReason,
    };
    dispatch(createReason(newData));
    dispatch(toggleSideModal());
    setFormData(initialValue);
  };

  const handleQualityReason = (e) => {
    const newData = {
      machineId: rowData?.MachineID,
      reasonType: e.value,
    };
    setFormData({ ...formData, newData });
    dispatch(reason(newData));
  };

  const handleClearQty = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateQuality = (e) => {
    e.preventDefault();
    if (Number(formData?.NCtoClear) < Number(formData?.ncClearQty))
      return Alert(
        'error',
        'Sorry, Nc clear qty must be greater than zero and lesser than or equal to NC Qty. Please try again later.'
      );

    const newData = {
      shiftDataID: formData?.ShiftDataID,
      NcClearQty: Number(formData?.ncClearQty),
      ReasonId: formData?.ReasonId,
      CreateBy: decodeToken?.name,
    };
    console.log(newData);
    dispatch(updateReasonQty(newData));
    dispatch(toggleSideModal());
    setFormData(initialValue);
  };

  useEffect(() => {
    if (departmentStatus === 'idle') dispatch(department());
    if (departmentStatus === 'idle') dispatch(category());
  }, [dispatch]);

  return (
    <>
      <MainWrapper title="Rejection Entry">
        <div className="row mb-1">
          <div className="col-4">
            <SelectInput
              placeholder="Select Your Module"
              options={dataOptions}
              name="value"
              handleChange={handleDepart}
            />
          </div>
          <div className="col-4">
            <SelectInput
              placeholder="Select Your Module"
              options={moduleOption}
              handleChange={handleModule}
              name="value"
            />
          </div>
        </div>
        {rejectionStatus === 'succeeded' ? (
          <TableUI
            toolbar={ToolBar}
            actions={Actions}
            header={header}
            data={data}
          />
        ) : rejectionStatus === 'Loading' ? (
          <Animation type="loading" isCenter />
        ) : rejectionStatus === 'failed' ? (
          <Animation type="error" isCenter retry={handleRetry} />
        ) : rejectionStatus === 'idle' ? (
          <Animation type="idle" isCenter titleName={titleName} />
        ) : (
          ''
        )}
      </MainWrapper>
      <SideModal
        buttons={Controls}
        title={
          sidebarAction === 'add'
            ? 'Add New Reason'
            : sidebarAction === 'edit'
            ? 'Update Rejection Qty'
            : sidebarAction === 'quality'
            ? 'Update Rejection Reason Qty'
            : ''
        }>
        {sidebarAction === 'add' && (
          <form action="#" method="post" onSubmit={handleAddNewReason}>
            <div className="row">
              <div className="col-6">
                <SelectInput
                  options={dataOptions}
                  placeholder="Select Your Department"
                  handleChange={handleDepart}
                />
              </div>
              <div className="col-6">
                <SelectInput
                  options={machineOption}
                  placeholder="Select Your Machine"
                  handleChange={(e) => {
                    setFormData({ ...formData, MachineID: e.value });
                  }}
                />
              </div>
              <div className="col-6 mt-2">
                <SelectInput
                  options={Action}
                  placeholder="Select Your Action"
                  handleChange={(e) => {
                    setFormData({ ...formData, ActionId: e.value });
                  }}
                />
              </div>
              <div className="col-6 mt-2">
                <SelectInput
                  options={categoryData}
                  placeholder="Select Your Category"
                  handleChange={(e) => {
                    setFormData({ ...formData, CategoryID: e.value });
                  }}
                />
              </div>
              <div className="col-12 mt-2">
                <span>New Reason</span>
                <textarea
                  className="form-control textarea"
                  name="newReason"
                  required
                  onChange={handleReason}
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
          <form action="#" method="post" onSubmit={handleUpdateNcQty}>
            <div className="row">
              <label
                className="text-center mt-3 bold"
                style={{ fontWeight: 'bold' }}>
                {formData?.MachineName}
              </label>
              <div className="col-6 mt-3">
                <Input
                  label="Quantity Produced"
                  type="text"
                  value={formData?.QuantityProduced}
                  readOnly
                />
              </div>
              <div className="col-6 mt-3">
                <Input
                  label="Current NCQuantity"
                  type="text"
                  value={formData?.NCQuantity}
                  readOnly
                />
              </div>
              <div className="col-12">
                <Input
                  label="Entry NC Quantity"
                  type="number"
                  value={formData?.updateNc}
                  placeholder="Please Enter NcQty"
                  name="updateNc"
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
        )}
        {sidebarAction === 'quality' && (
          <form method="post" onSubmit={handleUpdateQuality}>
            <div className="row">
              <label
                className="text-center mt-3 bold"
                style={{ fontWeight: 'bold' }}>
                {formData?.MachineName}
              </label>
              <div className="col-4 mt-3">
                <Input
                  label="Quantity Produced"
                  type="number"
                  value={formData?.QuantityProduced}
                  readOnly
                />
              </div>
              <div className="col-4 mt-3">
                <Input
                  label="Current NCQuantity"
                  type="number"
                  value={formData?.NCQuantity}
                  readOnly
                />
              </div>
              <div className="col-4 mt-3">
                <Input
                  label="Nc to be Clear"
                  type="number"
                  value={formData?.NCtoClear}
                  readOnly
                />
              </div>
              <div className="col-6">
                <SelectInput
                  options={Action}
                  placeholder="Select Your Action"
                  name="value"
                  handleChange={handleQualityReason}
                />
              </div>
              <div className="col-6">
                <SelectInput
                  options={reasonOption}
                  placeholder="select Your Reason"
                  handleChange={(e) => {
                    setFormData({ ...formData, ReasonId: e.value });
                  }}
                />
              </div>
              <div className="col-12">
                <Input
                  type="number"
                  name="ncClearQty"
                  label="Nc Clear Qty"
                  value={formData?.ncClearQty}
                  placeholder="Nc Clear Qty"
                  onChange={handleClearQty}
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
    </>
  );
};

export default Rejection;
