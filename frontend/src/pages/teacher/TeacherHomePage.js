import { Container, Grid, Paper } from '@mui/material';
import styled from 'styled-components';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
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
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
            backgroundAttachment: 'fixed',
            paddingBottom: 40
        }}>
            {/* شريط ترحيبي */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '32px 0 8px 0',
                gap: 14,
                fontWeight: 800,
                fontSize: 32,
                color: '#fff',
                letterSpacing: 1,
                textShadow: '0 2px 12px #fda08599',
                animation: 'fadeInDown 1s cubic-bezier(.39,.575,.565,1)'
            }}>
                <GroupsIcon sx={{ fontSize: 44, color: '#fff', filter: 'drop-shadow(0 2px 8px #fda08566)' }} />
                مرحبًا بك أيها المعلم في لوحة التحكم
            </div>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={4} justifyContent="center" alignItems="center" style={{ marginTop: 10 }}>
                    <Grid item xs={12} md={3} lg={3}>
                        <StatCard style={{ animation: 'fadeInUp 1s 0.1s both' }}>
                            <GroupsIcon sx={{ fontSize: 40, color: '#1976d2', mb: 1 }} />
                            <StatTitle>طلاب الصف</StatTitle>
                            <StatNumber>
                                <CountUp start={0} end={numberOfStudents} duration={2.5} />
                            </StatNumber>
                        </StatCard>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StatCard style={{ animation: 'fadeInUp 1s 0.3s both' }}>
                            <MenuBookIcon sx={{ fontSize: 40, color: '#8e24aa', mb: 1 }} />
                            <StatTitle>إجمالي عدد الدروس</StatTitle>
                            <StatNumber>
                                <CountUp start={0} end={numberOfSessions} duration={5} />
                            </StatNumber>
                        </StatCard>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StatCard style={{ animation: 'fadeInUp 1s 0.5s both' }}>
                            <EmojiEventsIcon sx={{ fontSize: 40, color: '#0288d1', mb: 1 }} />
                            <StatTitle>الاختبارات التي اجريت</StatTitle>
                            <StatNumber>
                                <CountUp start={0} end={24} duration={4} />
                            </StatNumber>
                        </StatCard>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StatCard style={{ animation: 'fadeInUp 1s 0.7s both' }}>
                            <AccessTimeIcon sx={{ fontSize: 40, color: '#ff9800', mb: 1 }} />
                            <StatTitle>عدد الساعات</StatTitle>
                            <StatNumber>
                                <CountUp start={0} end={30} duration={4} suffix="hrs" />
                            </StatNumber>
                        </StatCard>
                    </Grid>
                </Grid>
                {/* إشعارات أو تنبيهات */}
                <div style={{ marginTop: 40, animation: 'fadeInUp 1s 0.9s both' }}>
                    <SeeNotice />
                </div>
            </Container>
            {/* مؤثرات حركة */}
            <style>{`
            @keyframes fadeInDown {
                0% { opacity: 0; transform: translateY(-40px) scale(0.98); }
                100% { opacity: 1; transform: translateY(0) scale(1); }
            }
            @keyframes fadeInUp {
                0% { opacity: 0; transform: translateY(30px) scale(0.98); }
                100% { opacity: 1; transform: translateY(0) scale(1); }
            }
            `}</style>
        </div>
    );
}

const StatCard = styled(Paper)`
  padding: 28px 0 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 28px;
  background: rgba(255,255,255,0.92);
  box-shadow: 0 4px 24px #fda08533;
  transition: transform 0.18s, box-shadow 0.18s;
  min-height: 200px;
  &:hover {
    transform: scale(1.04);
    box-shadow: 0 8px 32px #fda08555;
  }
`;

const StatTitle = styled.div`
  font-weight: 700;
  color: #19118b;
  font-size: 22px;
  margin-bottom: 8px;
`;

const StatNumber = styled.div`
  color: #2575fc;
  font-size: 38px;
  font-weight: 900;
  margin-top: 8px;
`;

export default TeacherHomePage;