import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import { Card, CardContent, Box, Typography, Snackbar, Alert, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import styled from 'styled-components';

const ShowSubjects = () => {
  const [message, setMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { subjectsList, loading } = useSelector((state) => state.sclass);
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => { dispatch(getSubjectList(currentUser._id, "AllSubjects")); }, [currentUser._id, dispatch]);

  const handleSnackbarClose = () => setSnackbarOpen(false);
  const deleteHandler = (deleteID, address) => {
    setMessage("تم حذف المادة بنجاح.");
    setSnackbarOpen(true);
    dispatch(deleteUser(deleteID, address)).then(() => { dispatch(getSubjectList(currentUser._id, "AllSubjects")); });
  };

  const subjectColumns = [
    { id: 'subName', label: 'اسم المادة', minWidth: 170 },
    { id: 'sessions', label: 'عدد الحصص', minWidth: 100 },
    { id: 'sclassName', label: 'الصف', minWidth: 170 },
  ];

  // --- subjectRows always array ---
  const subjectRows = Array.isArray(subjectsList) && subjectsList.length > 0
    ? subjectsList.map((subject) => ({
      subName: subject.subName,
      sessions: subject.sessions,
      sclassName: subject.sclassName?.sclassName || '',
      id: subject._id,
      sclassID: subject.sclassName?._id || '',
    }))
    : [];

  const SubjectsButtonHaver = ({ row }) => (
    <ButtonContainer>
      <Tooltip title="حذف المادة" arrow>
        <IconButton onClick={() => deleteHandler(row.id, "Subject")} color="secondary" sx={{ background: 'rgba(255,0,0,0.06)', borderRadius: 2, '&:hover': { background: 'rgba(255,0,0,0.14)' } }}>
          <DeleteIcon color="error" />
        </IconButton>
      </Tooltip>
      <BlueButton variant="contained" onClick={() => navigate(`/Admin/subjects/subject/${row.sclassID}/${row.id}`)} sx={{ fontWeight: 700, borderRadius: 2, mx: 1 }}>عرض</BlueButton>
    </ButtonContainer>
  );

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', mt: 3, px: 2 }}>
      <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #fc466b 0%, #3f5efb 100%)', color: '#fff', borderRadius: 3, boxShadow: '0 4px 24px #fc466b22' }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <PostAddIcon sx={{ fontSize: 36, color: '#fff' }} />
          <Typography variant="h5" fontWeight={800} letterSpacing={1}>إدارة المواد</Typography>
          <GreenButton variant="contained" onClick={() => navigate("/Admin/subjects/chooseclass")} sx={{ ml: 'auto', fontWeight: 700, borderRadius: 2 }}>إضافة مادة</GreenButton>
        </CardContent>
      </Card>
      <Card sx={{ borderRadius: 3, boxShadow: '0 2px 16px #fc466b11', p: 2 }}>
        <CardContent>
          <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} loading={loading} minWidth={350} />
        </CardContent>
      </Card>
      <Snackbar open={snackbarOpen} autoHideDuration={2500} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleSnackbarClose} severity="success" variant="filled" sx={{ width: '100%' }}>{message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default ShowSubjects;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;