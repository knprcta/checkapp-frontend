import React from 'react';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import useFormWithValidation from '../utils/validator';
import BasicPopover from './BasicPopover';
import LoginIcon from '@mui/icons-material/Login';
import LockIcon from '@mui/icons-material/Lock';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Copyright from './Copyright';
import MrcnIcon from './MrcnIcon';

function SignIn({
  onSubmit,
  onForgotPass,
  anchorPop,
  onClosePop,
  passStatus,
  onShowPass,
  focusStatus,
  onFocusPass,
  onBlurPass,
  isLoading,
}) {
  const validate = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(validate.values);
    validate.resetForm();
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  const emailErr = Boolean(validate.errors.email);
  const passErr = Boolean(validate.errors.password);

  return (
    <Container component="section" maxWidth="xs">
      <Box
        sx={{
          marginTop: { xs: 0, sm: 3 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <MrcnIcon sx={{ fontSize: 100 }} color="primary" />
        <Typography
          component="h1"
          variant="h4"
          color="primary"
          sx={{ fontFamily: 'Major Mono Display', mt: { xs: -2, sm: -1 } }}
        >
          CheckApp
        </Typography>
        <Paper
          elevation={3}
          sx={{
            mt: { xs: 2, sm: 5 },
            p: { xs: 2, sm: 3 },
            pt: { xs: 1, sm: 2 },
          }}
        >
          <Box component="form" onSubmit={handleSubmit}>
            <Typography component="h2" variant="h5" textAlign="center" my={1}>
              Добро пожаловать!
            </Typography>
            <TextField
              margin="normal"
              inputProps={{
                htmlFor: 'email',
              }}
              type="email"
              name="email"
              id="email"
              required
              fullWidth
              label="Адрес e-mail"
              autoComplete="email"
              autoFocus
              onChange={validate.handleChange}
              value={validate.values.email || ''}
              error={emailErr}
              helperText={validate.errors.email}
            />
            <TextField
              margin="normal"
              inputProps={{
                htmlFor: 'password',
                minLength: '8',
              }}
              type={passStatus ? 'text' : 'password'}
              name="password"
              id="password"
              required
              fullWidth
              label="Пароль"
              autoComplete="current-password"
              onChange={validate.handleChange}
              value={validate.values.password || ''}
              error={passErr}
              helperText={validate.errors.password}
              onFocus={onFocusPass}
              onBlur={onBlurPass}
              InputProps={{
                endAdornment: focusStatus ? (
                  <InputAdornment position="end" tabIndex="0">
                    <IconButton
                      aria-label="Показать пароль"
                      onClick={onShowPass}
                      onMouseDown={handleMouseDown}
                      edge="end"
                    >
                      {passStatus ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ) : (
                  ''
                ),
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="remember"
                  value={validate.values.remember}
                  onChange={validate.handleChange}
                  color="primary"
                />
              }
              label="Запомнить меня"
            />
            {!validate.isValid ? (
              <Tooltip
                title="Заполните необходимые поля!"
                placement="bottom-end"
              >
                <Box component="span" pb="15px">
                  <Button
                    endIcon={<LockIcon />}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled
                  >
                    Войти
                  </Button>
                </Box>
              </Tooltip>
            ) : (
              <LoadingButton
                endIcon={<LoginIcon />}
                loading={isLoading}
                loadingPosition="end"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Войти
              </LoadingButton>
            )}
            <BasicPopover
              anchorEl={anchorPop}
              onClick={onForgotPass}
              onClose={onClosePop}
            />
          </Box>
        </Paper>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}

export default SignIn;
