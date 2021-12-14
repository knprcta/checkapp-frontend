import React, { useState, useEffect, useMemo } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Loading from './Loading';
import BasicSnackbar from './BasicSnackbar';
import ProtectedRoute from './ProtectedRoute';
import SignIn from './SignIn';
import Reports from './Reports';
import Box from '@mui/material/Box';

import api from '../utils/Api';
import { ruRU } from '@mui/x-data-grid';

function App() {
  const [isRender, setIsRender] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [snackSeverity, setSnackSeverity] = useState('');
  const [snackMessage, setSnackMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [reports, setReports] = useState([]);
  const [anchorPopover, setAnchorPopover] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [focusPass, setFocusPass] = useState(false);

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme(
        {
          palette: {
            mode: prefersDarkMode ? 'dark' : 'light',
          },
        },
        ruRU
      ),
    [prefersDarkMode]
  );

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  const handleOpenPopover = (event) => {
    setAnchorPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorPopover(null);
  };

  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  const handleFocusPass = () => {
    setFocusPass(true);
  };

  const handleBlurPass = () => {
    setFocusPass(false);
  };

  function getUserInfo(token) {
    api
      .getUserInfo(token)
      .then((info) => {
        setCurrentUser(info);
      })
      .catch((err) => {
        setSnackSeverity('error');
        setSnackMessage(err.message);
        setOpenSnack(true);
      });
  }

  function getReports(token) {
    setIsLoading(true);
    api
      .getReports(token)
      .then((data) => {
        setReports(data);
      })
      .catch((err) => {
        setSnackSeverity('error');
        setSnackMessage(err.message);
        setOpenSnack(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLogin({ email, password, remember }) {
    setIsLoading(true);
    api
      .login({ email, password })
      .then((res) => {
        if (res) {
          if (remember) {
            localStorage.setItem('jwt', res.token);
          } else {
            sessionStorage.setItem('jwt', res.token);
          }
          getUserInfo(res.token);
          getReports(res.token);
          setLoggedIn(true);
          setSnackSeverity('success');
          setSnackMessage('Вы успешно авторизовались!');
          setOpenSnack(true);
        }
      })
      .catch((err) => {
        setSnackSeverity('error');
        setSnackMessage(err.message);
        setOpenSnack(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  function handleSignOut() {
    sessionStorage.removeItem('jwt');
    localStorage.removeItem('jwt');
    setCurrentUser({});
    setLoggedIn(false);
  }

  function handleCopyEmail() {
    navigator.clipboard.writeText(currentUser.email);
    setSnackSeverity('info');
    setSnackMessage('E-mail скопирован в буфер обмена.');
    setOpenSnack(true);
  }

  useEffect(() => {
    const local = localStorage.getItem('jwt');
    const session = sessionStorage.getItem('jwt');
    const jwt = local ? local : session;
    if (jwt) {
      api
        .checkToken(jwt)
        .then((res) => {
          if (res.email) {
            getUserInfo(jwt);
            getReports(jwt);
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err);
          handleSignOut();
          setSnackSeverity('warning');
          setSnackMessage('Токен устарел. Необходима авторизация!');
          setOpenSnack(true);
        })
        .finally(() => {
          setIsRender(true);
        });
    } else {
      setIsRender(true);
      setSnackSeverity('info');
      setSnackMessage('Необходима авторизация!');
      setOpenSnack(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box component="main">
        {isRender ? (
          <Switch>
            <ProtectedRoute
              path="/reports"
              component={Reports}
              isLoggedIn={isLoggedIn}
              rows={reports}
              user={currentUser}
              onSignout={handleSignOut}
              onEmailClick={handleCopyEmail}
              onRefresh={getReports}
              loading={isLoading}
            />
            <Redirect exact from="/" to="/reports" />
            <Route path="/signin">
              {isLoggedIn ? (
                <Redirect to="/reports" />
              ) : (
                <SignIn
                  onSubmit={handleLogin}
                  anchorPop={anchorPopover}
                  onForgotPass={handleOpenPopover}
                  onClosePop={handleClosePopover}
                  passStatus={showPass}
                  onShowPass={handleShowPass}
                  focusStatus={focusPass}
                  onFocusPass={handleFocusPass}
                  onBlurPass={handleBlurPass}
                  isLoading={isLoading}
                />
              )}
            </Route>
          </Switch>
        ) : (
          <Loading />
        )}
        <BasicSnackbar
          open={openSnack}
          severity={snackSeverity}
          message={snackMessage}
          onClose={handleCloseSnack}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
