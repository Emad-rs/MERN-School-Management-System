import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllTeachers } from '../../../redux/teacherRelated/teacherHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import { Card, CardContent, Box, Typography, Snackbar, Alert, IconButton, Tooltip } from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
// import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'; // تم التعليق لأنه غير مستخدم
import ClassIcon from '@mui/icons-material/Class';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import styled from 'styled-components';

const ShowTeachers = () => {
  const [message, setMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { teachersList, loading } = useSelector((state) => state.teacher);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => { dispatch(getAllTeachers(currentUser._id)); }, [currentUser._id, dispatch]);

  const handleSnackbarClose = () => setSnackbarOpen(false);
  const deleteHandler = (deleteID, address) => {
    setMessage("تم حذف المعلم بنجاح.");
    setSnackbarOpen(true);
    dispatch(deleteUser(deleteID, address)).then(() => { dispatch(getAllTeachers(currentUser._id)); });
  };

  const columns = [
    { id: 'name', label: 'اسم المعلم', minWidth: 170 },
    { id: 'teachSubject', label: 'المادة', minWidth: 100 },
    { id: 'teachSclass', label: 'الصف', minWidth: 170 },
  ];

  const rows = teachersList.map((teacher) => ({
    name: teacher.name,
    teachSubject: teacher.teachSubject?.subName || '',
    teachSclass: teacher.teachSclass?.sclassName || '',
    id: teacher._id,
  }));

  const TeacherButtonHaver = ({ row }) => (
    <ButtonContainer>
      <Tooltip title="حذف المعلم" arrow>
        <IconButton onClick={() => deleteHandler(row.id, "Teacher")} color="secondary" sx={{ background: 'rgba(255,0,0,0.06)', borderRadius: 2, '&:hover': { background: 'rgba(255,0,0,0.14)' } }}>
          <PersonRemoveIcon color="error" />
        </IconButton>
      </Tooltip>
      <BlueButton variant="contained" onClick={() => navigate(`/Admin/teachers/teacher/${row.id}`)} sx={{ fontWeight: 700, borderRadius: 2, mx: 1 }}>عرض</BlueButton>
    </ButtonContainer>
  );

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', mt: 3, px: 2 }}>
      <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', color: '#fff', borderRadius: 3, boxShadow: '0 4px 24px #11998e22' }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <ClassIcon sx={{ fontSize: 36, color: '#fff' }} />
          <Typography variant="h5" fontWeight={800} letterSpacing={1}>إدارة المعلمين</Typography>
          <GreenButton variant="contained" onClick={() => navigate("/Admin/teachers/chooseclass")} sx={{ ml: 'auto', fontWeight: 700, borderRadius: 2 }}>إضافة معلم</GreenButton>
        </CardContent>
      </Card>
      <Card sx={{ borderRadius: 3, boxShadow: '0 2px 16px #11998e11', p: 2 }}>
        <CardContent>
          <TableTemplate buttonHaver={TeacherButtonHaver} columns={columns} rows={rows} loading={loading} minWidth={350} />
        </CardContent>
      </Card>
      <Snackbar open={snackbarOpen} autoHideDuration={2500} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleSnackbarClose} severity="success" variant="filled" sx={{ width: '100%' }}>{message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default ShowTeachers;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;