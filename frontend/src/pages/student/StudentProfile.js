import React from 'react'
import styled from 'styled-components';
import { Card, CardContent, Typography, Grid, Box, Avatar, Container, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import FaceIcon from '@mui/icons-material/Face';

const StudentProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) { console.log(response) }
  else if (error) { console.log(error) }

  const sclassName = currentUser.sclassName
  const studentSchool = currentUser.school

  return (
    <>
      <Container maxWidth="md">
        <StyledPaper elevation={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                <Avatar sx={{ width: 120, height: 120, bgcolor: '#1976d2', mb: 2 }}>
                  <FaceIcon sx={{ fontSize: 70 }} />
                </Avatar>
                <Typography variant="h5" component="h2" textAlign="center" fontWeight="bold">
                  {currentUser.name}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p" textAlign="center">
                رقم قيد الطالب: {currentUser.rollNum}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p" textAlign="center">
                الصف: {sclassName.sclassName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p" textAlign="center">
                المدرسة: {studentSchool.schoolName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p" textAlign="center">
                البريد الألكتروني: {currentUser.email}
              </Typography>
            </Grid>
          </Grid>
        </StyledPaper>
        <Card sx={{ mt: 4, borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              البيانات الشخصية
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p">
                  <strong>تاريخ الميلاد:</strong> ---
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p">
                  <strong>الجنس:</strong> ---
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p">
                  <strong>رقم الهاتف:</strong> ---
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}

export default StudentProfile

const StyledPaper = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
`;