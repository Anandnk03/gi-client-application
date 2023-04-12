import React from 'react';
import LoginLog from '../../assets/img/ezgif.com-gif-maker-8.gif';
import LoginBackground from '../../assets/img/loginscreenBackground.png';

const Login = () => {
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
                    <form>
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
                        <button type="button" className="btn btn-light">
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-sm-6">
                  <img
                    src={LoginLog}
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
