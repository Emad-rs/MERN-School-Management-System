import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Collapse, Table, TableBody, TableHead, Typography, Card, CardContent } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart'
import { PurpleButton } from '../../components/buttonStyles';
import { StyledTableCell, StyledTableRow } from '../../components/styles';

// import Divider from '@mui/material/Divider'; // تم التعليق لأنه غير مستخدم

const TeacherViewStudent = () => {

    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch();
    const { currentUser, userDetails, response, loading, error } = useSelector((state) => state.user);

    const address = "Student"
    const studentID = params.id
    const teachSubject = currentUser.teachSubject?.subName
    const teachSubjectID = currentUser.teachSubject?._id

    useEffect(() => {
        dispatch(getUserDetails(studentID, address));
    }, [dispatch, studentID]);

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [sclassName, setSclassName] = useState('');
    const [studentSchool, setStudentSchool] = useState('');
    const [subjectMarks, setSubjectMarks] = useState('');
    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const [openStates, setOpenStates] = useState({});

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    useEffect(() => {
        if (userDetails) {
            setSclassName(userDetails.sclassName || '');
            setStudentSchool(userDetails.school || '');
            setSubjectMarks(userDetails.examResult || '');
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    return (
        <>
            {loading
                ?
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                    <Typography variant="h6">جاري التحميل...</Typography>
                </Box>
                :
                <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3, minWidth: 400, mb: 3 }}>
                        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                            <PersonIcon sx={{ fontSize: 50, color: '#1976d2', mb: 1 }} />
                            <Typography variant="h5" color="#1976d2" fontWeight="bold">معلومات الطالب</Typography>
                        </Box>
                        <CardContent>
                            <Typography variant="h6">الاسم: {userDetails.name}</Typography>
                            <Typography variant="h6">رقم القيد: {userDetails.rollNum}</Typography>
                            <Typography variant="h6">الفصل: {sclassName.sclassName}</Typography>
                            <Typography variant="h6">المدرسة: {studentSchool.schoolName}</Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3, minWidth: 400, mb: 3 }}>
                        <Typography variant="h6" color="#0288d1" fontWeight="bold" mb={2}>الحضور</Typography>
                        {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                            <>
                                <Box sx={{ mb: 2 }}>
                                    <CustomPieChart data={chartData} />
                                </Box>
                                {Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { present, allData, subId, sessions }], index) => {
                                    if (subName === teachSubject) {
                                        const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);

                                        return (
                                            <Box key={index} sx={{ mb: 2 }}>
                                                <Typography variant="h6">المادة: {subName}</Typography>
                                                <Typography variant="h6">حاضر: {present}</Typography>
                                                <Typography variant="h6">عدد الحصص: {sessions}</Typography>
                                                <Typography variant="h6">نسبة الحضور: {subjectAttendancePercentage}%</Typography>
                                                <Button variant="contained" onClick={() => handleOpen(subId)}>
                                                    {openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}التفاصيل
                                                </Button>
                                                <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
                                                    <Box sx={{ margin: 1 }}>
                                                        <Typography variant="h6" gutterBottom component="div">
                                                            Attendance Details
                                                        </Typography>
                                                        <Table size="small" aria-label="purchases">
                                                            <TableHead>
                                                                <StyledTableRow>
                                                                    <StyledTableCell>Date</StyledTableCell>
                                                                    <StyledTableCell align="right">Status</StyledTableCell>
                                                                </StyledTableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {allData.map((data, index) => {
                                                                    const date = new Date(data.date);
                                                                    const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
                                                                    return (
                                                                        <StyledTableRow key={index}>
                                                                            <StyledTableCell component="th" scope="row">
                                                                                {dateString}
                                                                            </StyledTableCell>
                                                                            <StyledTableCell align="right">{data.status}</StyledTableCell>
                                                                        </StyledTableRow>
                                                                    );
                                                                })}
                                                            </TableBody>
                                                        </Table>
                                                    </Box>
                                                </Collapse>
                                            </Box>
                                        )
                                    }
                                    else {
                                        return null
                                    }
                                })}
                                <Typography variant="h6">إجمالي نسبة الحضور: {overallAttendancePercentage.toFixed(2)}%</Typography>
                            </>
                        ) : (
                            <Typography>لا توجد بيانات حضور متاحة.</Typography>
                        )}
                    </Card>
                    <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3, minWidth: 400, mb: 3 }}>
                        <Typography variant="h6" color="#0288d1" fontWeight="bold" mb={2}>الدرجات</Typography>
                        {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0 ? (
                            <>
                                {subjectMarks.map((result, index) => {
                                    if (result.subName.subName === teachSubject) {
                                        return (
                                            <Box key={index} sx={{ mb: 2 }}>
                                                <Typography variant="h6">المادة: {result.subName.subName}</Typography>
                                                <Typography variant="h6">الدرجات: {result.marksObtained}</Typography>
                                            </Box>
                                        )
                                    }
                                    else if (!result.subName || !result.marksObtained) {
                                        return null;
                                    }
                                    return null
                                })}
                            </>
                        ) : (
                            <Typography>لا توجد بيانات درجات متاحة.</Typography>
                        )}
                    </Card>
                    <Button
                        variant="contained"
                        onClick={() =>
                            navigate(
                                `/Teacher/class/student/attendance/${studentID}/${teachSubjectID}`
                            )
                        }
                    >
                        إضافة حضور
                    </Button>
                    <PurpleButton variant="contained"
                        onClick={() =>
                            navigate(
                                `/Teacher/class/student/marks/${studentID}/${teachSubjectID}`
                            )}>
                        إضافة درجات
                    </PurpleButton>
                </Box>
            }
        </>
    )
}

export default TeacherViewStudent