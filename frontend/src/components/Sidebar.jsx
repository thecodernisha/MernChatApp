import React, { useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './OtherUsers';
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice';
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '..';
 
const Sidebar = () => {

    const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);

    const [search, setSearch] = useState("");
    const {otherUsers} = useSelector(store=>store.user);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.post(`${BASE_URL}/api/v1/user/logout`);
    
            if (res.status === 200) {
                dispatch(setAuthUser (null));
                dispatch(setMessages(null));
                dispatch(setOtherUsers(null));
                dispatch(setSelectedUser (null));
                toast.success(res.data.message);
    
                navigate("/login");
            } else {
                toast.error("Logout failed. Please try again.");
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred during logout. Please try again.");
        }
    }
  
    return (
        <div className='0 p-4 flex flex-col w-[400px]' style={{backgroundColor:'rgb(14,41,40)'}}>
            <h2 className='text-lg font-semibold mb-4 text-center' style={{color:'red'}} > Hi {authUser?.fullName} </h2>
            <div className="divider px-3"></div> 
            <OtherUsers/> 
            <div className='mt-2'>
                <button 
                    onClick={logoutHandler} 
                    className='btn btn-sm flex items-center space-x-2 hover:bg-slate-200 transition duration-200'
                >
                    <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'><path d="M10 4a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H8a1 1 0 110-2h3V5a1 1 0 011-1z"/><path fillRule="evenodd" d="M4 10a1 1 0 011-1h3V6a1 1 0 112 0v3h3a1 1 0 110 2H10v3a1 1 0 11-2 0v-3H5a1 1 0 01-1-1z" clipRule="evenodd"/></svg>
                    <span>Logout</span>
                </button>
            </div>
        </div>
    )
}


export default Sidebar;