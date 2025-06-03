import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ colorvariant }) => ({
  background: colorvariant === 'secondary'
    ? 'linear-gradient(90deg,#43e97b,#38f9d7)'
    : colorvariant === 'danger'
    ? 'linear-gradient(90deg,#ff5858,#f09819)'
    : 'linear-gradient(90deg,#6a11cb,#2575fc)',
  color: '#fff',
  fontWeight: 700,
  fontSize: 18,
  borderRadius: 18,
  padding: '10px 28px',
  boxShadow: '0 2px 12px #19118b22',
  transition: 'transform 0.15s, box-shadow 0.15s',
  letterSpacing: 1,
  margin: '8px 0',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 24px #2575fc55',
    background: colorvariant === 'secondary'
      ? 'linear-gradient(90deg,#38f9d7,#43e97b)'
      : colorvariant === 'danger'
      ? 'linear-gradient(90deg,#f09819,#ff5858)'
      : 'linear-gradient(90deg,#2575fc,#6a11cb)',
  },
}));

const AdminMainButton = ({ children, color = 'primary', ...props }) => (
  <StyledButton colorvariant={color} variant="contained" {...props}>
    {children}
  </StyledButton>
);

export default AdminMainButton;
