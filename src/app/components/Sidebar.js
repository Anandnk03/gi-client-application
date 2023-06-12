import React, { useEffect, useState } from 'react';
import { TbLayoutDashboard, TbFriends } from 'react-icons/tb';
import { BsReceipt } from 'react-icons/bs';
import { GrEject } from 'react-icons/gr';
import { SlWallet } from 'react-icons/sl';
import MenuItem from '../pages/MenuItem';
import { useLocation } from 'react-router-dom';
import { Logo } from '../assets/images';
import { BiShowAlt } from 'react-icons/bi';
import { UserRole } from '../services/Helpers';

const Sidebar = () => {
  const location = useLocation();
  const [path, setPath] = useState(window.location.pathname);
  const menuItems = [
    {
      title: 'Dashboard',
      path: '/',
      access: 'dashboard',
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
      access: 'plan',
      icon: <BsReceipt />,
    },
    {
      title: 'GapReason',
      path: '/reason',
      access: 'gapReason',
      icon: <BiShowAlt />,
    },
    {
      title: 'DownTime',
      path: '/DownTime',
      access: 'DownTime',
      icon: <SlWallet />,
    },
    {
      title: 'Rejection Entry',
      path: '/rejection',
      access: 'rejection',
      icon: <GrEject />,
    },
    {
      title: 'Other',
      path: '/friends',
      access: 'friends',
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
            <>
              {UserRole(menuItem.access, 'view') && (
                <MenuItem
                  item={menuItem}
                  key={index}
                  active={menuItem.path === path ? true : false}
                />
              )}
            </>
          ))}
      </div>

      <div className="copyright">
        <p>&copy; All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Sidebar;
