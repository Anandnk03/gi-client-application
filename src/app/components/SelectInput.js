import React from 'react';
import Select from 'react-select';

const SelectInput = ({
  label,
  options,
  value,
  handleChange,
  name,
  placeholder,
  noOptionsMessage,
  selectedValue,
  formData,
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
              height: 48,
              marginTop: 4,
            }),
          }}
          defaultOptions
          options={options}
          placeholder={placeholder}
          required
          onChange={handleChange}
          name={name}
          value={options?.filter(({ value }) => value === formData)}
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
