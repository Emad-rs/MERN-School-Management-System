import { Container, Grid, Card, Typography, Box } from '@mui/material'
// import CardContent from '@mui/material/CardContent'; // تم التعليق لأنه غير مستخدم
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
// import styled from 'styled-components'; // تم التعليق لأنه غير مستخدم
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { getClassStudents, getSubjectDetails } from '../../redux/sclassRelated/sclassHandle';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const TeacherHomePage = () => {
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.user);
    const { subjectDetails, sclassStudents } = useSelector((state) => state.sclass);

    const classID = currentUser.teachSclass?._id
    const subjectID = currentUser.teachSubject?._id

    useEffect(() => {
        dispatch(getSubjectDetails(subjectID, "Subject"));
        dispatch(getClassStudents(classID));
    }, [dispatch, subjectID, classID]);

    const numberOfStudents = sclassStudents && sclassStudents.length;
    const numberOfSessions = subjectDetails && subjectDetails.sessions

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3} lg={3}>
                        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, background: 'linear-gradient(135deg, #e3f0ff 0%, #fafcff 100%)' }}>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <GroupsIcon sx={{ fontSize: 40, color: '#1976d2', mb: 1 }} />
                                <Typography variant="h6" fontWeight="bold">طلاب الصف</Typography>
                                <Typography variant="h4" color="#1976d2" fontWeight="bold">
                                    <CountUp start={0} end={numberOfStudents} duration={2.5} />
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, background: 'linear-gradient(135deg, #f3e5f5 0%, #fafcff 100%)' }}>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <MenuBookIcon sx={{ fontSize: 40, color: '#8e24aa', mb: 1 }} />
                                <Typography variant="h6" fontWeight="bold">إجمالي عدد الدروس</Typography>
                                <Typography variant="h4" color="#8e24aa" fontWeight="bold">
                                    <CountUp start={0} end={numberOfSessions} duration={5} />
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, background: 'linear-gradient(135deg, #e1f5fe 0%, #fafcff 100%)' }}>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <EmojiEventsIcon sx={{ fontSize: 40, color: '#0288d1', mb: 1 }} />
                                <Typography variant="h6" fontWeight="bold">الاختبارات التي اجريت</Typography>
                                <Typography variant="h4" color="#0288d1" fontWeight="bold">
                                    <CountUp start={0} end={24} duration={4} />
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, background: 'linear-gradient(135deg, #fff3e0 0%, #fafcff 100%)' }}>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <AccessTimeIcon sx={{ fontSize: 40, color: '#ff9800', mb: 1 }} />
                                <Typography variant="h6" fontWeight="bold">عدد الساعات</Typography>
                                <Typography variant="h4" color="#ff9800" fontWeight="bold">
                                    <CountUp start={0} end={30} duration={4} suffix="hrs" />
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
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

export default TeacherHomePage