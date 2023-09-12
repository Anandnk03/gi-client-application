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
    updateOperation,
    getOperationData,
} from '../redux/operationSlice';
import jwtDecode from 'jwt-decode';
import { getMachine } from '../redux/commSlice';
import {
    addMachineOperation,
    updateMachineOperation,
    getMachineOperationData,
} from '../redux/machineOperationSlice';

const Operation = () => {
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
        status: componentStatus,
        componentData,
    } = useSelector((state) => state.component);


    console.log("componentData", componentData)
    const {
        data: operationData,
        operationData: optionData,
        status: operationStatus,
    } = useSelector((state) => state.operation);

    const { data: machineOperationData, status: machineOperationStatus, msg: message } =
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

    const operationHeader = [
        {
            name: 'id',
            key: 'OperationId',
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
            name: 'Operation Number',
            key: 'OperationNumber',
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



    const OperationAction = (value, tableMeta, updateValue) => (
        <div className="row text-center">
            <div className="col-6" style={{ width: '100%' }}>
                <Button
                    icon={<BiEdit />}
                    onlyicon="true"
                    varient="dark outline"
                    small="true"
                    onClick={() => handleOperationEdit(tableMeta.rowData[0])}
                />
            </div>
        </div>
    );

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

    const handleRetry = () => dispatch(getComponentData());



    const handleOperationEdit = (OperationId) => {
        const operation = operationData.find(
            (da) => da.OperationId === OperationId
        );

        let operationParsedData = {
            OperationId: operation.OperationId,
            OperationName: operation.OperationName,
            OperationNumber: operation.OperationNumber,
        };
        setEditData(operationParsedData);
        dispatch(toggleSideModal());
        setSidebarAction('editOperation');
    };

    const handleMachineOperationEdit = (Id) => {
        console.log(Id);
        const machineoperation = machineOperationData.find((da) => da.Id === Id);
        let machineOperationParsedData = {
            Id: machineoperation.Id,
            MachineName: machineoperation.MachineName,
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
                varient="dark"
                value={
                    sidebarAction === 'addOperation'
                        ? 'Add Operation' : 'Edit Operation'
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
                    value="Add Operation"
                    small="true"
                    onClick={
                        moduleComponent === 2
                            ? handleAddOperationbtn : null
                    }
                />
            </>
        );
    };




    const handleAddOperationbtn = async () => {
        dispatch(toggleSideModal());
        setSidebarAction('addOperation');
    }

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


    const handleAddOperation = (e) => {
        e.preventDefault();
        dispatch(addOperation(formData));
        dispatch(getOperationData());
        setFormData(initialValue);
        dispatch(toggleSideModal());

    };



    const handleOperationUpdate = async (e) => {
        e.preventDefault();
        dispatch(updateOperation(editData));
        setFormData(editInitialValue);
        dispatch(toggleSideModal());
        dispatch(getMachineOperationData());
    };



    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger ms-2',
        },
        buttonsStyling: false,
    });


    const [moduleComponent, setModuleComponent] = useState(2);

    const handleModuleOperation = () => {
        setModuleComponent(2);
    };



    useEffect(() => {
        dispatch(getComponentData());
        if (operationStatus === 'idle') {
            dispatch(getMachine());
            dispatch(getComponentData());
            dispatch(getOperationData());
            dispatch(getMachineOperationData());
        }
    });
    return (
        <>
            <MainWrapper
                title="Operation"
                moduleComponent={moduleComponent}
                handleModuleOperation={handleModuleOperation}
            >

                {moduleComponent === 2 && (
                    <>
                        {operationStatus === 'succeeded' ? (
                            <TableUI
                                toolbar={ToolBar}
                                actions={OperationAction}
                                header={operationHeader}
                                data={operationData}
                            />
                        ) : operationStatus === 'loading' ? (
                            <Animation type="loading" isCenter />
                        ) : operationStatus === 'failed' ? (
                            <Animation type="error" isCenter retry={handleRetry} />
                        ) : operationStatus === 'idle' ? (
                            <Animation type="idle" isCenter titleName="" />
                        ) : (
                            ''
                        )}
                    </>
                )}

            </MainWrapper>

            <SideModal
                buttons={Controls}
                title={sidebarAction === 'addOperation'
                    ? 'Add Your Operation'
                    : sidebarAction === 'editOperation'
                }>
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
                                    required
                                    handleChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            componentName: e.value,
                                        })
                                    }
                                    name="componentName"
                                    value={formData.componentName}
                                    placeholder="Select Component Name"
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

                {sidebarAction === 'editOperation' && (
                    <form action="#" method="post" onSubmit={handleOperationUpdate}>
                        <div className="row">
                            <label
                                className="text-center mt-3 bold"
                                style={{ fontWeight: 'bold' }}></label>
                            <div className="col-6">
                                <Input
                                    label="Operation Name"
                                    type="text"
                                    name="OperationName"
                                    required
                                    autoComplete="off"
                                    value={editData.OperationName}
                                    onChange={handleEditChange}
                                />
                            </div>
                            <div className="col-6">
                                <Input
                                    label="Operation Number"
                                    type="text"
                                    name="OperationNumber"
                                    required
                                    autoComplete="off"
                                    value={editData.OperationNumber}
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
    )
}

export default Operation