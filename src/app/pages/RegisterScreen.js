import Animation from '../components/Animation';
import AuthInput from '../components/AuthInput';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../redux/authSlice';
import { isAuthenticated } from '../services/AuthService';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Alert } from '../services/AlertService';
const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialFormDatas = {
    name: '',
    username: '',
    email: '',
    password: '',
    role: '',
  };
  const [formDatas, setFormDatas] = useState(initialFormDatas);

  const { status: tokenMsg } = useSelector((state) => state.auth);
  const handleChange = (e) =>
    setFormDatas({ ...formDatas, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(createUser(formDatas));
    setFormDatas(initialFormDatas);
    if (!res.error) window.location.href = '/home';
  };

  useEffect(() => {
    if (isAuthenticated()) window.location.href = '/home';
  }, []);

  return (
    <div className="login-screen">
      <div className="container-fluid">
        <div className="row">
          <div className="banner-content-container mb-0">
            <p>
              Welcome to E2M Application, Here you can track your Machine Live
              Data where goes and save it for future.
            </p>
            {tokenMsg === 'user'
              ? Alert('error', 'Username already exists')
              : ''}
          </div>
          <div className="col-sm-6">
            <div className="left-container">
              {/* <div className="logo-container">E2M Application</div> */}

              <div className="image-container">
                <Animation type="banner" isCard={false} />
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="right-container">
              <div className="terms-link-container">
                <span onClick={() => navigate('/terms')}>Terms</span>
              </div>
              <div className="form-container">
                <h3 className="title">Create your account</h3>
                <form method="post" onSubmit={handleSubmit}>
                  <AuthInput
                    label="Your Name"
                    value={formDatas.name}
                    onChange={handleChange}
                    name="name"
                  />
                  <AuthInput
                    label="User Name"
                    value={formDatas.username}
                    onChange={handleChange}
                    name="username"
                  />
                  <AuthInput
                    label="Email Adders"
                    value={formDatas.email}
                    onChange={handleChange}
                    name="email"
                  />
                  <AuthInput
                    label="Password"
                    value={formDatas.password}
                    onChange={handleChange}
                    name="password"
                    type="password"
                  />
                  <AuthInput
                    label="Role"
                    value={formDatas.role}
                    onChange={handleChange}
                    name="role"
                    type="number"
                  />
                  <div className="handlers-container">
                    <button type="submit" className="btn btn-primary">
                      Create Account
                    </button>
                  </div>
                </form>
              </div>
              <div className="footer-container">
                <p>
                  Already have an account ?
                  <span onClick={() => navigate('/login')}>Login now</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
