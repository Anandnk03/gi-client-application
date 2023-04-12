import React from 'react';

const Login = () => {
  return (
    <>
      <div className="login-screen">
        <div className="container">
          <div className="col-sm-12">
            <div className="row">
              <div className="card card-wrap">
                <div className="col-sm-6">
                  <div className="title">
                    <h4>Welcome</h4>
                  </div>
                  <form>
                    <div className="col-6">
                      <span>User Name</span>
                      <input
                        className="form-control input-from"
                        name=""
                        type="text"
                        placeholder="User Name"
                      />
                    </div>
                    <div className="col-6">
                      <span>Password</span>
                      <input
                        className="form-control input-from"
                        name=""
                        type="password"
                        placeholder="Password"
                      />
                    </div>
                    <div className="login-button">
                      <button type="button" className="btn btn-light">
                        Login{' '}
                      </button>
                    </div>
                  </form>
                </div>
                <div className="col-sm-6">
                  <h4>images</h4>
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
