import { Container, Grid, Paper } from '@mui/material'
import SeeNotice from '../../components/SeeNotice';
import styled from 'styled-components';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ClassIcon from '@mui/icons-material/Class';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList } = useSelector((state) => state.sclass);
    const { teachersList } = useSelector((state) => state.teacher);
    const { currentUser } = useSelector(state => state.user)
    const adminID = currentUser._id

    useEffect(() => {
        dispatch(getAllStudents(adminID));
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllTeachers(adminID));
    }, [adminID, dispatch]);

    const numberOfStudents = studentsList && studentsList.length;
    const numberOfClasses = sclassesList && sclassesList.length;
    const numberOfTeachers = teachersList && teachersList.length;

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
                <SupervisorAccountIcon sx={{ fontSize: 44, color: '#fff', filter: 'drop-shadow(0 2px 8px #fda08566)' }} />
                مرحبًا بك أيها المسؤول في لوحة التحكم
            </div>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={4} justifyContent="center" alignItems="center" style={{ marginTop: 10 }}>
                    <Grid item xs={12} md={4} lg={4}>
                        <StatCard style={{ animation: 'fadeInUp 1s 0.1s both' }}>
                            <GroupsIcon sx={{ fontSize: 48, color: '#6a11cb', marginBottom: 1 }} />
                            <StatTitle>عدد الطلاب</StatTitle>
                            <StatNumber>
                                <CountUp start={0} end={numberOfStudents} duration={2.5} separator="," />
                            </StatNumber>
                        </StatCard>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <StatCard style={{ animation: 'fadeInUp 1s 0.3s both' }}>
                            <ClassIcon sx={{ fontSize: 48, color: '#43a047', marginBottom: 1 }} />
                            <StatTitle>عدد الصفوف</StatTitle>
                            <StatNumber>
                                <CountUp start={0} end={numberOfClasses} duration={2.5} separator="," />
                            </StatNumber>
                        </StatCard>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <StatCard style={{ animation: 'fadeInUp 1s 0.5s both' }}>
                            <PersonOutlineIcon sx={{ fontSize: 48, color: '#ff9800', marginBottom: 1 }} />
                            <StatTitle>عدد المعلمين</StatTitle>
                            <StatNumber>
                                <CountUp start={0} end={numberOfTeachers} duration={2.5} separator="," />
                            </StatNumber>
                        </StatCard>
                    </Grid>
                </Grid>
                {/* إشعارات أو تنبيهات */}
                <div style={{ marginTop: 40, animation: 'fadeInUp 1s 0.7s both' }}>
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
};

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

export default AdminHomePage