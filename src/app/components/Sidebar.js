import React, { useEffect, useState } from 'react';
import { TbLayoutDashboard, TbFriends, TbReport } from 'react-icons/tb';
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
      title: 'Product',
      path: '/component',
      access: 'component',
      icon: <TbLayoutDashboard />,
      dropdown: true,
      dropdownItems: [
        {
          title: 'Operation',
          path: '/operation',
          access: 'operation',
          icon: <TbLayoutDashboard />,
        },
        {
          title: 'Machine Operation',
          path: '/machine_operation',
          access: 'machine_operation',
          icon: <TbLayoutDashboard />,
        },
      ]
    },
    {
      title: 'Dashboard',
      path: '/dashboard',
      access: 'dashboard',
      icon: <TbLayoutDashboard />,
      dropdown: false,
    },
    {
      title: 'Hourly',
      path: '/hourlyDashboard',
      access: 'hourlyDashboard',
      icon: <TbFriends />,
      dropdown: false,
    },
    {
      title: 'Plan',
      path: '/PlanEntry',
      access: 'plan',
      icon: <BsReceipt />,
      dropdown: false,
    },
    {
      title: 'GapReason',
      path: '/reason',
      access: 'gapReason',
      icon: <BiShowAlt />,
      dropdown: false,
    },
    {
      title: 'DownTime',
      path: '/DownTime',
      access: 'DownTime',
      icon: <SlWallet />,
      dropdown: false,
    },
    {
      title: 'Rejection Entry',
      path: '/rejection',
      access: 'rejection',
      icon: <GrEject />,
      dropdown: false,
    },
    {
      title: 'Reports',
      path: '/monthlyReports',
      access: 'monthlyReports',
      icon: <TbReport />,
      dropdown: false,
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
    </div>
  );
};

export default Sidebar;
