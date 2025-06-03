import { useState } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    Tooltip,
    Zoom
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight'; 
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppBar, Drawer } from '../../components/styles';
import Logout from '../Logout';
import SideBar from './SideBar';
import AdminProfile from './AdminProfile';
import AdminHomePage from './AdminHomePage';

import AddStudent from './studentRelated/AddStudent';
import SeeComplains from './studentRelated/SeeComplains';
import ShowStudents from './studentRelated/ShowStudents';
import StudentAttendance from './studentRelated/StudentAttendance';
import StudentExamMarks from './studentRelated/StudentExamMarks';
import ViewStudent from './studentRelated/ViewStudent';

import AddNotice from './noticeRelated/AddNotice';
import ShowNotices from './noticeRelated/ShowNotices';

import ShowSubjects from './subjectRelated/ShowSubjects';
import SubjectForm from './subjectRelated/SubjectForm';
import ViewSubject from './subjectRelated/ViewSubject';

import AddTeacher from './teacherRelated/AddTeacher';
import ChooseClass from './teacherRelated/ChooseClass';
import ChooseSubject from './teacherRelated/ChooseSubject';
import ShowTeachers from './teacherRelated/ShowTeachers';
import TeacherDetails from './teacherRelated/TeacherDetails';

import AddClass from './classRelated/AddClass';
import ClassDetails from './classRelated/ClassDetails';
import ShowClasses from './classRelated/ShowClasses';
import AccountMenu from '../../components/AccountMenu';
import SchedulePage from '../SchedulePage'; // تصحيح مسار استيراد SchedulePage

const AdminDashboard = () => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            <Box sx={{ display: 'flex', direction: 'rtl' }}> 
                <CssBaseline />
                <AppBar open={open} position='absolute'>
                    <Toolbar sx={{ pr: '24px' }}>
                        <Tooltip title={open ? "إغلاق الشريط الجانبي" : "فتح الشريط الجانبي"} placement="bottom" arrow TransitionComponent={Zoom}>
                          <IconButton
                              edge="end"
                              color="inherit"
                              aria-label={open ? "close drawer" : "open drawer"}
                              onClick={toggleDrawer}
                              sx={{
                                  marginRight: '36px', 
                                  background: open ? 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)' : 'rgba(255,255,255,0.12)',
                                  color: open ? '#fff' : '#6a11cb',
                                  boxShadow: open ? '0 2px 8px #19118b33' : 'none',
                                  borderRadius: 2,
                                  transition: 'all 0.2s',
                                  '&:hover': {
                                    background: 'linear-gradient(135deg, #2575fc 0%, #6a11cb 100%)',
                                    color: '#fff',
                                    transform: 'scale(1.09)',
                                  },
                                  ...(open && { display: 'none' }),
                              }}
                          >
                              <MenuIcon sx={{ fontSize: 28 }} /> 
                          </IconButton>
                        </Tooltip>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            لوحة تحكم المسؤول
                        </Typography>
                        <AccountMenu />
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    anchor="right" 
                    open={open}
                    sx={open ? styles.drawerStyled : styles.hideDrawer}
                >
                    <Toolbar sx={styles.toolBarStyled}>
                        <Tooltip title="إخفاء الشريط الجانبي" placement="bottom" arrow TransitionComponent={Zoom}>
                          <IconButton
                            onClick={toggleDrawer}
                            sx={{
                              margin: '0 auto',
                              background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                              color: '#fff',
                              boxShadow: '0 2px 8px #19118b33',
                              borderRadius: 2,
                              transition: 'all 0.2s',
                              '&:hover': {
                                background: 'linear-gradient(135deg, #2575fc 0%, #6a11cb 100%)',
                                color: '#fff',
                                transform: 'scale(1.09)',
                              },
                            }}
                          >
                            <ChevronRightIcon sx={{ fontSize: 28 }} />
                          </IconButton>
                        </Tooltip>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        <SideBar />
                    </List>
                </Drawer>
                <Box component="main" sx={styles.boxStyled}>
                    <Toolbar />
                    <Routes>
                        <Route path="/" element={<AdminHomePage />} />
                        <Route path='*' element={<Navigate to="/" />} />
                        <Route path="/Admin/dashboard" element={<AdminHomePage />} />
                        <Route path="/Admin/profile" element={<AdminProfile />} />
                        <Route path="/Admin/complains" element={<SeeComplains />} />

                        {/* الملاحظات  */}
                        <Route path="/Admin/addnotice" element={<AddNotice />} />
                        <Route path="/Admin/notices" element={<ShowNotices />} />

                        {/* المادة */}
                        <Route path="/Admin/subjects" element={<ShowSubjects />} />
                        <Route path="/Admin/subjects/subject/:classID/:subjectID" element={<ViewSubject />} />
                        <Route path="/Admin/subjects/chooseclass" element={<ChooseClass situation="Subject" />} />

                        <Route path="/Admin/addsubject/:id" element={<SubjectForm />} />
                        <Route path="/Admin/class/subject/:classID/:subjectID" element={<ViewSubject />} />

                        <Route path="/Admin/subject/student/attendance/:studentID/:subjectID" element={<StudentAttendance situation="Subject" />} />
                        <Route path="/Admin/subject/student/marks/:studentID/:subjectID" element={<StudentExamMarks situation="Subject" />} />

                        {/* الفصل */}
                        <Route path="/Admin/addclass" element={<AddClass />} />
                        <Route path="/Admin/classes" element={<ShowClasses />} />
                        <Route path="/Admin/classes/class/:id" element={<ClassDetails />} />
                        <Route path="/Admin/class/addstudents/:id" element={<AddStudent situation="Class" />} />
                        <Route path="/Admin/classes/addclass" element={<AddClass />} />
                        <Route path="/Admin/classes/editclass/:id" element={<AddClass editMode={true} />} />

                        {/* الطالب */}
                        <Route path="/Admin/addstudents" element={<AddStudent situation="Student" />} />
                        <Route path="/Admin/students" element={<ShowStudents />} />
                        <Route path="/Admin/students/student/:id" element={<ViewStudent />} />
                        <Route path="/Admin/students/student/attendance/:id" element={<StudentAttendance situation="Student" />} />
                        <Route path="/Admin/students/student/marks/:id" element={<StudentExamMarks situation="Student" />} />

                        {/* الاستاد */}
                        <Route path="/Admin/teachers" element={<ShowTeachers />} />
                        <Route path="/Admin/teachers/teacher/:id" element={<TeacherDetails />} />
                        <Route path="/Admin/teachers/chooseclass" element={<ChooseClass situation="Teacher" />} />
                        <Route path="/Admin/teachers/choosesubject/:id" element={<ChooseSubject situation="Norm" />} />
                        <Route path="/Admin/teachers/choosesubject/:classID/:teacherID" element={<ChooseSubject situation="Teacher" />} />
                        <Route path="/Admin/teachers/addteacher/:id" element={<AddTeacher />} />

                        {/* الجدول الدراسي */}
                        <Route path="/Admin/schedule" element={<SchedulePage />} />

                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </Box>
            </Box>
        </>
    );
}

const styles = {
    boxStyled: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    toolBarStyled: {
        minHeight: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: 1,
    },
    drawerStyled: {
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
        },
    },
    hideDrawer: {
        width: 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            width: 0,
            boxSizing: 'border-box',
        },
    },
};

export default AdminDashboard;