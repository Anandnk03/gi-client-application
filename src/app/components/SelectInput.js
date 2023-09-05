import React from 'react';
import Select from 'react-select';

const SelectInput = ({
  label,
  options,
  handleChange,
  name,
  placeholder,
  noOptionsMessage,
}) => {
  const noOptionsText = true;
  return (
    <>
      <div className="auth-form-group">
        <span className="label">{label}</span>
        <Select
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
          width:300,
          height:50,
          marginTop:5
                  }),
        }}
          options={options}
          placeholder={placeholder}
          required
          onChange={handleChange}
          name={name}
          noOptionsMessage={({ inputValue }) =>
            inputValue ? noOptionsText : noOptionsMessage
          }
        />
      </div>
    </>
  );
};

export default SelectInput;
