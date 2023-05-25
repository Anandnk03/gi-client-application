import React, { useEffect, useState } from 'react';
import { LoginAnimation, LoginBackground } from '../assets/images';
import { useDispatch } from 'react-redux';
import { LoginDetail } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
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
    //window.location.href = '/';
    const res = await dispatch(LoginDetail(formData));
    if (!res.error) window.location.href = '/';
  };

  useEffect(() => {
    if (isAuthenticated()) window.location.href = '/home';
  }, []);

  return (
    <>
      <div
        className="login-screen"
        style={{ backgroundImage: `url(${LoginBackground})` }}>
        <div className="container">
          <div className="col-sm-12">
            <div className="card card-wrap">
              <div className="row">
                <div className="col-sm-6">
                  <h4 className="welcome-text">Welcome</h4>
                  <div className="form-container">
                    <form onSubmit={handelLogin}>
                      <div className="col-12">
                        <span>User Name</span>
                        <input
                          className="form-control"
                          name="username"
                          type="text"
                          placeholder="User Name"
                          onChange={handleChange}
                          value={formData.user}
                        />
                      </div>
                      <div className="col-12">
                        <span>Password</span>
                        <input
                          className="form-control"
                          name="password"
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
                  <img
                    src={LoginAnimation}
                    className="login-images"
                    alt="login-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
