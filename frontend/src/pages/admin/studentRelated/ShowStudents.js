import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getAllStudents } from '../../../redux/studentRelated/studentHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import { Card, CardContent, Box, Typography, Snackbar, Alert, IconButton, Tooltip } from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import styled from 'styled-components';

const ShowStudents = () => {
  const [message, setMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { studentsList, loading } = useSelector((state) => state.student);
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => { dispatch(getAllStudents(currentUser._id)); }, [currentUser._id, dispatch]);

  const handleSnackbarClose = () => setSnackbarOpen(false);
  const deleteHandler = (deleteID, address) => {
    setMessage("تم حذف الطالب بنجاح.");
    setSnackbarOpen(true);
    dispatch(deleteUser(deleteID, address)).then(() => { dispatch(getAllStudents(currentUser._id)); });
  };

  const studentColumns = [
    { id: 'name', label: 'اسم الطالب', minWidth: 170 },
    { id: 'rollNum', label: 'الرقم الأكاديمي', minWidth: 100 },
    { id: 'sclassName', label: 'الصف', minWidth: 170 },
  ];

  // تعديل مهم لضمان أن studentRows دائمًا مصفوفة
  const studentRows = Array.isArray(studentsList) && studentsList.length > 0
    ? studentsList.map((student) => ({
        name: student.name,
        rollNum: student.rollNum,
        sclassName: student.sclassName?.sclassName || '',
        id: student._id,
      }))
    : [];

  const StudentButtonHaver = ({ row }) => (
    <ButtonContainer>
      <Tooltip title="حذف الطالب" arrow>
        <IconButton onClick={() => deleteHandler(row.id, "Student")} color="secondary" sx={{ background: 'rgba(255,0,0,0.06)', borderRadius: 2, '&:hover': { background: 'rgba(255,0,0,0.14)' } }}>
          <PersonRemoveIcon color="error" />
        </IconButton>
      </Tooltip>
      <BlueButton variant="contained" onClick={() => navigate(`/Admin/students/student/${row.id}`)} sx={{ fontWeight: 700, borderRadius: 2, mx: 1 }}>عرض</BlueButton>
    </ButtonContainer>
  );

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', mt: 3, px: 2 }}>
      <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #fc5c7d 0%, #6a82fb 100%)', color: '#fff', borderRadius: 3, boxShadow: '0 4px 24px #fc5c7d22' }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <PersonAddAlt1Icon sx={{ fontSize: 36, color: '#fff' }} />
          <Typography variant="h5" fontWeight={800} letterSpacing={1}>إدارة الطلاب</Typography>
          <GreenButton variant="contained" onClick={() => navigate("/Admin/students/addstudent")} sx={{ ml: 'auto', fontWeight: 700, borderRadius: 2 }}>إضافة طالب</GreenButton>
        </CardContent>
      </Card>
      <Card sx={{ borderRadius: 3, boxShadow: '0 2px 16px #fc5c7d11', p: 2 }}>
        <CardContent>
          <TableTemplate buttonHaver={StudentButtonHaver} columns={studentColumns} rows={studentRows} loading={loading} minWidth={350} />
        </CardContent>
      </Card>
      <Snackbar open={snackbarOpen} autoHideDuration={2500} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleSnackbarClose} severity="success" variant="filled" sx={{ width: '100%' }}>{message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default ShowStudents;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;