import React, { useState } from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Person2Icon from '@mui/icons-material/Person2';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../Context/ContextProduct';
import axios from 'axios';
import { useAlert } from 'react-alert';

const actions = [
  { icon: <DashboardIcon />, name: 'Dashboard', link: '/dashboard' },
  { icon: <Person2Icon />, name: 'Profile', link: '/profile' },
  { icon: <LocalMallIcon />, name: 'Cart', link: '/cart' },
  { icon: <LogoutIcon />, name: 'Logout', link: '/logout' },
];

export default function UserOption() {
  const alert=useAlert()
  const navigate = useNavigate();
  const { isAuthenticated,fetchUserData } = useAppContext();
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const handleNavigate = (link) => {
    if (link === '/profile' && !isAuthenticated) {
      navigate('/register');
    } else if(link==='/logout')handleLogout()
      else navigate(link)
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:4000/api/v1/logout', {}, { withCredentials: true });
      fetchUserData()
      navigate("/")
      alert.success("Logout Successful")
      localStorage.clear();
    } catch (error) {
      console.error("Logout failed:", error);
      alert.error(error.response.data.message)
    }
  };

  return (
    <div className="relative">
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>
      )}
      <Box sx={{ overflow: 'auto', position: 'relative' }} className="z-20">
        <SpeedDial
          ariaLabel="SpeedDial basic open example"
          sx={{
            position: 'fixed',
            top: 20,
            right: 20,
            zIndex: 30,
          }}
          icon={
            <div className="w-14 h-14 rounded-full overflow-hidden flex justify-center items-center">
              <img
                src='https://imagetolink.com/ib/zLlUPaP2C6.png'
                className="w-full h-full object-cover"
                alt="User Icon"
              />
            </div>
          }
          direction='down'
          onOpen={handleOpen}
          onClose={handleClose}
          open={open}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => handleNavigate(action.link)}
            />
          ))}
        </SpeedDial>
      </Box>
    </div>
  );
}
