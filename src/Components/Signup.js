import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loader from '../Assets/loader.gif';
import '../App.css'; // Import CSS file for styling

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState('');

  let navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post('https://krushna-soni-e-commerce-management-system-back-end.vercel.app/user/signup', {
        userName: username,
        password: password,
        email: email,
        phone: phone,
      })
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setHasError(true);
        setError(error.message);
      });
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <>
      {isLoading && (
        <div>
          <img style={{ width: '150px' }} src={loader} alt="Loading" />
        </div>
      )}
      {!isLoading && (
        <div className="signup-container">
          <h1>Create new account</h1>
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
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              type="number"
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
            />
            <br />
            <div className="button-group">
              <button type="submit">Sign Up</button>
              <button onClick={navigateToLogin} className="login-button">
                Login
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

export default Signup;
