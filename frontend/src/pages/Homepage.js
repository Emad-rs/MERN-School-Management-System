import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button } from '@mui/material';
import styled from 'styled-components';
import Students from "../assets/students.svg";
import { LightPurpleButton } from '../components/buttonStyles';

const Homepage = () => {
    return (
        <StyledContainer>
            <Grid container spacing={0}>
                <Grid item xs={12} md={6}>
                    <img src={Students} alt="students" style={{ width: '100%' }} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <StyledPaper elevation={3}>
                        <StyledTitle>
                        مرحبا بك 
                            <br />
                            في نظام 
                            <br />
                            إدارة المدرسة
                        </StyledTitle>
                        <StyledText>
                        نظام إدارة المدرسة، تنظيم الفصول، وإضافة الطلاب وأعضاء هيئة التدريس.
تتبع الحضور بسلاسة، تقييم الأداء وتقديم الملاحظات.
الوصول إلى السجلات، عرض الدرجات، والتواصل بسهولة.
                        </StyledText>
                        <StyledBox>
                            <StyledLink to="/choose">
                                <LightPurpleButton variant="contained" fullWidth>
                                    تسجيل الدخول
                                </LightPurpleButton>
                            </StyledLink>
                            
                            <StyledText>
                                ليس لديك حساب؟{' '}
                                <Link to="/Adminregister" style={{color:"#550080"}}>
                                    انشاء حساب جديد
                                </Link>
                            </StyledText>
                        </StyledBox>
                    </StyledPaper>
                </Grid>
            </Grid>
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
  color:rgb(28, 2, 37);
`;
