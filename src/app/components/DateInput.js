import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useState } from 'react';
import { BsFillCalendarDateFill } from 'react-icons/bs';
import moment from 'moment';

const DateInput = ({ label, parentFormData, setParentFormData, keyName }) => {
  const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState();
  const handleDateTime = () => {
    setShowDate(!showDate);
  };

  let localDate = new Date(date).toLocaleDateString();
  var dateYMD = moment(
    localDate === 'Invalid date' ? new Date() : localDate
  ).format('YYYY-DD-MM');

  const handleChange = (e) => {
    setDate(e);

    setParentFormData({
      ...parentFormData,
      [keyName]: dateYMD,
    });
    setShowDate(false);
  };

  return (
    <>
      <div className="date-picker-formate">
        <div className="row">
          <div className="col-12">
            <div className="date-formate">
              <label className="label">{label}</label>
              <div className="time-icon" onClick={handleDateTime}>
                <span>
                  <BsFillCalendarDateFill />
                </span>
                <input
                  className="form-control"
                  required
                  readOnly
                  value={
                    dateYMD === 'Invalid date' ? '--Select Date--' : dateYMD
                  }
                />
              </div>
            </div>
          </div>
        </div>
        {showDate ? (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateCalendar']}>
              <DemoItem>
                <div className="card">
                  <DateCalendar
                    defaultValue={dayjs(new Date())}
                    value={date}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default DateInput;
