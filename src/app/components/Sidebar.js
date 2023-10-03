import React, { useEffect, useState } from 'react';
import { TbLayoutDashboard, TbFriends, TbReport } from 'react-icons/tb';
import {
  BsReceiptCutoff,
  BsGear,
  BsBarChartLine,
  BsPatchCheck,
  BsSpeedometer2,
} from 'react-icons/bs';
import { TfiDashboard } from 'react-icons/tfi';
import {
  MdOutlineTimer,
  MdOutlineCancelScheduleSend,
  MdProductionQuantityLimits,
} from 'react-icons/md';
import { RxCountdownTimer } from 'react-icons/rx';
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
      title: 'Status',
      path: '/machine_status',
      access: 'machine_status',
      icon: <BsPatchCheck />,
      dropdown: false,
    },
    {
      title: 'Dashboard',
      path: '/dashboard',
      access: 'dashboard',
      icon: <TfiDashboard />,
      dropdown: false,
    },
    {
      title: 'Hourly',
      path: '/hourlyDashboard',
      access: 'hourlyDashboard',
      icon: <MdOutlineTimer />,
      dropdown: false,
    },
    {
      title: 'Product',
      access: 'component',
      icon: <MdProductionQuantityLimits />,
      dropdown: true,
      dropdownItems: [
        {
          title: 'Product',
          path: '/component',
          access: 'component',
          icon: <TbLayoutDashboard />,
        },
        {
          title: 'Operation',
          path: '/operation',
          access: 'operation',
          icon: <BsReceiptCutoff />,
        },
        {
          title: 'Machine Operation',
          path: '/machine_operation',
          access: 'machine_operation',
          icon: <BsGear />,
        },
      ],
    },

    {
      title: 'Plan',
      path: '/PlanEntry',
      access: 'plan',
      icon: <BsBarChartLine />,
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
      icon: <RxCountdownTimer />,
      dropdown: false,
    },
    {
      title: 'Rejection Entry',
      path: '/rejection',
      access: 'rejection',
      icon: <MdOutlineCancelScheduleSend />,
      dropdown: false,
    },
    {
      title: 'Reports',
      access: 'monthlyReports',
      icon: <TbReport />,
      dropdown: true,
      dropdownItems: [
        {
          title: 'Production Report',
          path: '/reports',
          access: 'monthly_Report',
          icon: <TbReport />,
        },
        {
          title: 'Monthly Report',
          path: '/monthly_reports',
          access: 'monthly_Report',
          icon: <BsReceiptCutoff />,
        },
        {
          title: 'Gap Reason',
          path: '/gapreason_reports',
          access: 'gapreason_report',
          icon: <BsGear />,
        },
        {
          title: 'OEE',
          path: '/oee_reports',
          access: 'oee_report',
          icon: <BsSpeedometer2 />,
        },
      ],
    },
  ];

  useEffect(() => {
    let newPath = window.location.pathname;
    newPath = newPath.split('/');
    newPath = newPath.filter((pa) => {
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
