import { useEffect, useState } from 'react';
import { IconButton, Box, Menu, MenuItem, ListItemIcon, Tooltip, Card, CardContent, Typography, Snackbar, Alert } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { BlueButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AddCardIcon from '@mui/icons-material/AddCard';
import ClassIcon from '@mui/icons-material/Class';
import styled from 'styled-components';

const ShowClasses = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { sclassesList, loading } = useSelector((state) => state.sclass);
  const { currentUser } = useSelector(state => state.user)
  const adminID = currentUser._id
  useEffect(() => { dispatch(getAllSclasses(adminID, "Sclass")); }, [adminID, dispatch]);
  const [message, setMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleSnackbarClose = () => setSnackbarOpen(false);
  const deleteHandler = (deleteID, address) => {
    setMessage("تم حذف الصف بنجاح.");
    setSnackbarOpen(true);
    dispatch(deleteUser(deleteID, address)).then(() => { dispatch(getAllSclasses(adminID, "Sclass")); })
  }
  const sclassColumns = [ { id: 'name', label: 'اسم الصف', minWidth: 170 }, ];
  // تعديل مهم لضمان أن sclassRows دائمًا مصفوفة
  const sclassRows = Array.isArray(sclassesList) && sclassesList.length > 0
    ? sclassesList.map((sclass) => ({ name: sclass.sclassName, id: sclass._id }))
    : [];
  const SclassButtonHaver = ({ row }) => {
    const actions = [
      { icon: <PostAddIcon />, name: 'إضافة مواد', action: () => navigate("/Admin/addsubject/" + row.id) },
      { icon: <PersonAddAlt1Icon />, name: 'إضافة طالب', action: () => navigate("/Admin/class/addstudents/" + row.id) },
    ];
    return (
      <ButtonContainer>
        <Tooltip title="حذف الصف" arrow>
          <IconButton onClick={() => deleteHandler(row.id, "Sclass")} color="secondary" sx={{ background: 'rgba(255,0,0,0.06)', borderRadius: 2, '&:hover': { background: 'rgba(255,0,0,0.14)' } }}>
            <DeleteIcon color="error" />
          </IconButton>
        </Tooltip>
        {/* زر عرض */}
        <BlueButton variant="contained" onClick={() => navigate("/Admin/classes/class/" + row.id)} sx={{ fontWeight: 700, borderRadius: 2, mx: 1 }}>عرض</BlueButton>
        {/* زر تعديل */}
        <BlueButton variant="contained" onClick={() => navigate("/Admin/classes/editclass/" + row.id)} sx={{ fontWeight: 700, borderRadius: 2, mx: 1 }}>تعديل</BlueButton>
        <ActionMenu actions={actions} />
      </ButtonContainer>
    );
  };
  const ActionMenu = ({ actions }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    return (
      <>
        <Tooltip title="إجراءات إضافية" arrow>
          <IconButton onClick={e => setAnchorEl(e.currentTarget)} color="primary" sx={{ ml: 1 }}>
            <AddCardIcon />
          </IconButton>
        </Tooltip>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
          {actions.map((action, idx) => (
            <MenuItem key={idx} onClick={() => { setAnchorEl(null); action.action(); }}>
              <ListItemIcon>{action.icon}</ListItemIcon>
              {action.name}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  };
  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', mt: 3, px: 2 }}>
      <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)', color: '#fff', borderRadius: 3, boxShadow: '0 4px 24px #19118b22' }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <ClassIcon sx={{ fontSize: 36, color: '#fff' }} />
          <Typography variant="h5" fontWeight={800} letterSpacing={1}>إدارة الصفوف</Typography>
          {/* زر إضافة صف جديد */}
          <BlueButton
            variant="contained"
            onClick={() => navigate("/Admin/classes/addclass")}
            sx={{ ml: 'auto', fontWeight: 700, borderRadius: 2 }}
          >
            إضافة صف جديد
          </BlueButton>
        </CardContent>
      </Card>
      <Card sx={{ borderRadius: 3, boxShadow: '0 2px 16px #19118b11', p: 2 }}>
        <CardContent>
          <TableTemplate buttonHaver={SclassButtonHaver} columns={sclassColumns} rows={sclassRows} loading={loading} minWidth={350} />
        </CardContent>
      </Card>
      <Snackbar open={snackbarOpen} autoHideDuration={2500} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleSnackbarClose} severity="success" variant="filled" sx={{ width: '100%' }}>{message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default ShowClasses;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;