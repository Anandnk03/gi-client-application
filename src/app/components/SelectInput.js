import React from 'react';
import Select from 'react-select';

const SelectInput = ({
  label,
  options,
  handleChange,
  name,
  placeholder,
  noOptionsMessage,
  selectedValue,
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
              height: 40,
              marginTop: 2,
            }),
          }}
          defaultOptions
          options={options}
          placeholder={placeholder}
          required
          onChange={handleChange}
          name={name}
          noOptionsMessage={({ inputValue }) =>
            inputValue ? noOptionsText : noOptionsMessage
          }
          selectedValue={selectedValue}
        />
      </div>
    </>
  );
};

export default SelectInput;
