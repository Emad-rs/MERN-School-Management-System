import React, { useEffect, useState } from 'react'
import { Container, Grid, Typography, Card, Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PieChartIcon from '@mui/icons-material/PieChart';
import CountUp from 'react-countup';
import SeeNotice from '../../components/SeeNotice';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';

const StudentHomePage = () => {
    const dispatch = useDispatch();

    const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);

    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const classID = currentUser.sclassName._id

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
    }, [dispatch, currentUser._id, classID]);

    const numberOfSubjects = subjectsList && subjectsList.length;

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails])

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];
    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3} lg={3}>
                        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, background: 'linear-gradient(135deg, #e3f0ff 0%, #fafcff 100%)' }}>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <MenuBookIcon sx={{ fontSize: 40, color: '#1976d2', mb: 1 }} />
                                <Typography variant="h6" fontWeight="bold">مجموع المواد</Typography>
                                <Typography variant="h4" color="#1976d2" fontWeight="bold">
                                    <CountUp start={0} end={numberOfSubjects} duration={2.5} />
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, background: 'linear-gradient(135deg, #fff3e0 0%, #fafcff 100%)' }}>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <AssignmentIcon sx={{ fontSize: 40, color: '#ff9800', mb: 1 }} />
                                <Typography variant="h6" fontWeight="bold">إجمالي الواجبات</Typography>
                                <Typography variant="h4" color="#ff9800" fontWeight="bold">
                                    <CountUp start={0} end={15} duration={4} />
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, background: 'linear-gradient(135deg, #e1f5fe 0%, #fafcff 100%)' }}>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <PieChartIcon sx={{ fontSize: 40, color: '#0288d1', mb: 1 }} />
                                <Typography variant="h6" fontWeight="bold">نسبة الحضور</Typography>
                                <Box>
                                    {response ? (
                                        <Typography variant="h6">لم يتم العثور على حضور</Typography>
                                    ) : loading ? (
                                        <Typography variant="h6">جاري التحميل...</Typography>
                                    ) : (
                                        subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                                            <CustomPieChart data={chartData} />
                                        ) : (
                                            <Typography variant="h6">لا توجد بيانات حضور</Typography>
                                        )
                                    )}
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={12} lg={3}>
                        <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3, mt: 2 }}>
                            <Typography variant="h6" fontWeight="bold" color="#1565c0" mb={2}>
                                الإشعارات
                            </Typography>
                            <SeeNotice />
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default StudentHomePage