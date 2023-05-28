import React from 'react';
import Select from 'react-select';

const SelectInput = ({ label, options, handleChange, name }) => {
  return (
    <>
      <div className="auth-form-group">
        <span className="label">{label}</span>
        <Select
          options={options}
          placeholder=""
          required
          onChange={handleChange}
          name={name}
        />
      </div>
    </>
  );
};

export default SelectInput;
