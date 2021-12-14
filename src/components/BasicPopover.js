import React from 'react';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

export default function BasicPopover({ anchorEl, onClick, onClose }) {
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const style = {
    mt: 2,
    display: 'flex',
    flexDirection: { sm: 'row', xs: 'column' },
    gap: { sm: 4, xs: 0 },
  };

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="text"
        onClick={onClick}
        size="small"
        sx={{ textTransform: 'none', fontWeight: 400 }}
      >
        Забыли пароль?
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box
          sx={{ p: 4 }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Поддержка
          </Typography>
          <Box sx={style}>
            <Typography id="modal-modal-description">Андрей Куликов</Typography>
            <Link href="tel:+79161793687">+7(916)179-3687</Link>
          </Box>
          <Box sx={style}>
            <Typography id="modal-modal-description">Кирилл Федотов</Typography>
            <Link href="tel:+79035520808">+7(903)552-0808</Link>
          </Box>
        </Box>
      </Popover>
    </div>
  );
}
