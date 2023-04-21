import React, { useState } from 'react';
import Avatar from './Avatar';
import { VscBell } from 'react-icons/vsc';
import { CgProfile } from 'react-icons/cg';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { IoSettingsOutline } from 'react-icons/io5';
import { BiFullscreen } from 'react-icons/bi';
import MenuItem from '../pages/ MenuItem';
import NotificationItem from './NotificationItem';
import { ParsedToken, TextShrinker } from '../services/Helpers';
//import { Logout } from '../services/AuthService';

const NavBar = () => {
  const menuItems = [
    {
      title: 'Profile',
      path: '/',
      icon: <CgProfile />,
    },
  ];
  const notificationItems = [
    {
      title: 'Transfer Completed',
      desc: 'Transfer to John Doe from your account is successfully completed',
      type: 'transfer-out',
      isRead: false,
    },
    {
      title: 'Transfer Completed',
      desc: 'Transfer From John Doe Rs. 200 is added',
      type: 'transfer-in',
      isRead: false,
    },
    {
      title: 'Plan Created',
      desc: 'The Plan Chennai-Trip is Created, you can view transactions now',
      type: 'plan-creation',
      isRead: false,
    },
    {
      title: 'Made Plan Admin',
      desc: 'You are the admin for Chennai-Trip you can add transactions now',
      type: 'plan-admin',
      isRead: false,
    },
  ];
  const [profileMenuStatus, setProfileMenuStatus] = useState(false);
  const [notificationMenuStatus, setNotificationMenuStatus] = useState(false);

  const handleFullScreen = () => {
    if (document.fullscreenElement === null) {
      var elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE11 */
        elem.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen();
      }
    }
  };

  return (
    <div className="top-nav-bar">
      <div className="settings" onClick={handleFullScreen}>
        <div className="settings-option">
          <div className="settings-icon">
            <BiFullscreen />
          </div>
        </div>
      </div>
      <div className="settings">
        <div className="settings-option">
          <div className="settings-icon">
            <IoSettingsOutline />
          </div>
        </div>
      </div>
      <div className="notification">
        <div
          className="notification-option"
          onClick={() => setNotificationMenuStatus(!notificationMenuStatus)}>
          <div className="notification-icon">
            <VscBell />
            {notificationItems && notificationItems.length > 0 && <span></span>}
          </div>
        </div>
        <div
          className={`notification-drop-down ${
            notificationMenuStatus ? 'show' : ''
          }`}>
          {notificationItems && notificationItems.length > 0 ? (
            notificationItems.map((notificationItem, index) => (
              <NotificationItem key={index} notification={notificationItem} />
            ))
          ) : (
            <div className="no-notifications">
              <span> No new notifications </span>
            </div>
          )}
        </div>
      </div>
      <div className="profile">
        <div
          className="profile-option"
          onClick={() => setProfileMenuStatus(!profileMenuStatus)}>
          <div className="name-content">
            <h3>
              <TextShrinker
                text={ParsedToken().fullName}
                count={10}
                tooltip={false}
              />
            </h3>
            <p>
              <TextShrinker
                text={ParsedToken().email}
                count={10}
                tooltip={false}
              />
            </p>
          </div>
          <div className="profile-pic">
            <Avatar name={ParsedToken().fullName} />
          </div>
        </div>
        <div className={`profile-drop-down ${profileMenuStatus ? 'show' : ''}`}>
          <div className="profile-menu">
            {menuItems &&
              menuItems.map((menuItem, index) => (
                <MenuItem item={menuItem} key={index} />
              ))}

            <span //onClick={Logout}
            >
              <MenuItem
                item={{
                  title: 'Logout',
                  icon: <RiLogoutCircleRLine />,
                }}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
