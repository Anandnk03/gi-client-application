import React from 'react';
import { LoginAnimation, LoginBackground } from '../assets/images';

const Login = () => {
  const handelLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('token', 'dub_tokan');
  };
  return (
    <>
      <div
        className="login-screen"
        style={{ backgroundImage: `url(${LoginBackground})` }}>
        <div className="container">
          <div className="col-sm-12">
            <div className="card card-wrap">
              <div className="row">
                <div className="col-sm-6 ">
                  <h4 className="welcome-text">Welcome</h4>
                  <div className="form-container">
                    <form onSubmit={handelLogin}>
                      <div className="form-group">
                        <span>User Name</span>
                        <input
                          className="form-control"
                          name=""
                          type="text"
                          placeholder="User Name"
                        />
                      </div>
                      <div className="form-group">
                        <span>Password</span>
                        <input
                          className="form-control"
                          name=""
                          type="password"
                          placeholder="Password"
                        />
                      </div>
                      <div className="button-group">
                        <button type="submit" className="btn btn-light">
                          Login
                        </button>
                      </div>
                    </form>
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
