'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  AppBar, Box, Toolbar, IconButton, Typography, InputBase,
  MenuItem, Menu, Button,
  Avatar
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  Menu as MenuIcon, AccountCircle,
  MoreVert as MoreIcon, Home as HomeIcon
} from '@mui/icons-material';
import axios from 'axios';
import Person3Icon from '@mui/icons-material/Person3';

// Simple SVG Logo
const Logo = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
    <path d="M7 12l3 3 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to manage authentication
  const [userData, setUserData] = useState<any>(null); // State to store user data
  const router = useRouter(); // Next.js router

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    // Fetch user data if authenticated
    if (token) {
      getUserData(token);
    }
  }, []);

  const getUserData = async (token: string | null) => {
    try {
      const headers = { token };
      const response = await axios.get(`https://linked-posts.routemisr.com/users/profile-data`, { headers });
      setUserData(response.data); // Assuming response.data contains user profile information
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    router.push('/signin');
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => { handleMenuClose(); router.push('/profile'); }}>Profile</MenuItem> {/* Navigate to Profile */}
      <MenuItem onClick={() => { handleMenuClose(); router.push('/changepassword'); }}>Change Password</MenuItem>
      <MenuItem onClick={() => { handleMenuClose(); router.push('/upload-profile-photo'); }}>Upload Profile Photo</MenuItem>
      <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {isAuthenticated ? (
        <>
          <MenuItem onClick={() => { handleMobileMenuClose(); router.push('/profile'); }}>
            <IconButton size="large" aria-label="profile" color="inherit">
              <AccountCircle />
            </IconButton>
            <Typography onClick={() => router.push('/profile')} variant="inherit">Profile</Typography> {/* Navigate to Profile */}
          </MenuItem>
          <MenuItem onClick={() => { handleMobileMenuClose(); router.push('/changepassword'); }}>
            <IconButton size="large" aria-label="change password" color="inherit">
              <AccountCircle />
            </IconButton>
            <Typography variant="inherit">Change Password</Typography>
          </MenuItem>
          <MenuItem onClick={() => { handleMobileMenuClose(); router.push('/upload-profile-photo'); }}>
            <IconButton size="large" aria-label="upload profile photo" color="inherit">
              <AccountCircle />
            </IconButton>
            <Typography variant="inherit">Upload Profile Photo</Typography>
          </MenuItem>
          <MenuItem onClick={handleSignOut}>
            <IconButton size="large" aria-label="sign out" color="inherit">
              <AccountCircle />
            </IconButton>
            <Typography variant="inherit">Sign Out</Typography>
          </MenuItem>
        </>
      ) : (
        <>
          <MenuItem onClick={() => router.push('/signin')}>
            <Button color="inherit">Sign In</Button>
          </MenuItem>
          <MenuItem onClick={() => router.push('/signup')}>
            <Button color="inherit">Sign Up</Button>
          </MenuItem>
        </>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background:'#222' }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Logo />
          </Box>
          {isAuthenticated ? (
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="home"
                sx={{ mr: 2 }}
                onClick={() => router.push('/home')}
              >
                <HomeIcon />
              </IconButton>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="profile"
                sx={{ mr: 2 }}
                onClick={() => router.push('/profile')}
              >
                <Person3Icon />
              </IconButton>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  {userData?.user.photo ? (
                    <Avatar alt="Profile" src={userData?.user.photo} />
                  ) : (
                    <AccountCircle />
                  )}
                </IconButton>
              </Box>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button color="inherit" onClick={() => router.push('/signin')}>Sign In</Button>
              <Button color="inherit" onClick={() => router.push('/signup')}>Sign Up</Button>
            </Box>
          )}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Navbar;
