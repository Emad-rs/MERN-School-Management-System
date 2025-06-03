import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { getAllSclasses } from '../redux/sclassRelated/sclassHandle';
import { fetchScheduleByClass, addScheduleItem, deleteScheduleItem } from '../redux/scheduleRelated/scheduleHandle';

// تعريف الأيام والحصص
const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'];
const periods = ['الأولى', 'الثانية', 'الثالثة', 'الرابعة', 'الخامسة', 'السادسة'];
const periodNameToNumber = periodName => periods.indexOf(periodName) + 1;

const SchedulePage = () => {
  const dispatch = useDispatch();
  const { sclassesList } = useSelector(state => state.sclass);
  const { currentUser, currentRole } = useSelector(state => state.user);
  const { schedule, loading } = useSelector(state => state.schedule);

  const [selectedClass, setSelectedClass] = useState('');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newPeriod, setNewPeriod] = useState('');
  const [newDay, setNewDay] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [selectedToDelete, setSelectedToDelete] = useState(null);

  useEffect(() => {
    if (currentUser && currentUser._id) {
      dispatch(getAllSclasses(currentUser._id, "Sclass"));
    }
  }, [dispatch, currentUser]);

  useEffect(() => {
    if (selectedClass) {
      dispatch(fetchScheduleByClass(selectedClass));
    }
  }, [dispatch, selectedClass]);

  useEffect(() => {
    if (currentRole === 'Student' && currentUser && currentUser.sclassName && currentUser.sclassName._id) {
      setSelectedClass(currentUser.sclassName._id);
    }
  }, [currentRole, currentUser]);

  const handleAddDialogOpen = () => setOpenAddDialog(true);
  const handleAddDialogClose = () => {
    setOpenAddDialog(false);
    setNewPeriod('');
    setNewDay('');
    setNewSubject('');
  };

  const handleAddSchedule = () => {
    if (!newDay || !newPeriod || !newSubject) return;
    dispatch(addScheduleItem({
      day: newDay,
      period: periodNameToNumber(newPeriod),
      subject: newSubject,
      sclass: selectedClass,
      school: "67b9d6ba14004c5649155d5c" // معرف المدرسة ثابت
    })).then(() => {
      handleAddDialogClose();
      dispatch(fetchScheduleByClass(selectedClass)); // إعادة تحميل الجدول
    });
  };

  // حذف حصة بناءً على اختيار المستخدم
  const handleDeleteSchedule = (id) => {
    dispatch(deleteScheduleItem(id)).then(() => {
      dispatch(fetchScheduleByClass(selectedClass));
      setSelectedToDelete(null);
    });
  };

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 16 }}>الجدول الدراسي</h2>
      {currentRole !== 'Student' && (
        <FormControl fullWidth style={{ marginBottom: 24 }}>
          <InputLabel id="class-select-label">اختر الصف</InputLabel>
          <Select
            labelId="class-select-label"
            value={selectedClass}
            label="اختر الصف"
            onChange={e => setSelectedClass(e.target.value)}
          >
            {sclassesList && sclassesList.length > 0 ? (
              sclassesList.map((cls) => (
                <MenuItem key={cls._id} value={cls._id}>{cls.sclassName}</MenuItem>
              ))
            ) : (
              <MenuItem value="" disabled>لا يوجد صفوف متاحة</MenuItem>
            )}
          </Select>
        </FormControl>
      )}
      {loading ? (
        <div style={{ textAlign: 'center', margin: 24 }}>
          <CircularProgress />
        </div>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 2, border: '2px solid #bdbdbd', mt: 2 }}>
          <Table sx={{ minWidth: 650, borderCollapse: 'separate', borderSpacing: 0 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ border: '1px solid #bdbdbd', background: '#f5f5f5', fontWeight: 'bold', textAlign: 'center' }}></TableCell>
                {periods.map((period, idx) => (
                  <TableCell
                    key={idx}
                    align="center"
                    sx={{ border: '1px solid #bdbdbd', background: '#f5f5f5', fontWeight: 'bold' }}
                  >
                    {period}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {days.map((day, dayIdx) => (
                <TableRow key={dayIdx}>
                  <TableCell
                    align="center"
                    sx={{ border: '1px solid #bdbdbd', fontWeight: 'bold', background: '#fafafa' }}
                  >
                    {day}
                  </TableCell>
                  {periods.map((_, periodIdx) => {
                    const item = schedule.find(
                      (entry) => entry.day === days[dayIdx] && Number(entry.period) === periodIdx + 1
                    );
                    return (
                      <TableCell
                        key={periodIdx}
                        align="center"
                        sx={{ border: '1px solid #bdbdbd', background: '#fff' }}
                      >
                        {item ? (
                          <>
                            {item.subject}
                            {currentRole === 'Admin' && (
                              <Button
                                size="small"
                                color="error"
                                variant={selectedToDelete === item._id ? "contained" : "outlined"}
                                style={{ marginRight: 4, marginLeft: 4, minWidth: 0 }}
                                onClick={() => setSelectedToDelete(item._id)}
                              >
                                حذف
                              </Button>
                            )}
                            {selectedToDelete === item._id && (
                              <Button
                                size="small"
                                color="error"
                                variant="contained"
                                style={{ marginRight: 4, minWidth: 0 }}
                                onClick={() => handleDeleteSchedule(item._id)}
                              >
                                تأكيد
                              </Button>
                            )}
                          </>
                        ) : ''}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {currentRole === 'Admin' && selectedClass && (
        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
          <Button variant="contained" color="primary" onClick={handleAddDialogOpen}>إضافة حصة</Button>
        </div>
      )}
      {currentRole !== 'Admin' && (
        <p style={{ marginTop: 16, color: '#888' }}>يمكنك فقط عرض الجدول الدراسي.</p>
      )}
      <Dialog open={openAddDialog} onClose={handleAddDialogClose}>
        <DialogTitle>إضافة حصة جديدة</DialogTitle>
        <DialogContent sx={{ minWidth: 300 }}>
          <TextField
            select
            margin="dense"
            label="اليوم"
            value={newDay}
            onChange={e => setNewDay(e.target.value)}
            fullWidth
            required
          >
            {days.map((day) => (
              <MenuItem key={day} value={day}>{day}</MenuItem>
            ))}
          </TextField>
          <TextField
            select
            margin="dense"
            label="الحصة"
            value={newPeriod}
            onChange={e => setNewPeriod(e.target.value)}
            fullWidth
            required
          >
            {periods.map((period) => (
              <MenuItem key={period} value={period}>{period}</MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            label="اسم المادة"
            value={newSubject}
            onChange={e => setNewSubject(e.target.value)}
            fullWidth
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose} color="secondary">إلغاء</Button>
          <Button onClick={handleAddSchedule} color="primary" variant="contained">إضافة</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SchedulePage;
