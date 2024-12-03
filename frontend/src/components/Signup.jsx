import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from '..';

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate();

  // Handle gender selection
  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  }

  // Handle form submission
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/register`, user, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
      console.log(error);
    }

    // Reset form
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  }

  return (
    <div className="min-w-96 mx-auto bg-light-gray">
      <div className='w-full p-6 rounded-lg shadow border border-gray-300'>
        <h1 className='text-3xl font-bold text-center text-green-600'>Signup</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <label className='label'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser ({ ...user, fullName: e.target.value })}
              className='w-full input input-bordered h-10 rounded-md'
              type="text"
              placeholder='Full Name' />
          </div>
          <div className="mb-4">
            <label className='label'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser ({ ...user, username: e.target.value })}
              className='w-full input input-bordered h-10 rounded-md'
              type="text"
              placeholder='Username' />
          </div>
          <div className="mb-4">
            <label className='label'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser ({ ...user, password: e.target.value })}
              className='w-full input input-bordered h-10 rounded-md'
              type="password"
              placeholder='Password' />
          </div>
          <div className="mb-4">
            <label className='label'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) => setUser ({ ...user, confirmPassword: e.target.value })}
              className='w-full input input-bordered h-10 rounded-md'
              type="password"
              placeholder='Confirm Password' />
          </div>
          <div className='flex items-center my-4'>
            <div className='flex items-center'>
              <p>Male</p>
              <input
                type="checkbox"
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
                className="checkbox mx-2" />
            </div>
            <div className='flex items-center'>
              <p>Female</p>
              <input
                type="checkbox"
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                className="checkbox mx-2" />
            </div>
          </div>
          <p className='text-center my-2'>Already have an account? <Link to="/login" className="text-green-600"> login </Link></p>
          <div>
            <button type='submit' className='btn btn-block btn-sm mt-2 bg-green-600 text-white rounded-md hover:bg-green-700'>Signup</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
