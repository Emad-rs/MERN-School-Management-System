import React from 'react'
import styled from 'styled-components';
import { Card, CardContent, Typography, Grid, Box, Avatar, Container, Paper } from '@mui/material';
import { useSelector } from 'react-redux';

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
              <Box display="flex" justifyContent="center">
                <Avatar alt="Student Avatar" sx={{ width: 150, height: 150 }}>
                  {String(currentUser.name).charAt(0)}
                </Avatar>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography variant="h5" component="h2" textAlign="center">
                  {currentUser.name}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography variant="subtitle1" component="p" textAlign="center">
                  رقم قيد الطالب: {currentUser.rollNum}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography variant="subtitle1" component="p" textAlign="center">
                  الصف: {sclassName.sclassName}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography variant="subtitle1" component="p" textAlign="center">
                  المدرسة: {studentSchool.schoolName}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </StyledPaper>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              البيانات الشخصية
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p">
                  <strong>تاريخ ميلادك:</strong> Agust 15, 1996
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p">
                  <strong>الجنس:</strong> دكر
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p">
                  <strong>البريد الألكتروني:</strong> ealtrhon96@gmail.com
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p">
                  <strong>رقم الهاتف:</strong> (218) 92-2923224
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p">
                  <strong>عنوان السكن:</strong> Tarhona,Libya
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