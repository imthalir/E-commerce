import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginSignup = () => {
  const [state, setState] = useState('Login');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      console.log('Login function Executed', formData);
      const res = await axios.post('http://localhost:5000/login', formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (res.data.success) {
        localStorage.setItem('auth-token', res.data.token);
        window.location.replace('/');
      } else {
        alert(res.data.errors);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Something went wrong during login');
    }
  };

  const signup = async () => {
    try {
      console.log('Signup function Executed', formData);
      const res = await axios.post('http://localhost:5000/signup', formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (res.data.success) {
        localStorage.setItem('auth-token', res.data.token);
        window.location.replace('/');
      } else {
        alert(res.data.errors);
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Something went wrong during signup');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    state === 'Login' ? login() : signup();
  };

  return (
    <div
      className="bg-light min-vh-100 d-flex align-items-center justify-content-center py-4"
      style={{ backgroundColor: '#fce3fe' }}
    >
      <div
        className="bg-white p-4 p-md-5 rounded shadow-sm w-100"
        style={{ maxWidth: '420px' }}
      >
        <h2 className="mb-3 text-center text-dark fw-bold fs-4">{state}</h2>

        <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
          {state === 'Sign Up' && (
            <input
              name="username"
              value={formData.username}
              onChange={changeHandler}
              type="text"
              className="form-control"
              placeholder="Your Name"
              required
            />
          )}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            className="form-control"
            placeholder="Email Address"
            required
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            className="form-control"
            placeholder="Password"
            required
          />
          <button type="submit" className="btn btn-danger w-100 fw-semibold mt-2">
            Continue
          </button>
        </form>

        <p className="mt-3 text-center text-secondary small">
          {state === 'Sign Up' ? 'Already have an account?' : 'Create an account?'}{' '}
          <span
            onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
            className="text-danger fw-semibold"
            style={{ cursor: 'pointer' }}
          >
            {state === 'Sign Up' ? 'Login here' : 'Click here'}
          </span>
        </p>

        <div className="d-flex align-items-start gap-2 mt-3 text-secondary small">
          <input type="checkbox" />
          <p className="mb-0">
            By continuing, I agree to the terms of use & privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
