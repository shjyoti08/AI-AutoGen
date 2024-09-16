import React, { useState,useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axiosInstance from '../api/axiosInstance'; 
import { useNavigate } from 'react-router-dom';
import './Login.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../components/AuthContext';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');


  // Trim username and password to remove any leading or trailing spaces
 
  const trimmedPassword = password.trim();

    try {
      const response = await axiosInstance.post('/login/',{
        username,
        password: trimmedPassword,
      });
      // console.log('Response data:', response.data);
      const {token} = response.data;
  
      if (token) {
        // Successful login, store the JWT tokens
        localStorage.setItem('accessToken', token);
        // localStorage.setItem('refreshToken', refresh);
        localStorage.setItem('username', username); 
    // Update authentication context
        login(username); // Call login from AuthContext

        // Navigate to the protected route
        navigate('/student-dash');
        // console.log('Navigating to /student-dash');
      } else {
        setError('Invalid username or password.');
        console.error('Login failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error(error);
    }
  
  };

  // const handleSignupClick = () => {
  //   navigate('/signup');
  // };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-wrapper">
      <div className="login-form-container">
        <h2 className="login-title">Login</h2>
        <p>To keep connected with us please login!
        </p>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            {/* <Form.Label>Username</Form.Label> */}
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            {/* <Form.Label>Password</Form.Label> */}
            <div className="password-wrapper">
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
          </Form.Group>

          <Button  type="submit" className="custom-btn-primary w-100">
            Login
          </Button>
        </Form>
        {/* <div className="mt-3 text-center">
          <Button variant="link" className="custom-btn-link" onClick={handleSignupClick}>
            Signup ?
          </Button>
        </div> */}
      </div>
    </div>
  );
}

export default LoginPage;
