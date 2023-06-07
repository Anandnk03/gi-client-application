import React, { useEffect, useState } from 'react';
import { TbLayoutDashboard, TbFriends } from 'react-icons/tb';
import { BsReceipt } from 'react-icons/bs';
import { MdOutlineAccountTree } from 'react-icons/md';
import { SlWallet } from 'react-icons/sl';
import { GiTakeMyMoney } from 'react-icons/gi';
import MenuItem from '../pages/MenuItem';
import { useLocation } from 'react-router-dom';
import { Logo } from '../assets/images';

const Sidebar = () => {
  const location = useLocation();
  const [path, setPath] = useState(window.location.pathname);
  const menuItems = [
    {
      title: 'Dashboard',
      path: '/',
      icon: <TbLayoutDashboard />,
    },
    {
      title: 'Hourly',
      path: '/hourlydashboard',
      icon: <TbFriends />,
    },
    {
      title: 'Plan',
      path: '/PlanEntry',
      icon: <BsReceipt />,
    },
    {
      title: 'GapReason',
      path: '/home',
      icon: <GiTakeMyMoney />,
    },
    {
      title: 'DownTime',
      path: '/wallet',
      icon: <SlWallet />,
    },
    {
      title: 'Role',
      path: '/categories',
      icon: <MdOutlineAccountTree />,
    },
    {
      title: 'Other',
      path: '/friends',
      icon: <TbFriends />,
    },
    {
      title: 'Hourly Dashboard',
      path: '/friends',
      icon: <TbFriends />,
    },
  ];

  useEffect(() => {
    let newPath = window.location.pathname;
    newPath = newPath.split('/');
    newPath = newPath.filter(function (pa) {
      return pa !== '';
    });
    newPath = newPath[0] ? `/${newPath[0]}` : '/';
    setPath(newPath);
  }, [location]);

  return (
    <div className="left-side-bar">
      <img
        src={Logo}
        alt="Logo"
        className="img img-responsive logo"
        draggable="false"
      />
      <div className="menu-bar">
        {menuItems &&
          menuItems.map((menuItem, index) => (
            <MenuItem
              item={menuItem}
              key={index}
              active={menuItem.path === path ? true : false}
            />
          ))}
      </div>

      <div className="copyright">
        <p>&copy; All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Sidebar;
