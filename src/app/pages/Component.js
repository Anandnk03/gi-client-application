import Button from "../components/Button";
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin3Line } from 'react-icons/ri';
import TableUI from "../components/TableUI";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideModal } from "../redux/layoutSlice";
import { deleteConfirmationAlert } from "../services/AlertService";
import SideModal from "../components/SideModal";
import Input from "../components/Input";
import Animation from "../components/Animation";
import MainWrapper from "../components/MainWrapper";
import { useRef } from "react";
import SelectInput from "../components/SelectInput";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { addComponent} from "../redux/ComponentSlice";
import { addOperation,feactData,getMachine} from "../redux/operationSlice";
import jwtDecode from "jwt-decode";
import { component} from "../redux/commSlice";



const Component = () => {

  const dispatch = useDispatch();
  const location = useLocation();

  const token = localStorage.getItem('token')
  const decoder = jwtDecode(token)

const initialValue ={
  componentNumber: '',
  componentName: '',
  createBy: decoder.name,
  componentName: '',
  operationNumber: '',
  operationName: '',
  componentName: '',
  operationName: '',
  machineName: '',
  perhourOutput: '',
  toct: '',
  cycleTime: ''
}


const [formData,setFormData]=useState(initialValue)


  const [sidebarAction, setSidebarAction] = useState('addcomponent');
  

  const {  status,operationData,machineData } = useSelector(
    (state) => state.operation
  );

 
 
  const {
    componentData,

    status: deptStatus,
  } = useSelector((state) => state.comm);




  console.log("machineData",machineData)

  const componentHeader = [
    {
      name: 'id',
      key: 'id',
      options: {
        display: 'excluded',
        filter: false,
        print: false,
        download: false,
      }
    },
    {
      name: 'Component Number',
      key: 'componentNumber',
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
      name: 'Component Name',
      key: 'Component Name',
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
      key: 'id',
      options: {
        display: 'excluded',
        filter: false,
        print: false,
        download: false,
      }
    },
    {
      name: 'Component Name',
      key: 'componentName',
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
      key: 'operationNumber',
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
      key: 'operationName',
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
      key: 'id',
      options: {
        display: 'excluded',
        filter: false,
        print: false,
        download: false,
      }
    },
    {
      name: 'Component Name',
      key: 'componentName',
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
      key: 'operationName',
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
      key: 'machineName',
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
      key: 'toct',
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
      key: 'perhourOutput',
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
      key: 'cycleTime',
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
          onClick={() => handleComponentEdit(tableMeta.rowData[2])}
        />

        <Button
          icon={<RiDeleteBin3Line />}
          onlyicon="true"
          varient="danger outline"
          small="true"
          data-swal-toast-template="#my-template"
          onClick={() => handleComponentDelete(tableMeta.rowData[0])}
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
          onClick={() => handleOperationEdit(tableMeta.rowData[3])}
        />

        <Button
          icon={<RiDeleteBin3Line />}
          onlyicon="true"
          varient="danger outline"
          small="true"
          data-swal-toast-template="#my-template"
          onClick={() => handleOperationDelete(tableMeta.rowData[0])}
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
          onClick={() => handleMachineEdit(tableMeta.rowData)}
        />

        <Button
          icon={<RiDeleteBin3Line />}
          onlyicon="true"
          varient="danger outline"
          small="true"
          data-swal-toast-template="#my-template"
          onClick={() => handleMachineDelete(tableMeta.rowData[0])}
        />
      </div>
    </div>
  );
  
  const handleRetry = () => dispatch();




  const handleComponentEdit = (value) => {
    const componentName = value;
    setFormData(componentName)
    setSidebarAction('editComponent')
  }

  const handleComponentDelete = async (id) => {

    const { isConfirmed } = await deleteConfirmationAlert.fire();
    if (isConfirmed) {

    }
    else {

    }
  }

  const handleOperationEdit = (value) => {
    const operationName = value;
    setFormData(operationName)
    setSidebarAction('editOperation')
  }

  const handleOperationDelete = async (id) => {

    const { isConfirmed } = await deleteConfirmationAlert.fire();
    if (isConfirmed) {

    }
    else {

    }

  }

  const handleMachineEdit = (value) => {
    const data = {
      machineName: value[3],
      toct: value[4],
      perhourOutput: value[5],
      cycleTime: value[6],
    }
    setFormData(data);
    setSidebarAction('editMachineOperation')
  }

  const handleMachineDelete = async (id) => {
    const { isConfirmed } = await deleteConfirmationAlert.fire();
    if (isConfirmed) {

    }
    else {

    }
  }

  const handleAddbtn = async () => {
    dispatch(toggleSideModal());
    setSidebarAction('addMachineOperation');
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
            ? 'Add Machine':
            'Update'
        }
        small="true"
        onClick={() => formRef.current.click()}
      />
    </>
  );

  const handleComponentChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleOperationChange = (e) => {
    setFormData({
       ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleMachineChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
 
  const option = []

  const handleAddComponent = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(addComponent(formData));
    setSidebarAction('addOperation')       
  }

  const handleAddOperation =  (e) => {
    e.preventDefault();
    console.log(formData)
    dispatch(addOperation(formData))
    setSidebarAction('addMachineOperation')   
  }

  const handleComponentUpdate = async (e) => {
    e.preventDefault();
    console.log(formData)
   
    setFormData(initialValue)
    dispatch(toggleSideModal());

  }

  const handleOperationUpdate = async (e) => {
    e.preventDefault();
    console.log(formData)
    
    setFormData(initialValue)
    dispatch(toggleSideModal());
  }

  const handlemachineUpdate = async (e) => {
    e.preventDefault();
    console.log(formData)
   
    setFormData(initialValue);
    dispatch(toggleSideModal());
  }

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger ms-2'
    },
    buttonsStyling: false
  })

  const handleAddMachineOperation = async (e) => {
    e.preventDefault();
    console.log(formData)
    const response = dispatch();

    if (!response.error) {
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
    }
    else {

      swalWithBootstrapButtons.fire({
        icon: "warning",
        title: 'Machine Operation Failed',

        showCancelButton: true,
        confirmButtonText: 'Machine Operation',
        cancelButtonText: 'Exit',


      }).then((result) => {
        if (result.isConfirmed) {
          setSidebarAction('machineOperation')

        }
        else if (result.dismiss === Swal.DismissReason.cancel) {
          dispatch(toggleSideModal())
        }
      })
    }
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
    dispatch(feactData())
    dispatch(getMachine())
    }


    
  })
  

  return (

    <>

      <MainWrapper moduleComponent={moduleComponent} handleModuleComponent={handleModuleComponent} handleModuleOperation={handleModuleOperation} handleModuleMachine={handleModuleMachine} handleAddbtn={handleAddbtn} title="Component">
        {
          moduleComponent === 1 && (
            <TableUI
              actions={ComponentAction}
              header={componentHeader}
            />
          )
        }

        {
          moduleComponent === 2 && (
            <TableUI
              actions={OperationAction}
              header={operationHeader}
            />
          )
        }

        {
          moduleComponent === 3 && (
            <TableUI
              actions={MachineAction}
              header={MachineHeader}
            />
          )
        }

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
                    onChange={handleComponentChange}
                    value={formData.componentName}
                    required
                    autoComplete ='off' />
                </div>

                <div className="col-6">
                <Input
                  label="Component Number"
                  required
                  type="text"
                  autoComplete ='off'
                  name="componentNumber"
                  onChange={handleComponentChange}
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
                    onChange={handleOperationChange}
                    value={formData.operationNumber}
                    autoComplete='off' />
                </div>

                <div className="col-6">
                  <Input
                    label="Operation Name"
                    type="text"
                    name="operationName"
                    required
                    onChange={handleOperationChange}
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
            <form action="#" method="post" onsubmit ={handleAddMachineOperation}>
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
                    onChange={handleMachineChange}
                    value={formData.toct}
                    autoComplete='off' />
                </div>

                <div className="col-6">
                  <Input
                    label='Output PerHour'
                    type='number'
                    name='perhourOutput'
                    required
                    onChange={handleMachineChange}
                    value={formData.perhourOutput}
                    autoComplete='off' />
                </div>

                <div className="col-6">
                  <Input
                    label='Cycle Time'
                    type='number'
                    name='cycleTime'
                    required
                    onChange={handleMachineChange}
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
          <form action="#" method="post" onsubmit={handleComponentUpdate}>
            <div className="row">
              <label
                className="text-center mt-3 bold"
                style={{ fontWeight: 'bold' }}></label>
              <div className="col-6">
                <Input
                  label="Component Name"
                  type="text"
                  name="componentName"
                  value={formData.componentName}
                  onChange={handleComponentChange}
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
            <form action="#" method="post" onsubmit={handleOperationUpdate}>
              <div className="row">
                <label
                  className="text-center mt-3 bold"
                  style={{ fontWeight: 'bold' }}></label>
                <div className="col-6">
                  <Input
                    label="Operation Name"
                    type="text"
                    name="operationName"
                    value={formData.operationName}
                    onChange={handleOperationChange}
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
            <form action="#" method="post" onsubmit={handlemachineUpdate}>
              <div className="row">
                <label
                  className="text-center mt-3 bold"
                  style={{ fontWeight: 'bold' }}></label>

                <div className="col-6">
                  <Input
                    label="Machine Name"
                    type="text"
                    name="machineName"
                    value={formData.machineName}
                    onChange={handleMachineChange}
                    autoComplete='off'
                  />
                </div>

                <div className="col-6">
                  <Input
                    label='Toct'
                    type='text'
                    name='toct'
                    onChange={handleMachineChange}
                    value={formData.toct}
                    autoComplete='off' />
                </div>

                <div className="col-6">
                  <Input
                    label='Output PerHour'
                    type='number'
                    name='perhourOutput'
                    onChange={handleMachineChange}
                    value={formData.perhourOutput}
                    autoComplete='off' />
                </div>

                <div className="col-6">
                  <Input
                    label='Cycle Time'
                    type='number'
                    name='cycleTime'
                    onChange={handleMachineChange}
                    value={formData.cycleTime}
                    autoComplete='off' />
                </div>

                <div className="col-12">
                  <button type="button" onClick={handlemachineUpdate} className="submit_btn btn btn-success">Update</button>
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