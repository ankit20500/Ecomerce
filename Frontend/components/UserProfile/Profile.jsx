import React, {useState,useEffect} from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import '@fontsource/plus-jakarta-sans'; // Defaults to weight 400
import '@fontsource/plus-jakarta-sans/400.css';
import '@fontsource/plus-jakarta-sans/700.css';
import { FiSettings, FiX } from 'react-icons/fi';
import { useAppContext } from '../../Context/ContextProduct';
import Loading from '../layouts/Loading/Loading';
import { useAlert } from 'react-alert';

function Profile() {
  const navigate= useNavigate();
  const alert=useAlert()
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const {user,isAuthenticated,fetchUserData} =useAppContext();
  useEffect(() => {
    if(isAuthenticated===false){
      navigate("/register")
    }
  }, [navigate,isAuthenticated])

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:4000/api/v1/logout', {}, { withCredentials: true });
      fetchUserData()
      navigate("/")
      alert.success("Logout Successful")
      localStorage.clear()
    } catch (error) {
      console.error("Logout failed:", error);
      alert.error(error.response.data.message)
    }
  };
  if (!user) {
    return <Loading/>;
  }

  return (
    <>
    <div className="border-t-2 border-black bg-white w-full flex flex-row gap-5  md:px-16 lg:px-20 md:flex-row text-[#161931]">
      <button
        className="md:hidden text-2xl p-2 fixed top-4 left-4 z-50"
        onClick={toggleSidebar}
      >
        {isSidebarVisible ? <FiX /> : <FiSettings />}
      </button>
      <aside
        className={`${
          isSidebarVisible ? 'translate-x-0' : '-translate-x-full'
        } fixed md:relative -ml-10 bg-white h-full md:h-auto top-0 left-0 md:translate-x-0 transition-transform duration-300 md:w-1/3 lg:w-1/4 md:block z-40 md:z-auto shadow-md md:shadow-none`}
      >
        <div className="pt-10 h-[100vh] sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12 mt-5 ">
          <h2 className="w-[17vmax] mx-auto text-center border-b border-solid border-black border-opacity-26 px-1 py-1 text-xl text-black opacity-75 font-medium mb-[4vmax]">
            Settings</h2>
          <a href="#" className="flex items-center px-3 py-2.5 font-bold bg-white text-indigo-900 border rounded-full">
            My Profile
          </a>
          <a href="#" className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full">
            My all Order
          </a>
          <Link to='/edit-profile' className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full">
            Edit Profile
          </Link>
          <Link to="/edit-password" className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full">
            Change Password
          </Link>
          <button onClick={handleLogout} className="flex items-center bg-red-500 border rounded-full hover:bg-red-600 px-3 py-2.5 font-semibold hover:border hover:rounded-full">
            Logout
          </button>
        </div>
      </aside>
      <main className="w-full py-1 md:w-2/3 lg:w-3/4">
        <div className="p-2 md:p-4">
          <div className="text-center align-middle w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg min-w-80">
            {/* <h2 className="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2> */}
            <div className="grid max-w-2xl mx-auto mt-8">
              <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                <img
                  className="object-cover w-40 ml-5 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                  src={user.avatar.url}
                  alt="Bordered avatar"
                />
            
              </div>
              <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                <div className="flex flex-col items-center w-full mb-1 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                    <label
                      htmlFor="first_name"
                      className="block mb-0.5 text-sm text-center font-medium text-indigo-900 dark:text-white">
                      Your Full name
                    </label>
                    <p className="bg-indigo-50 border mb-2 text-center border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" >
                      {user.name}
                    </p>
                  </div>

                <div className="mb-0.5 sm:mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-0.5 text-sm text-center font-medium text-indigo-900 dark:text-white">
                    Your email
                  </label>
                  <p className="bg-indigo-50 border border-indigo-300 text-center text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" >
                      {user.email}
                    </p>
                </div>
                <div className="mb-2 sm:mb-6">
                  <label
                    htmlFor="profession"
                    className="block mb-2 text-sm text-center font-medium text-indigo-900 dark:text-white">
                    Phone number
                  </label>
                  <p className="bg-indigo-50 border border-indigo-300 text-center text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" >
                      {user.number}
                    </p>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm text-center font-medium text-indigo-900 dark:text-white">
                    Bio
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="block p-2.5 w-full text-center text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Write your bio here..."
                  ></textarea>
                </div >

                {/* <div className="bg-red-500 mb-2 hover:bg-red-600 border border-indigo-300 text-center cursor-pointer text-white text-lg rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3">
                  <button onClick={handleLogout}>Logout</button>
                </div> */}
                
                {/* <Link to='/edit-profile' className="bg-red-500 hover:bg-red-600 border border-indigo-300 text-center cursor-pointer text-white text-lg rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3">
                  Edit
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
 

    </>
  );
}

export default Profile;
