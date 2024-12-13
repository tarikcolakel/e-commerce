import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const md5 = (string) => {
    return string
      .split('')
      .map((c) => c.charCodeAt(0).toString(16))
      .join('');
  };

  const getGravatarUrl = (email) => {
    const emailHash = md5(email.trim().toLowerCase());
    
    return `https://www.gravatar.com/avatar/${emailHash}?d=identicon`;
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('https://workintech-fe-ecommerce.onrender.com/login', {
        email: data.email,
        password: data.password,
      });

      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userInfo', JSON.stringify(response.data.user));

        if (rememberMe) {
          localStorage.setItem('rememberMe', true);
        } else {
          localStorage.removeItem('rememberMe');
        }

        navigate(-1);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // Hata mesajını özelleştirmek ve simgeyi küçültmek
        toast.error(error.response.data.message || 'Login failed!', {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.502-1.288.732-1.965l-6.928-6.197a1 1 0 00-1.366 0L5.206 17.035c-.77.677-.322 1.965.732 1.965z"
              />
            </svg>
          ),
        });
      } else {
        toast.error('Login failed! Please try again.', {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.502-1.288.732-1.965l-6.928-6.197a1 1 0 00-1.366 0L5.206 17.035c-.77.677-.322 1.965.732 1.965z"
              />
            </svg>
          ),
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
              placeholder="Enter your email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
              placeholder="Enter your password"
              {...register('password', {
                required: 'Password is required',
              })}
            />
            {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>}
          </div>

          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              className="mr-2"
              onChange={() => setRememberMe(!rememberMe)}
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

      <ToastContainer />
    </div>
  );
};

export default Login;
