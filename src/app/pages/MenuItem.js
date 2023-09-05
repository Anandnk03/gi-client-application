import React from 'react';
import { useNavigate } from 'react-router-dom';

const MenuItem = ({ item, active }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(item.path);
  };
  return (
    <div
      className={`menu-item ${active ? 'active' : ''}`}
      onClick={handleClick}>
        <div className="menu-content">
        <div className="icon">{item.icon}</div>
        <div className="menu-title">
        <h3>{item.title}</h3>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
