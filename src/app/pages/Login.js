import React, { useEffect, useState } from 'react';
import LoginImages from '../assets/images/login.png';
import { useDispatch } from 'react-redux';
import { LoginDetail } from '../redux/authSlice';
import { isAuthenticated } from '../services/AuthService';

const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handelLogin = async (e) => {
    e.preventDefault();
    // localStorage.setItem(
    //   'token',
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJ3ejVCM2l5M3JWVFFNYmF3VG5NZWUwZThwWnoyIiwiZW1haWwiOiJqb2huZG9lQGdtYWlsLmNvbSIsImZuYW1lIjoiam9obiIsImxuYW1lIjoiZG9lIiwiaWF0IjoxNjgwODc4NDg3LCJleHAiOjIwNDA4Nzg0ODd9.DbotFIDPxhtGlGEG_mG5_uKQfmMXjjfTHi0YEt88zBU'
    // );
    // window.location.href = '/';
    const res = await dispatch(LoginDetail(formData));
    console.log()
    if (!res.error) window.location.href = '/machine_status';
  };

  useEffect(() => {
    if (isAuthenticated()) window.location.href = '/machine_status';
  }, []);

  return (

    <div
      className="login-screen"
    // style={{ backgroundImage: `url(${LoginBackground})` }}
    >
      <div className="container">
        <div className="col-sm-12">
          <div className="card card-wrap">
            <div className="row login_row">
              <div className="col-sm-6">
                <div className="welcome-text">
                  <h4>
                    WITTUR <span>Elevator Components</span>
                  </h4>
                </div>

                <div className="form-container">
                  <form onSubmit={handelLogin}>
                    <div className="col-12 mb-3">
                      <span>User Name</span>
                      <input
                        className="form-control"
                        name="username"
                        type="text"
                        required
                        placeholder="User Name"
                        onChange={handleChange}
                        value={formData.user}

                      />
                    </div>
                    <div className="col-12 mb-3">
                      <span>Password</span>
                      <input
                        className="form-control"
                        name="password"
                        required
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="button-group">
                      <button type="submit" className="btn btn-light">
                        Login
                      </button>
                    </div>
                  </form>
                </div>
                <div className="LoginFooter-container">
                  <p>
                    Don't have an account ? Contact Administrator
                    {/* <span onClick={() => navigate('/register')}>
                        Create now
                      </span> */}
                  </p>
                </div>
              </div>
              <div className="col-sm-6">
                <img src={LoginImages} className="login-images" alt="login" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Login;
