import Grid from '@mui/material/Grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import * as React from 'react';
import { useState } from 'react';
import { FcOvertime } from 'react-icons/fc';

const DateTime = ({
  parentFormData,
  setParentFormData,
  keyName,
  label,
  type,
}) => {
  const [showDateTime, setShowDateTime] = useState(false);
  const [date, setDate] = useState(dayjs([new Date()]));

  const handleDateTime = () => {
    setShowDateTime(!showDateTime);
  };

  const initialData = {
    hour: '12',
    min: '10',
    type: 'AM',
    dateTime: 'Select Date & Time',
  };

  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    if (e.target.name === 'hour' || e.target.name === 'min') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value.toString().padStart(2, '0'),
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    let localDate = new Date(date).toLocaleDateString();
    let dateTime = `${localDate} ${formData.hour}:${formData.min} ${formData.type}`;
    setFormData({
      ...formData,
      dateTime,
    });
    setParentFormData({
      ...parentFormData,
      [keyName]: dateTime,
    });
    setShowDateTime(false);
  };

  return (
    <>
      <div className="date-picker">
        <div className="date-time-formate">
          <label className="label">{label}</label>
          <div className="time-icon" onClick={handleDateTime}>
            <span>
              <FcOvertime />
            </span>
            <input
              className="form-control"
              required
              readOnly
              value={formData.dateTime}
            />
          </div>
        </div>
        {showDateTime ? (
          <div className="card">
            <div className="row">
              <div className="col-6">
                <div className="date_sec">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Grid>
                      <DateCalendar
                        value={date}
                        disableFuture
                        onChange={(e) => setDate(e)}
                      />
                    </Grid>
                  </LocalizationProvider>
                </div>
              </div>
              <div className="col-6">
                <div className="time-setting">
                  {formData.hour.toString().padStart(2, '0')}
                  {' : '}
                  {formData.min.toString().padStart(2, '0')} {''}{' '}
                  {formData.type}
                </div>
                <div className="time_sec">
                  <div className="form-group">
                    <label className="form-label">Hours</label>
                    <input
                      min={1}
                      max={12}
                      className="form-control"
                      type="number"
                      onChange={handleChange}
                      name="hour"
                      value={formData.hour.toString().padStart(2, '0')}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Minutes</label>
                    <input
                      min={1}
                      max={60}
                      className="form-control"
                      type="number"
                      onChange={handleChange}
                      name="min"
                      value={formData.min.toString().padStart(2, '0')}
                    />
                  </div>
                  <div className="checkbox_group">
                    <div className="checkbox_row">
                      <input
                        type="radio"
                        name="type"
                        id="AM"
                        className="check1"
                        onChange={handleChange}
                        value={'AM'}
                        checked={formData.type === 'AM'}
                      />
                      <label for="AM" className="label1">
                        AM
                      </label>
                      <input
                        type="radio"
                        name="type"
                        id="PM"
                        className="check2"
                        value={'PM'}
                        checked={formData.type === 'PM'}
                        onChange={handleChange}
                      />
                      <label for="PM" className="label2">
                        PM
                      </label>
                    </div>
                  </div>
                </div>
                <div className="button-setting">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleClick}>
                    Set
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default DateTime;
