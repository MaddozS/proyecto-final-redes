import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material';
import { useRouter } from 'next/router'



const Navbar = () => {
  const router = useRouter()
  const pages = [
    {
      label: 'Inicio', 
      action: ()=>{
        router.push('/')
      }
    },
    {
      label: 'Temas', 
      action: ()=>{
        router.push('/#temas')
      }
    }, 
    {
      label: 'Colaboradores', 
      action: ()=>{
        router.push('/colaboradores')
      } 
    },
    {
      label: 'Referencias', 
      action: ()=>{
        router.push('/tema/referencias')
      }
    },
  ];

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };


  const handleCloseNavMenu = (action) => {
    action && action();
    setAnchorElNav(null);
  };


  const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#1B2CC1',
    },
  },
});

  return (
    <ThemeProvider theme={darkTheme}>

        <AppBar position="sticky">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, cursor: 'pointer' }}
                onClick={()=>{
                  router.push('/')
                }}
            >
                RySdeC
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                >
                MENU
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
                    <MenuItem key={page.label} onClick={() => handleCloseNavMenu(page.action)}>
                    <Typography textAlign="center">{page.label}</Typography>
                    </MenuItem>
                ))}
                </Menu>
            </Box>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
                LOGO
            </Typography>
            
            <Box sx={{ flexGrow: 1}}></Box>
            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                <Button
                    key={page.label}
                    onClick={() => handleCloseNavMenu(page.action)}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    {page.label}
                </Button>
                ))}
            </Box>

            {/* s */}
            </Toolbar>
        </Container>
        </AppBar>

    </ThemeProvider>
  );
};
export default Navbar;