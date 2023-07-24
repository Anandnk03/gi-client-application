import React from 'react';
import Select from 'react-select';
import { MultiSelect } from 'react-multi-select-component';

const SelectMulti = ({ label, options, handleChange, value }) => {
  //const [multiProduct, setMultiProduct] = useState([]);
  return (
    <>
      <div className="auth-form-group">
        <span className="label">{label}</span>
        <MultiSelect
          onChange={handleChange}
          options={options}
          isMulti
          required
          value={value}
          labelledBy="Select"
        />
      </div>
    </>
  );
};

export default SelectMulti;
