import React from 'react'
import styled from 'styled-components';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';

const TeacherProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) { console.log(response) }
  else if (error) { console.log(error) }

  const teachSclass = currentUser.teachSclass
  const teachSubject = currentUser.teachSubject
  const teachSchool = currentUser.school

  return (
    <>
      <ProfileCard>
        <Box display="flex" flexDirection="column" alignItems="center" p={2}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: '#1976d2', mb: 2 }}>
            <PersonIcon sx={{ fontSize: 50 }} />
          </Avatar>
          <ProfileCardContent>
            <ProfileText variant="h6">الأسم: {currentUser.name}</ProfileText>
            <ProfileText variant="h6">البريد الألكتروني: {currentUser.email}</ProfileText>
            <ProfileText variant="h6">الفصل: {teachSclass.sclassName}</ProfileText>
            <ProfileText variant="h6">المادة: {teachSubject.subName}</ProfileText>
            <ProfileText variant="h6">المدرسة: {teachSchool.schoolName}</ProfileText>
          </ProfileCardContent>
        </Box>
      </ProfileCard>
    </>
  )
}

export default TeacherProfile

const ProfileCard = styled(Card)`
  margin: 32px auto;
  width: 420px;
  border-radius: 16px;
  box-shadow: 0 6px 24px rgba(21, 101, 192, 0.08);
`;

const ProfileCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ProfileText = styled(Typography)`
  margin: 8px 0;
  font-weight: 500;
`;