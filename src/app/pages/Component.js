import Button from "../components/Button";
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin3Line } from 'react-icons/ri';
import TableUI from "../components/TableUI";
import { useEffect,useState,useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideModal } from "../redux/layoutSlice";
import SideModal from "../components/SideModal";
import Input from "../components/Input";
import Animation from "../components/Animation";
import MainWrapper from "../components/MainWrapper";
import SelectInput from "../components/SelectInput";
import Swal from "sweetalert2";
import { addComponent,updateComponent} from "../redux/ComponentSlice";
import { addOperation,updateOperation} from "../redux/operationSlice";
import jwtDecode from "jwt-decode";
import { component,operation,getMachine,getComponentData,getOperationData,getMachineOperationData} from "../redux/commSlice";
import { addMachineOperation,updateMachineOperation} from "../redux/machineOperationSlice";



const Component = () => {

  const dispatch = useDispatch();
  

  const token = localStorage.getItem('token')
  const decoder = jwtDecode(token)

const initialValue ={
  componentNumber: '',
  componentName: '',
  createBy: decoder.name,
  operationNumber: '',
  operationName:'',
  machineName: '',
  perhourOutput: '',
  toct: '',
  cycleTime: '',
}

const editInitialValue ={
   ComponentId:'',
   ComponentName:'',
   ComponentNumber:'',
   OperationId:'',
   OperationName:'',
   OperationNumber: '',
   Id:'',
   MachineName: '',
   Toct: '',
   CycleTime: '',
   PerhourOutput: '',
}


  const [formData,setFormData]=useState(initialValue)
  const [sidebarAction, setSidebarAction] = useState('addcomponent');
  const [editData,setEditData] = useState(editInitialValue)
 
  const {
    componentData,
    operationData,
    machineData,
    componentDatas,
    operationDatas,
    machineOperationDatas,
    status: deptStatus,
  } = useSelector((state) => state.comm);


  const componentHeader = [
    {
      name: 'id',
      key: 'ComponentId',
      options: {
        display: 'excluded',
        filter: false,
        print: false,
        download: false,
      }
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
      }
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
      }
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

  const handleComponentEdit = (ComponentId) => {
 
      const currentData = componentDatas.find((da) => da.ComponentId=== ComponentId);
     
      let currentParsedData = {
         ComponentId:currentData.ComponentId,
         ComponentName:currentData.ComponentName,
         ComponentNumber:currentData.ComponentNumber,
      };
      setEditData(currentParsedData);
      console.log(editData)
      dispatch(toggleSideModal());
      setSidebarAction('editComponent');
    };
  

  const handleOperationEdit = (OperationId) => {
    
    const operationData = operationDatas.find((da)=>da.OperationId === OperationId);
   
    let operationParsedData ={
       OperationId:operationData.OperationId,
       OperationName:operationData.OperationName,
       OperationNumber:operationData.OperationNumber
    }
    setEditData(operationParsedData)
    dispatch(toggleSideModal());
    setSidebarAction('editOperation')
  }


  const handleMachineOperationEdit = (id) => {
  
    const machineoperation =  machineOperationDatas.find((da)=>da.Id === id)
    let machineOperationParsedData ={
      Id:machineoperation.Id,
      MachineName:machineoperation.MachineName,
      Toct:machineoperation.Toct,
      PerhourOutput:machineoperation.OutputPerhour,
      CycleTime:machineoperation.CycleTime
    }
    setEditData(machineOperationParsedData)
    dispatch(toggleSideModal())
    setSidebarAction('editMachineOperation')
  }

  const handleAddbtn = async () => {
    dispatch(toggleSideModal());
    setSidebarAction('addComponent');
  }

  const formRef = useRef();

  const Controls = (
    <>
      <Button
        type="button"
        varient="dark "
        value={
            sidebarAction === 'addComponent'
            ? 'Add Component':
            sidebarAction === 'addOperation'
            ? 'Add Operation':
            sidebarAction === 'addMachineOperation'
            ? 'Add Machine Operation':
            'Update'
        }
        small="true"
        onClick={() => formRef.current.click()}
      />
    </>
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleEditChange = (e)=>{
    setEditData({
      ...editData,
      [e.target.name]:e.target.value
    })
  }


  const handleAddComponent = (e) => {
    e.preventDefault();
    dispatch(addComponent(formData));
    setFormData(initialValue);
    dispatch(component());
    setSidebarAction('addOperation');    
  }

  const handleAddOperation =  (e) => {
    e.preventDefault();
    dispatch(addOperation(formData));
    dispatch(operation());
    setFormData(initialValue);
    setSidebarAction('addMachineOperation');
  }

  const handleComponentUpdate = async (e) => {
    e.preventDefault();
    dispatch(updateComponent(editData));
    dispatch(toggleSideModal());
    setFormData(editInitialValue);
    dispatch(getComponentData());
  }

  const handleOperationUpdate = async (e) => {
    e.preventDefault(); 
    dispatch(updateOperation(editData))
    setFormData(editInitialValue)
    dispatch(toggleSideModal());
    dispatch(getOperationData())
  }

  const handlemachineUpdate = async (e) => {
    e.preventDefault();
    dispatch(updateMachineOperation(editData))
    setFormData(editInitialValue);
    dispatch(toggleSideModal());
    dispatch(getMachineOperationData())
  }

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger ms-2'
    },
    buttonsStyling: false
  })

  const handleAddMachineOperation = (e) => {
    e.preventDefault();
    dispatch(addMachineOperation(formData));
    dispatch(getComponentData())
    dispatch(getOperationData())
    dispatch(getMachineOperationData())
  
      swalWithBootstrapButtons.fire({
        icon: "success",
        title: 'Machine Operation Success',

        showCancelButton: true,
        confirmButtonText: 'Add Operation',
        cancelButtonText: 'Exit',


      }).then((result) => {
        if (result.isConfirmed) {
          setSidebarAction('addOperation')
        }
        else if (result.dismiss === Swal.DismissReason.cancel) {

          dispatch(toggleSideModal())
        }
      })
   
      setFormData(initialValue);
  }

  const [moduleComponent, setModuleComponent] = useState(1);

  const handleModuleComponent = () => {
    setModuleComponent(1);
  }

  const handleModuleOperation = () => {
    setModuleComponent(2);
  }

  const handleModuleMachine = () => {
    setModuleComponent(3);
  }

  useEffect(() => {
    if(deptStatus === 'idle'){
      dispatch(component())
      dispatch(operation())
      dispatch(getMachine())
      dispatch(getComponentData())
      dispatch(getOperationData())
      dispatch(getMachineOperationData())
    }
  })
  
  return (

    <>

      <MainWrapper title="Component" moduleComponent={moduleComponent} handleModuleComponent={handleModuleComponent} handleModuleOperation={handleModuleOperation} handleModuleMachine={handleModuleMachine} handleAddbtn={handleAddbtn} >
    
      {
        deptStatus ==='succeeded'?(
         moduleComponent === 1 && (
            <TableUI
              actions={ComponentAction}
              header={componentHeader}
              data={componentDatas}
            />
          )
          ) :deptStatus === 'loading' ? (
            <Animation type="loading" isCenter />
          ) :deptStatus === 'failed' ? (
            <Animation type="error" isCenter retry={handleRetry} />
          ) :deptStatus === 'idle' ? (
            <Animation type="idle" isCenter titleName='' />
          ) : (
            ''
          )}  
    
        { moduleComponent === 2 && (
            <TableUI
              actions={OperationAction}
              header={operationHeader}
              data={operationDatas}
            />
          )}
        
          {moduleComponent === 3 && (
            <TableUI
              actions={MachineAction}
              header={MachineHeader}
              data={machineOperationDatas}
            />
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
                  ? 'Edit Your Component'
                  : sidebarAction === 'editOperation'
                    ? 'Edit Your Operation'
                    : sidebarAction === 'editMachineOperation'
                      ? 'Edit Your Machine Operation'
                      : ''
        }>

        {
          sidebarAction === 'addComponent' &&
          (
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
                    autoComplete ='off'/>
                </div>

                <div className="col-6">
                <Input
                  label="Component Number"
                  required
                  type="text"
                  autoComplete ='off'
                  name="componentNumber"
                  onChange={handleChange}
                  value={formData.componentNumber}/>
              </div>
              
                <input
                type="submit"
                style={{ display: 'none' }}
                value="submit"
                ref={formRef}
              />  
              </div>
            </form>
          )
        }

         {
          sidebarAction === 'addOperation' &&
          (
            <form action="#" method="post" onSubmit={handleAddOperation} >
              <div className="row">
                <label
                  className="text-center mt-3 bold"
                  style={{ fontWeight: 'bold' }}></label>


                <div className="col-6">

                  <SelectInput
                    label='Select Component Name'
                    options={componentData}
                    required
                    handleChange={(e) => setFormData({
                      ...formData,
                      componentName: e.value
                    })}
                    name='componentName'
                    value={formData.componentName}
                    placeholder='Select Component Name' />

                </div>
                <div className="col-6">
                  <Input
                    label="Operation Number"
                    type="text"
                    name="operationNumber"
                    required
                    onChange={handleChange}
                    value={formData.operationNumber}
                    autoComplete='off' />
                </div>

                <div className="col-6">
                  <Input
                    label="Operation Name"
                    type="text"
                    name="operationName"
                    required
                    onChange={handleChange}
                    value={formData.operationName}
                    autoComplete='off' />
                </div>
              <input
                type="submit"
                style={{ display: 'none' }}
                value="submit"
                ref={formRef}
              />  
              </div>
            </form>
          )
        }

        {sidebarAction === 'addMachineOperation' &&
          (
            <form action="#" method="post" onSubmit ={handleAddMachineOperation}>
              <div className="row">
                <label
                  className="text-center mt-3 bold"
                  style={{ fontWeight: 'bold' }}></label>
                <div className="col-6">

                  <SelectInput
                    label='Select Component Name'
                    options={componentData}
                    value={formData.componentName}
                    handleChange={(e) => setFormData({
                      ...formData,
                      componentName: e.value
                    })}
                    name='componentName'
                    required
                    placeholder='Select Component Name' />
                </div>



                <div className="col-6">
                  <SelectInput
                    label='Select Operation Name'
                    options={operationData}
                    value={formData.operationName}
                    handleChange={(e) => setFormData({
                      ...formData,
                      operationName: e.value
                    })}
                    name='operationName'
                    required
                    placeholder='Select Operation Name' />
                </div>

                <div className="col-6">

                <SelectInput
                  label='Select Machine Name'
                  options={machineData}
                  value={formData.machineName}
                  handleChange={(e) => setFormData({
                    ...formData,
                    machineName: e.value
                  })}
                  name='machineName'
                  required
                  placeholder='Select Machine Name' />
              </div>


                <div className="col-6">
                  <Input
                    label='Toct'
                    type='text'
                    name='toct'
                    required
                    onChange={handleChange}
                    value={formData.toct}
                    autoComplete='off' />
                </div>

                <div className="col-6">
                  <Input
                    label='Output PerHour'
                    type='number'
                    name='perhourOutput'
                    required
                    onChange={handleChange}
                    value={formData.perhourOutput}
                    autoComplete='off' />
                </div>

                <div className="col-6">
                  <Input
                    label='Cycle Time'
                    type='number'
                    name='cycleTime'
                    required
                    onChange={handleChange}
                    value={formData.cycleTime}
                    autoComplete='off' />
                </div>
                <input
                type="submit"
                style={{ display: 'none' }}
                value="submit"
                ref={formRef}
              />  
              </div>

            </form>
          )
        }

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
                  autoComplete ='off'
                  value={editData.ComponentName}
                  onChange={handleEditChange}
                />
              </div>
              <div className="col-6">
              <Input
                label="Component Number"
                type="text"
                name="ComponentNumber"
                autoComplete ='off'
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

        {
          sidebarAction === 'editOperation' && (
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
                    autoComplete ='off'
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
                  autoComplete ='off'
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
          )
        }

        {
          sidebarAction === 'editMachineOperation' && (
            <form action="#" method="post" onSubmit={handlemachineUpdate}>
              <div className="row">
                <label
                  className="text-center mt-3 bold"
                  style={{ fontWeight: 'bold' }}></label>

                  <div className="col-6">
                  <Input
                    label='Machine Name'
                    type='text'
                    name='MachineName'
                    required
                    onChange={handleEditChange}
                    value={editData.MachineName}
                    autoComplete='off' />
                </div>

                <div className="col-6">
                  <Input
                    label='Toct'
                    type='text'
                    name='Toct'
                    required
                    onChange={handleEditChange}
                    value={editData.Toct}
                    autoComplete='off' />
                </div>

                <div className="col-6">
                  <Input
                    label='Output PerHour'
                    type='number'
                    name='PerhourOutput'
                    required
                    onChange={handleEditChange}
                    value={editData.PerhourOutput}
                    autoComplete='off' />
                </div>

                <div className="col-6">
                  <Input
                    label='Cycle Time'
                    type='number'
                    name='CycleTime'
                    required
                    onChange={handleEditChange}
                    value={editData.CycleTime}
                    autoComplete='off' />
                </div>
                <input
                type="submit"
                style={{ display: 'none' }}
                value="submit"
                ref={formRef}
              />  
              </div>
            </form>
          )
        }

      </SideModal>

    </>

  )
}

export default Component;