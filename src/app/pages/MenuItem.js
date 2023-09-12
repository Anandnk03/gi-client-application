import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MenuItem = ({ item, active }) => {
  const navigate = useNavigate();
  const [style, setStyle] = useState(false);
  const handleDropDown = () => {
    if (style) {
      navigate(item.path);
      setStyle(false)
    } else {
      navigate(item.path);
      setStyle(true)
    }
  };
  return (
    <>
      <div className="expand_dropdownsec">
        <h6 className={`menu-item ${active ? 'active' : ''}`} onClick={handleDropDown}>{item.icon} {item.title}</h6>
        {style && item.dropdown ? <div>
          <Link to={"/operation"}><span className='me-2'>{item.dropdownItems[0].icon}</span>{item.dropdownItems[0].title}</Link>
          <Link to={"/machine_operation"}><span className='me-2'>{item.dropdownItems[1].icon}</span>{item.dropdownItems[1].title}</Link>
        </div> : ''}
      </div>
    </>

  );
};

export default MenuItem;
