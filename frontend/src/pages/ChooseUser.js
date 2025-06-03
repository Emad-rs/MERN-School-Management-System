import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { AccountCircle, School, Group } from '@mui/icons-material';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Popup from '../components/Popup';

const ChooseUser = ({ visitor }) => {
  const navigate = useNavigate()

  const { status, currentUser, currentRole } = useSelector(state => state.user);;

  const [loader, setLoader] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

   const navigateHandler = (user) => {
    if (user === "Admin") {
      navigate('/Adminlogin');
  }
  else if (user === "Student") {
      navigate('/Studentlogin');
  }
  else if (user === "Teacher") {
      navigate('/Teacherlogin');
  }
 
   }

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      }
      else if (currentRole === 'Student') {
        navigate('/Student/dashboard');
      } else if (currentRole === 'Teacher') {
        navigate('/Teacher/dashboard');
      }
    }
    else if (status === 'error') {
      setLoader(false)
      setMessage("Network Error")
      setShowPopup(true)
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <StyledContainer>
      {/* شعار المدرسة ونص ترحيبي في الأعلى ووسط الصفحة */}
      <div
        style={{
          textAlign: 'center',
          margin: '0 auto',
          marginTop: 30,
          marginBottom: 36,
          maxWidth: 600,
          position: 'absolute',
          left: '50%',
          top: 0,
          transform: 'translateX(-50%)',
          zIndex: 2,
          background: 'rgba(255,255,255,0.20)',
          borderRadius: 24,
          boxShadow: '0 8px 32px 0 rgba(31,38,135,0.15)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.18)',
          padding: '32px 16px 20px 16px',
          animation: 'fadeInDown 1s cubic-bezier(.39,.575,.565,1)'
        }}
      >
        {/* رمز تعبيري بديل بجانب العنوان */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 40, filter: 'drop-shadow(0 2px 8px #2575fc55)' }}>🏫</span>
          <h1
            style={{
              fontWeight: 800,
              fontSize: 38,
              margin: 0,
              letterSpacing: 2,
              background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              textShadow: '0 2px 8px #2575fc44',
              display: 'inline-block'
            }}
          >
            مرحبا بك في نظام إدارة المدرسة
          </h1>
        </div>
        <p
          style={{
            fontSize: 21,
            marginTop: 8,
            fontWeight: 500,
            color: '#333',
            textShadow: '0 1px 6px #fff8',
            letterSpacing: 1,
            marginBottom: 8
          }}
        >
          يرجى اختيار نوع الحساب الذي تريد الدخول أو التسجيل به
        </p>
        {/* نص إضافي أسفل الرسالة */}
        <div style={{ color: '#888', fontSize: 16, marginTop: 4, fontStyle: 'italic', letterSpacing: 0.5 }}>
          جميع بياناتك محمية وتخضع لسياسة الخصوصية الخاصة بالمدرسة.
        </div>
      </div>
      {/* تأثير حركة للرسالة الترحيبية */}
      <style>{`
        @keyframes fadeInDown {
          0% {
            opacity: 0;
            transform: translateY(-40px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
      <Container style={{ paddingTop: 210 }}>
        <Grid container spacing={4} justifyContent="center" alignItems="center" style={{ minHeight: '80vh' }}>
          <Grid item xs={12} sm={6} md={4}>
            <StyledPaper elevation={6} className="role-card" onClick={() => navigateHandler("Admin")}
              style={{ cursor: 'pointer', transition: 'transform 0.2s', textAlign: 'center' }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
              <Box mb={2}>
                <AccountCircle fontSize="large" style={{ color: '#673ab7', fontSize: 60 }} />
              </Box>
              <StyledTypography style={{ fontWeight: 'bold', fontSize: 22 }}>المسؤول</StyledTypography>
              <div style={{ color: '#333', marginTop: 8, fontSize: 15 }}>
                تسجيل الدخول كمسؤول لإدارة النظام بالكامل، إضافة وتعديل بيانات المدرسة، المعلمين والطلاب.
              </div>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledPaper elevation={6} className="role-card" onClick={() => navigateHandler("Student")}
              style={{ cursor: 'pointer', transition: 'transform 0.2s', textAlign: 'center' }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
              <Box mb={2}>
                <School fontSize="large" style={{ color: '#2196f3', fontSize: 60 }} />
              </Box>
              <StyledTypography style={{ fontWeight: 'bold', fontSize: 22 }}>الطالب</StyledTypography>
              <div style={{ color: '#333', marginTop: 8, fontSize: 15 }}>
                تسجيل الدخول كطالب لاستعراض الجدول الدراسي، متابعة الدرجات والتواصل مع المعلمين.
              </div>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledPaper elevation={6} className="role-card" onClick={() => navigateHandler("Teacher")}
              style={{ cursor: 'pointer', transition: 'transform 0.2s', textAlign: 'center' }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
              <Box mb={2}>
                <Group fontSize="large" style={{ color: '#4caf50', fontSize: 60 }} />
              </Box>
              <StyledTypography style={{ fontWeight: 'bold', fontSize: 22 }}>المعلم</StyledTypography>
              <div style={{ color: '#333', marginTop: 8, fontSize: 15 }}>
                تسجيل الدخول كمعلم لإدارة الحصص، متابعة الطلاب، وإضافة الدرجات والملاحظات.
              </div>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
        الرجاء الانتظار
      </Backdrop>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </StyledContainer>
  );
};

export default ChooseUser;

const StyledContainer = styled.div`
  background: linear-gradient(to bottom, #411d70, #19118b);
  height: 120vh;
  display: flex;
  justify-content: center;
  padding: 2rem;
  ؤ
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
  text-align: center;
  background-color: #1f1f38;
  color:rgba(255, 255, 255, 0.6);
  cursor:pointer;
  radius: 50px;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color:rgb(44, 154, 197);
    color:white;
  }
`;

const StyledTypography = styled.h2`
  margin-bottom: 10px;
`;