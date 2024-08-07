import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../Context/ContextProduct';
import { useNavigate } from 'react-router-dom';
import Loading from '../layouts/Loading/Loading';
import { useAlert } from 'react-alert';
import axios from 'axios';

const EditUserProfile = () => {
    const navigate = useNavigate();
    const alert = useAlert();
    const { user, isAuthenticated, fetchUserData } = useAppContext();
    const [isName, setIsName] = useState("");
    const [isEmail, setIsEmail] = useState("");
    const [number, setNumber] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [previewAvatar, setPreviewAvatar] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('name', isName);
        formData.append('email', isEmail);
        formData.append('number', number);
        if (avatar) {
            formData.append('avatar', avatar);
        }
        try {
            await axios.put("http://localhost:4000/api/v1/profile/update", formData, {
                withCredentials: true,
            });
            setLoading(false);
            fetchUserData();
            navigate("/profile");
            alert.success("Profile updated successfully");
        } catch (error) {
            setLoading(false);
            console.log("An error occurred", error);
            alert.error(error.response.data.message);
        }
    };

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/register");
        }
    }, [navigate, isAuthenticated]);

    useEffect(() => {
        if (user) {
            setIsName(user.name || "");
            setIsEmail(user.email || "");
            setNumber(user.number || "");
            setAvatar(user.avatar.url || "");
        }
    }, [user]);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (previewAvatar) URL.revokeObjectURL(previewAvatar);
        setAvatar(file);
        setPreviewAvatar(URL.createObjectURL(file));
    };

    if (!user || loading) {
        return <Loading />;
    }

    return (
        <div className="bg-white w-full flex flex-row gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
            <main className="w-full min-h-screen py-1">
                <div className="p-2 md:p-4 flex justify-center">
                    <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                        <h2 className="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2>
                        <div className="grid max-w-2xl mx-auto mt-8">
                            <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                                <img
                                    className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                                    src={previewAvatar || avatar || "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"}
                                    alt="Bordered avatar"
                                />
                                <div className="flex flex-col space-y-5 sm:ml-8">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                        className="hidden"
                                        id="avatarUpload"
                                        placeholder='change picture'
                                    />
                                    <label htmlFor="avatarUpload" className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-red-500 rounded-lg border border-indigo-200 hover:bg-red-600 focus:z-10 focus:ring-4 focus:ring-indigo-200 cursor-pointer">
                                        Change picture
                                    </label>
                                </div>
                            </div>
                            <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                                <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                                    <div className="w-full">
                                        <label
                                            htmlFor="first_name"
                                            className="block mb2 text-sm font-medium text-indigo-900 dark:text-white"
                                        >
                                            Your Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="first_name"
                                            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                            placeholder="Your first name"
                                            value={isName}
                                            onChange={(e) => setIsName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="mb-2 sm:mb-6">
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                                    >
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                        placeholder="your.email@mail.com"
                                        value={isEmail}
                                        onChange={(e) => setIsEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-2 sm:mb-6">
                                    <label
                                        htmlFor="profession"
                                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                                    >
                                        Phone number
                                    </label>
                                    <input
                                        type="text"
                                        id="profession"
                                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                        placeholder="your profession"
                                        value={number}
                                        onChange={(e) => setNumber(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <label
                                        htmlFor="message"
                                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                                    >
                                        Bio
                                    </label>
                                    <textarea
                                        id="message"
                                        rows="4"
                                        className="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Write your bio here..."
                                    ></textarea>
                                </div>
                                <div className='w-full'>
                                    <button onClick={fetchData} className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-lg w-full px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default EditUserProfile;
