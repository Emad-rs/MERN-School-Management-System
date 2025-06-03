import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box } from '@mui/material';
import styled from 'styled-components';
import Students from "../assets/students.svg";
import { LightPurpleButton } from '../components/buttonStyles';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';

const Homepage = () => {
    return (
        <StyledContainer>
            {/* خلفية متدرجة عصرية */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1,
                background: 'linear-gradient(120deg, #6a11cb 0%, #2575fc 100%)',
                backgroundAttachment: 'fixed',
            }} />
            <Grid container spacing={0} alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
                <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box sx={{
                        background: 'rgba(255,255,255,0.12)',
                        borderRadius: '50%',
                        boxShadow: '0 6px 32px #19118b22',
                        width: 320,
                        height: 320,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 'auto',
                        border: '6px solid #fff4',
                        animation: 'fadeInLeft 1.2s cubic-bezier(.39,.575,.565,1)'
                    }}>
                        <img src={Students} alt="students" style={{ width: 210, borderRadius: '50%', boxShadow: '0 2px 12px #19118b22' }} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <StyledPaper elevation={6} style={{ animation: 'fadeInRight 1.2s cubic-bezier(.39,.575,.565,1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, justifyContent: 'center' }}>
                            <EmojiEventsIcon sx={{ color: '#ff9800', fontSize: 40 }} />
                            <StyledTitle style={{ color: '#2575fc', fontSize: 30 }}>
                              مرحبا بك في نظام إدارة المدرسة
                            </StyledTitle>
                        </div>
                        <StyledText style={{ fontSize: 18, marginBottom: 16, color: '#333', fontWeight: 600 }}>
                            منصة عصرية لإدارة جميع شؤون المدرسة من مكان واحد.
                        </StyledText>
                        <Grid container spacing={2} justifyContent="center" sx={{ marginBottom: 2 }}>
                            <Grid item xs={12} sm={4}>
                                <FeatureCard style={{ animation: 'fadeInUp 1s 0.2s both' }}>
                                    <GroupsIcon sx={{ color: '#6a11cb', fontSize: 34, marginBottom: 1 }} />
                                    <FeatureTitle style={{ color: '#6a11cb' }}>إدارة الفصول</FeatureTitle>
                                    <FeatureDesc>تنظيم الطلاب والمعلمين حسب الصفوف بسهولة ومرونة.</FeatureDesc>
                                </FeatureCard>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FeatureCard style={{ animation: 'fadeInUp 1s 0.4s both' }}>
                                    <SchoolIcon sx={{ color: '#43a047', fontSize: 34, marginBottom: 1 }} />
                                    <FeatureTitle style={{ color: '#43a047' }}>تتبع الحضور</FeatureTitle>
                                    <FeatureDesc> تسجيل الحضور والغياب ومتابعة انتظام الطلاب أثتاء الدراسة.</FeatureDesc>
                                </FeatureCard>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FeatureCard style={{ animation: 'fadeInUp 1s 0.6s both' }}>
                                    <EmojiEventsIcon sx={{ color: '#ff9800', fontSize: 34, marginBottom: 1 }} />
                                    <FeatureTitle style={{ color: '#ff9800' }}>تقييم الأداء</FeatureTitle>
                                    <FeatureDesc>إدارة الدرجات وتقديم الملاحظات الخاصة بالطلاب بسهولة.</FeatureDesc>
                                </FeatureCard>
                            </Grid>
                        </Grid>
                        <StyledBox>
                            <StyledLink to="/choose">
                                <LightPurpleButton variant="contained" fullWidth style={{ fontSize: 20, padding: '12px 0', borderRadius: 30, boxShadow: '0 2px 8px #6a11cb55', background: 'linear-gradient(90deg,#2575fc,#6a11cb)', color: '#fff', fontWeight: 700, letterSpacing: 1, transition: 'transform 0.18s' }}
                                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.04)'}
                                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                                     دخول النظام 
                                </LightPurpleButton>
                            </StyledLink>
                            <StyledText style={{ marginTop: 10, color: '#444', fontWeight: 500 }}>
                                ليس لديك حساب؟{' '}
                                <Link to="/Adminregister" style={{ color: "#6a11cb", fontWeight: 700 }}>
                                    انشاء حساب جديد
                                </Link>
                            </StyledText>
                        </StyledBox>
                        <div style={{ marginTop: 18, color: '#888', fontSize: 15, textAlign: 'center' }}>
                            <span style={{ fontWeight: 700, color: '#2575fc' }}>جديد:</span> تواصل مباشر مع الإدارة، تقارير حضور متقدمة، إشعارات فورية للطلاب والمعلمين.
                        </div>
                    </StyledPaper>
                </Grid>
            </Grid>
            {/* مؤثرات حركة للبطاقات والعناصر */}
            <style>{`
            @keyframes fadeInLeft {
                0% { opacity: 0; transform: translateX(-50px) scale(0.98); }
                100% { opacity: 1; transform: translateX(0) scale(1); }
            }
            @keyframes fadeInRight {
                0% { opacity: 0; transform: translateX(50px) scale(0.98); }
                100% { opacity: 1; transform: translateX(0) scale(1); }
            }
            @keyframes fadeInUp {
                0% { opacity: 0; transform: translateY(30px) scale(0.98); }
                100% { opacity: 1; transform: translateY(0) scale(1); }
            }
            `}</style>
        </StyledContainer>
    );
};

export default Homepage;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  direction: rtl;
`;

const StyledPaper = styled.div`
  padding: 24px;
  height: 100vh;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  gap: 16px;
  padding: 24px;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  color: #252525;
  font-family: "Manrope";
  font-weight: bold;
  padding-top: 0;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledText = styled.p`
  color: #550080; 
  margin-top: 30px;
  margin-bottom: 30px; 
  letter-spacing: normal;
  line-height: normal;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color:rgb(45, 13, 56);
`;

const FeatureCard = styled.div`
  background: rgba(255,255,255,0.75);
  border-radius: 18px;
  box-shadow: 0 2px 12px #19118b11;
  padding: 18px 10px 14px 10px;
  margin: 0 6px;
  text-align: center;
  min-height: 120px;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.06);
    box-shadow: 0 4px 24px #6a11cb33;
  }
`;

const FeatureTitle = styled.div`
  font-weight: 800;
  color: #19118b;
  font-size: 18px;
  margin-bottom: 3px;
`;

const FeatureDesc = styled.div`
  color: #444;
  font-size: 15px;
`;
