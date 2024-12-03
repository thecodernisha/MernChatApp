import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from '../redux/userSlice';
import { BASE_URL } from '..';

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/login`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      navigate("/");
      console.log(res);
      dispatch(setAuthUser(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      username: "",
      password: ""
    })
  }
  return (
    <div className="min-w-96 mx-auto">
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
      <h1 className='text-3xl font-bold text-center text-gray-800'>Login</h1>
    <form onSubmit={onSubmitHandler} action="">
      <div className="mt-4">
        <label className='block text-sm font-medium text-gray-700'>Username</label>
        <input
          value={user.username}
          onChange={(e) => setUser ({ ...user, username: e.target.value })}
          className='w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300'
          type="text"
          placeholder='Enter your username' />
      </div>
      <div className="mt-4">
        <label className='block text-sm font-medium text-gray-700'>Password</label>
        <input
          value={user.password}
          onChange={(e) => setUser ({ ...user, password: e.target.value })}
          className='w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300'
          type="password"
          placeholder='Enter your password' />
      </div>
      <p className='text-center my-4 text-sm text-gray-600'>Don't have an account? <Link to="/signup" className='text-green-500 hover:underline'>Sign up</Link></p>
      <div>
        <button type="submit" className='w-full mt-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-200'>Login</button>
      </div>
    </form>
      </div>
    </div>
  )
}

export default Login