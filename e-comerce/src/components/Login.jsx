import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/actions/authActions';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector(state => state.auth);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, rememberMe } = formData;
    await dispatch(login({ email, password }, rememberMe));
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              className="mr-2"
              checked={formData.rememberMe}
              onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
            />
            <label className="text-sm text-gray-600">Remember Me</label>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
