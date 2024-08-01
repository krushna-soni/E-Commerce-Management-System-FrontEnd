import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loader from '../Assets/loader.gif';
import '../App.css'; // Import CSS file for styling

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState('');

  let navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post('https://e-commerce-management-system-back-end.vercel.app/user/login', {
        userName: username,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userName', response.data.userName);
        setLoading(false);
        navigate('/dashboard');
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setHasError(true);
        setError(error.response.data.msg);
      });
  };

  const navigateToSignup = () => {
    navigate('/signup');
  };

  return (
    <>
      {isLoading && (
        <div>
          <img style={{ width: '150px' }} src={loader} alt="Loading" />
        </div>
      )}
      {!isLoading && (
        <div className="login-container">
          <h1>Login here!</h1>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <div className="button-group">
              <button type="submit">Login</button>
              <button onClick={navigateToSignup} className="signup-button">
                Signup
              </button>
            </div>
          </form>
        </div>
      )}
      {hasError && (
        <div>
          <p style={{ color: 'red' }}>Error: {error}</p>
        </div>
      )}
    </>
  );
};

export default Login;
