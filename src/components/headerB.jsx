import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {Link, useNavigate } from 'react-router-dom';

const pages = [
  {lable: 'Map', link: "/"}, 
  {lable: 'About us', link: "/about"}, 
];
const searchOptions = ['Option 1', 'Option 2', 'Option 3'];

function HeaderB({places, placesSmall}) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();

  const handleTextClick = () => {
    navigate('/'); // Navigate to the contact page
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  

  return (
    <AppBar position="static" elevation={0} sx={{backgroundColor:"white", padding: 1}}> 
      <Container maxWidth="xl">
        <Toolbar disableGutters>


          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.lable} onClick={handleCloseNavMenu}>
                  <Link to={page.link} key={page.lable} onClick={handleCloseNavMenu} style={{ my: 2, color: 'black' }}>{page.lable}</Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, m: 2, color:"black" }} /> */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mx: 2 }}>
            <Link to="/">
              <img src="/dehso.svg" alt="Your Logo" style={{height: 30}}  />
            </Link>
          </Box>
          <Box sx={{  display: { xs: 'none', md: 'flex' }, gap: 2 }} >
            {pages.map((page) => (
              <Link to={page.link} key={page.lable} onClick={handleCloseNavMenu} style={{ my: 2, color: 'black' }}>{page.lable}</Link>
            ))}
          </Box>
          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HeaderB;
