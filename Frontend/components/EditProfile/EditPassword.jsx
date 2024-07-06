import React, { useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../../Context/ContextProduct';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';

const EditPassword = () => {
    const {fetchUserData}=useAppContext()
    const alert=useAlert()
    const navigate=useNavigate()
    const [oldPassword,setOldPassword]=useState("")
    const [newPassword,setNewPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")

    const handleSubmit=async()=>{
        const obj={
            oldPassword:oldPassword,
            newPassword:newPassword,
            confirmPassword:confirmPassword
        }
        try {
            await axios.put("http://localhost:4000/api/v1/password/update", obj,{
                withCredentials: true
              });
            fetchUserData()
            navigate("/profile")
            alert.success("password update successful")
        } catch (error) {
            console.log(error)
            alert.error(error.response.data.message)
        }
    }

    return (
        <div className="font-sans text-gray-900 antialiased">
            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#f8f4f3]">
                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    <div className="py-8">
                        <center>
                            <span className="text-2xl font-semibold">Set New Password</span>
                        </center>
                    </div>

                    <div>
                        <label className="block font-medium text-sm text-gray-700" htmlFor="email">Old Password</label>
                        <input
                            type="email"
                            name="email"
                            value={oldPassword}
                            onChange={(e)=>setOldPassword(e.target.value)}
                            placeholder="Enter Old Password"
                            className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block font-medium text-sm text-gray-700" htmlFor="password">New Password</label>
                        <input
                            id="password1"
                            type="password"
                            name="password"
                            value={newPassword}
                            onChange={(e)=>setNewPassword(e.target.value)}
                            placeholder="Set New Password"
                            className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block font-medium text-sm text-gray-700" htmlFor="password">Confirm Old Password</label>
                        <input
                            id="password2"
                            type="password"
                            name="password"
                            value={confirmPassword}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                            placeholder="Set New Password"
                            className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
                        />
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        <button onClick={handleSubmit} type="button" className="ms-4 inline-flex items-center px-4 py-2 bg-[#f84525] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-800 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
                            Set New Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPassword;
