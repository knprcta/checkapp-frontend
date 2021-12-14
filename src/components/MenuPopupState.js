import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Logout from '@mui/icons-material/Logout';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state/hooks';

const MenuPopupState = ({ user, signout, copyEmail }) => {
  const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' });
  return (
    <div>
      <Button
        size="large"
        color="inherit"
        variant="text"
        {...bindTrigger(popupState)}
        endIcon={<AccountBoxIcon color="primary" />}
        sx={{ textTransform: 'none', fontWeight: 400, mr: 2 }}
      >
        {user.name}
      </Button>
      <Menu
        {...bindMenu(popupState)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={copyEmail}>
          <ListItemIcon>
            <AlternateEmailIcon fontSize="small" />
          </ListItemIcon>
          {user.email}
        </MenuItem>
        <MenuItem onClick={signout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Выйти
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MenuPopupState;
