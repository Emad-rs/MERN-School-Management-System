import React from 'react'
import { Card, CardContent, Typography, Box, TextField, Button, Snackbar, Alert } from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { useState } from 'react';

const TeacherComplain = () => {
  const [complain, setComplain] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setComplain("");
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ p: 4, borderRadius: 3, boxShadow: 3, minWidth: 400, background: 'linear-gradient(135deg, #fff3e0 0%, #fafcff 100%)' }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <ReportProblemIcon sx={{ fontSize: 40, color: '#ff9800', mb: 1 }} />
          <Typography variant="h5" color="#ff9800" fontWeight="bold">تقديم شكوى</Typography>
        </Box>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="اكتب الشكوى هنا"
              multiline
              minRows={4}
              fullWidth
              value={complain}
              onChange={(e) => setComplain(e.target.value)}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="warning" fullWidth disabled={!complain.trim()}>
              إرسال الشكوى
            </Button>
          </form>
        </CardContent>
        <Snackbar open={success} autoHideDuration={2000} onClose={() => setSuccess(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
            تم إرسال الشكوى بنجاح!
          </Alert>
        </Snackbar>
      </Card>
    </Box>
  );
}

export default TeacherComplain;