import React from 'react';

const Input = (props) => {
  const { label } = props;
  return (
    <div className="form-group">
      <label className="label">{label}</label>
      <input {...props} className="form-control" />
    </div>
  );
};

export default Input;