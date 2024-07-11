import React, { useState, useEffect } from 'react';
import '../Auth/Signup.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import axios from 'axios';
import { useAppContext } from '../Context/ContextProduct';
import Loading from '../components/layouts/Loading/Loading';

const AuthForm = () => {
  const [load, setLoad] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated, loading ,fetchUserData} = useAppContext();
  const alert = useAlert();

  // this is used because we have to not refresh the page again & again for checking 
  // the authentication of the user
  useEffect(()=>{
    const verifyAuth=()=>{
      fetchUserData();
    }
    verifyAuth();
  },[Navigate])

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        navigate("/profile");
      }
      setLoad(false);
    }
  }, [loading, isAuthenticated, navigate]);

  const [isSignIn, setIsSignIn] = useState(true);
  const [isname, setIsName] = useState("");
  const [isemail, setIsEmail] = useState("");
  const [ispassword, setIsPassword] = useState("");
  const [isconfirmPassword, setIsConfirmPassword] = useState("");
  const [isloginEmail, setIsLoginEmail] = useState("");
  const [isloginPassword, setIsLoginPassword] = useState("");

  // for toggle the page from login to signup
  const toggle = () => {
    setIsSignIn(!isSignIn);
  };

  const nameHandler = (e) => { setIsName(e.target.value) };
  const emailHandler = (e) => { setIsEmail(e.target.value) };
  const passwordHandler = (e) => { setIsPassword(e.target.value) };
  const confirmPasswordHandler = (e) => { setIsConfirmPassword(e.target.value) };

  const saveInfo = async (e) => {
    if (ispassword !== isconfirmPassword) {
      alert.error("Please enter the same Password");
    } else {
      const obj = {
        name: isname,
        email: isemail,
        password: ispassword,
        confirmpassword: isconfirmPassword
      };
      try {
        const response = await axios.post("http://localhost:4000/api/v1/register", obj,{withCredentials:true});
        if (response) {
          setIsName("");
          setIsEmail("");
          setIsPassword("");
          setIsConfirmPassword("");
          navigate("/");
          alert.success("Sign Up successful");
        }
      } catch (error) {
        alert.error(error.response.data.message);
      }
    }
  };

  const LoginEmailHandler = (e) => { setIsLoginEmail(e.target.value) };
  const LoginPassHandler = (e) => { setIsLoginPassword(e.target.value) };
  const LoginProfile = async (e) => {
    try {
      const obj = {
        email: isloginEmail,
        password: isloginPassword
      };
      const response = await axios.post("http://localhost:4000/api/v1/login", obj, {
        withCredentials: true,
      });
      if (response.data.success) {
        alert.success("Login Successful");
        navigate("/");
        return response.data;
      } else {
        console.log(response)
        alert.error(error.response.data.message);
      }
    } catch (error) {
      alert.error(error.response.data.message);
    }
  };

  if (loading || load) {
    return <Loading />;
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div id="container" className={`container ${isSignIn ? 'sign-in' : 'sign-up'}`}>
        <div className="row">
          <div className="col align-items-center flex-col sign-up">
            <div className="form-wrapper align-items-center">
              <div className="form sign-up">
                <div className="input-group">
                  <i className='bx bxs-user'></i>
                  <input onChange={nameHandler} value={isname} type="text" placeholder="Enter Your Name" />
                </div>
                <div className="input-group">
                  <i className='bx bx-mail-send'></i>
                  <input onChange={emailHandler} value={isemail} type="email" placeholder="Email" />
                </div>
                <div className="input-group">
                  <i className='bx bxs-lock-alt'></i>
                  <input onChange={passwordHandler} value={ispassword} type="password" placeholder="Set Password" />
                </div>
                <div className="input-group">
                  <i className='bx bxs-lock-alt'></i>
                  <input onChange={confirmPasswordHandler} value={isconfirmPassword} type="password" placeholder="Confirm password" />
                </div>
                <button onClick={saveInfo}>Sign up</button>
                <p>
                  <span>Already have an account?</span>
                  <b className="pointer" onClick={toggle}>Sign in here</b>
                </p>
              </div>
            </div>
          </div>
          <div className="col align-items-center flex-col sign-in">
            <div className="form-wrapper align-items-center">
              <div className="form sign-in">
                <div className="input-group">
                  <i className='bx bxs-user'></i>
                  <input onChange={LoginEmailHandler} value={isloginEmail} type="text" placeholder="Enter Your Email" />
                </div>
                <div className="input-group">
                  <i className='bx bxs-lock-alt'></i>
                  <input onChange={LoginPassHandler} value={isloginPassword} type="password" placeholder="Password" />
                </div>
                <button onClick={LoginProfile}>Sign in</button>
                <p>
                  <b className='cursor-pointer'>Forgot password?</b>
                </p>
                <p>
                  <span>Don't have an account?</span>
                  <b className="pointer" onClick={toggle}>Sign up here</b>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row content-row">
          <div className="col align-items-center flex-col">
            <div className="text sign-in">
              <h2>Welcome</h2>
            </div>
            <div className="img sign-in"></div>
          </div>
          <div className="col align-items-center flex-col">
            <div className="img sign-up"></div>
            <div className="text sign-up">
              <h2>Join with us</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
