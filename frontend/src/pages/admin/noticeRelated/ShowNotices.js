import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getAllNotices } from '../../../redux/noticeRelated/noticeHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import { Card, CardContent, Box, Typography, Snackbar, Alert, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import styled from 'styled-components';

const ShowNotices = () => {
  const [message, setMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { noticesList, loading } = useSelector((state) => state.notice);
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => { dispatch(getAllNotices(currentUser._id, "Notice")); }, [currentUser._id, dispatch]);

  const handleSnackbarClose = () => setSnackbarOpen(false);
  const deleteHandler = (deleteID, address) => {
    setMessage("تم حذف الإشعار بنجاح.");
    setSnackbarOpen(true);
    dispatch(deleteUser(deleteID, address)).then(() => { dispatch(getAllNotices(currentUser._id, "Notice")); });
  };

  const noticeColumns = [
    { id: 'title', label: 'عنوان الإشعار', minWidth: 170 },
    { id: 'details', label: 'التفاصيل', minWidth: 100 },
    { id: 'date', label: 'التاريخ', minWidth: 170 },
  ];

  const noticeRows = Array.isArray(noticesList) && noticesList.length > 0
    ? noticesList.map((notice) => {
        const date = new Date(notice.date);
        const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
        return {
          title: notice.title,
          details: notice.details,
          date: dateString,
          id: notice._id,
        };
      })
    : [];

  const NoticeButtonHaver = ({ row }) => (
    <ButtonContainer>
      <Tooltip title="حذف الإشعار" arrow>
        <IconButton onClick={() => deleteHandler(row.id, "Notice")} color="secondary" sx={{ background: 'rgba(255,0,0,0.06)', borderRadius: 2, '&:hover': { background: 'rgba(255,0,0,0.14)' } }}>
          <DeleteIcon color="error" />
        </IconButton>
      </Tooltip>
      <BlueButton variant="contained" onClick={() => navigate(`/Admin/notices/notice/${row.id}`)} sx={{ fontWeight: 700, borderRadius: 2, mx: 1 }}>عرض</BlueButton>
    </ButtonContainer>
  );

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', mt: 3, px: 2 }}>
      <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', color: '#fff', borderRadius: 3, boxShadow: '0 4px 24px #f7971e22' }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <NoteAddIcon sx={{ fontSize: 36, color: '#fff' }} />
          <Typography variant="h5" fontWeight={800} letterSpacing={1}>إدارة الإشعارات</Typography>
          <GreenButton variant="contained" onClick={() => navigate("/Admin/addnotice")} sx={{ ml: 'auto', fontWeight: 700, borderRadius: 2 }}>إضافة إشعار</GreenButton>
        </CardContent>
      </Card>
      <Card sx={{ borderRadius: 3, boxShadow: '0 2px 16px #f7971e11', p: 2 }}>
        <CardContent>
          <TableTemplate buttonHaver={NoticeButtonHaver} columns={noticeColumns} rows={noticeRows} loading={loading} minWidth={350} />
        </CardContent>
      </Card>
      <Snackbar open={snackbarOpen} autoHideDuration={2500} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleSnackbarClose} severity="success" variant="filled" sx={{ width: '100%' }}>{message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default ShowNotices;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;