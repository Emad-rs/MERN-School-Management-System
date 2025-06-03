import * as React from 'react';
import { ListItemButton, ListItemIcon, ListItemText, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';

const sidebarItems = [
  { label: 'الرئيسية', icon: <HomeIcon />, link: '/' },
  { label: 'الصفوف', icon: <ClassOutlinedIcon />, link: '/Admin/classes' },
  { label: 'المواد', icon: <AssignmentIcon />, link: '/Admin/subjects' },
  { label: 'المعلمين', icon: <SupervisorAccountOutlinedIcon />, link: '/Admin/teachers' },
  { label: 'الطلاب', icon: <PersonOutlineIcon />, link: '/Admin/students' },
  { label: 'الملاحظات', icon: <AnnouncementOutlinedIcon />, link: '/Admin/notices' },
  { label: 'الشكاوى', icon: <ReportIcon />, link: '/Admin/complains' },
  { label: 'الجدول الدراسي', icon: <AssignmentIcon />, link: '/Admin/schedule' },
];

const SideBar = () => {
  const location = useLocation();
  return (
    <Box sx={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      py: 1,
      px: 0,
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
      boxShadow: '2px 0 14px #0002',
    }}>
      {/* Logo/Title */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 2,
        py: 2,
        fontWeight: 900,
        fontSize: 22,
        color: '#fff',
        letterSpacing: 2,
        textShadow: '0 2px 10px #19118b33',
      }}>
        <AccountCircleOutlinedIcon sx={{ fontSize: 32, mr: 1, color: '#fff' }} />
        نظام الإدارة المدرسية
      </Box>
      {/* Nav Items */}
      <Box sx={{ flex: 1 }}>
        {sidebarItems.map((item, idx) => {
          const isActive = location.pathname === item.link || (item.link !== '/' && location.pathname.startsWith(item.link));
          return (
            <ListItemButton
              key={item.label}
              component={Link}
              to={item.link}
              sx={{
                my: 0.5,
                mx: 2,
                borderRadius: 2,
                background: isActive ? 'rgba(255,255,255,0.18)' : 'transparent',
                color: isActive ? '#fff' : '#e0e0e0',
                boxShadow: isActive ? '0 2px 12px #19118b22' : 'none',
                transition: 'all 0.18s',
                fontWeight: isActive ? 800 : 500,
                '&:hover': {
                  background: 'rgba(255,255,255,0.10)',
                  color: '#fff',
                  transform: 'scale(1.03)',
                  boxShadow: '0 6px 24px #2575fc33',
                },
              }}
            >
              <ListItemIcon sx={{ color: isActive ? '#fff' : '#bdbdbd', minWidth: 38 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} sx={{ '.MuiTypography-root': { fontWeight: isActive ? 800 : 500 } }} />
            </ListItemButton>
          );
        })}
      </Box>
      {/* Logout */}
      <ListItemButton component={Link} to="/logout" sx={{ mx: 2, borderRadius: 2, color: '#fff', mb: 1, '&:hover': { background: 'rgba(255,255,255,0.10)' } }}>
        <ListItemIcon sx={{ color: '#fff', minWidth: 38 }}>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="تسجيل الخروج" />
      </ListItemButton>
    </Box>
  );
};

export default SideBar;
