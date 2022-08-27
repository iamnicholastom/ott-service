/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, IconButton, Toolbar, Button, Avatar, Drawer, useMediaQuery } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { userSelector, setUser } from '../../features/auth';
import { fetchToken, moviesApi, createSessionID } from '../../utils/index';
import { Sidebar, Search } from '../index';
import useStyles from './styles';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector(userSelector);
  const dispatch = useDispatch();
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const token = localStorage.getItem('request_token');
  const sessionIdFromLocalStorage = localStorage.getItem('session_id');

  useEffect(() => {
    const loginUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionIdFromLocalStorage}`);
          dispatch(setUser(userData));
        } else {
          const sessionId = await createSessionID();
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`);
          dispatch(setUser(userData));
        }
      }
    };
    loginUser();
  }, [token]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton color="inherit" edge="start" style={{ outline: 'none' }} onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)} className={classes.menuButton}>
              <Menu />
            </IconButton>
          )}
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => {}} className={classes.menuButton}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button color="inherit" component={Link} to={`/profile/${user.id}`} className={classes.linkButton}>
                {!isMobile && <>My Movies</>}
                <Avatar style={{ width: 30, height: 30 }} alt="profile" src="https://cdn5.vectorstock.com/i/1000x1000/99/94/default-avatar-placeholder-profile-icon-male-vector-23889994.jpg" />
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              classes={{ paper: classes.drawPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open>
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;

