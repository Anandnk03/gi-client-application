import React, { useEffect, useRef, useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import MainWrapper from '../components/MainWrapper';
import SideModal from '../components/SideModal';
import TableUI from '../components/TableUI';

import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin3Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { toggleSideModal } from '../redux/layoutSlice';

const TestPage = () => {
  const dispatch = useDispatch();
  const initialFormDatas = { date: '', machineName: '', isMailRequired: true };
  const formRef = useRef();
  const [sidebarAction, setSidebarAction] = useState('add');
  const [formDatas, setFormDatas] = useState(initialFormDatas);

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
      key: 'id',
      options: {
        display: 'excluded',
        filter: false,
        print: false,
        download: false,
      },
    },
    {
      name: 'DATE',
      key: 'date',
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
      name: 'MACHINE NAME',
      key: 'machineName',
      options: {
        display: true,
      },
    },
    {
      name: 'PRODUCT',
      key: 'product',
      options: {
        display: true,
        sort: false,
      },
    },
    {
      name: 'PLAN',
      key: 'plan',
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
      />
      <Button
        icon={<RiDeleteBin3Line />}
        onlyicon="true"
        varient="danger outline"
        small="true"
        data-swal-toast-template="#my-template"
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
  const dataFriends = [];

  // api Details
  const handleAdd = () => {
    setFormDatas(initialFormDatas);
    setSidebarAction('add');
    dispatch(toggleSideModal());
  };

  const handleChange = (e) =>
    setFormDatas({ ...formDatas, [e.target.name]: e.target.value });
  return (
    <>
      <MainWrapper title="Plan Entry">
        <TableUI
          toolbar={ToolBar}
          actions={Actions}
          header={header}
          data={dataFriends}
        />
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
        <form action="#" method="post">
          <Input
            label="Friend Name"
            placeholder="Please add friend name"
            name="name"
            required={true}
            onChange={handleChange}
          />
          <Input
            type="email"
            label="Email Address"
            placeholder="Please Enter Email Address"
            name="email"
            required={true}
            onChange={handleChange}
          />
          {/* ALWAYS KEEP THIS BELOW */}
          <input
            type="submit"
            style={{ display: 'none' }}
            value="submit"
            ref={formRef}
          />
        </form>
      </SideModal>
    </>
  );
};

export default TestPage;
