import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, Stack, TextField, CircularProgress } from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import Popup from '../../components/Popup';
import { BlueButton } from '../../components/buttonStyles';
import { addStuff } from '../../redux/userRelated/userHandle';
import { useDispatch, useSelector } from 'react-redux';

const StudentComplain = () => {
    const [complaint, setComplaint] = useState("");
    const [date, setDate] = useState("");

    const dispatch = useDispatch()

    const { status, currentUser, error } = useSelector(state => state.user);

    const user = currentUser._id
    const school = currentUser.school._id
    const address = "Complain"

    const [loader, setLoader] = useState(false)
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = {
        user,
        date,
        complaint,
        school,
    };

    const submitHandler = (event) => {
        event.preventDefault()
        setLoader(true)
        dispatch(addStuff(fields, address))
    };

    useEffect(() => {
        if (status === "added") {
            setLoader(false)
            setShowPopup(true)
            setMessage("تمت العملية بنجاح")
        }
        else if (error) {
            setLoader(false)
            setShowPopup(true)
            setMessage("فشل الاتصال بالانترنت")
        }
    }, [status, error])

    return (
        <>
            <Box sx={{ flex: '1 1 auto', alignItems: 'center', display: 'flex', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #e3f0ff 0%, #fafcff 100%)' }}>
                <Card sx={{ maxWidth: 550, width: '100%', p: 3, borderRadius: 3, boxShadow: 3 }}>
                    <CardContent>
                        <Box display="flex" alignItems="center" gap={2} mb={2}>
                            <ReportProblemIcon sx={{ fontSize: 32, color: '#d32f2f' }} />
                            <Typography variant="h5" color="#d32f2f" fontWeight="bold">تقديم شكوى</Typography>
                        </Box>
                        <form onSubmit={submitHandler}>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    label="حدد التاريخ"
                                    type="date"
                                    value={date}
                                    onChange={(event) => setDate(event.target.value)} required
                                    InputLabelProps={{ shrink: true }}
                                />
                                <TextField
                                    fullWidth
                                    label="اكتب الشكوى هنا"
                                    multiline
                                    rows={4}
                                    value={complaint}
                                    onChange={(event) => setComplaint(event.target.value)}
                                    required
                                />
                                <Box display="flex" justifyContent="flex-end">
                                    <BlueButton type="submit" variant="contained" disabled={loader}>
                                        {loader ? <CircularProgress size={24} color="inherit" /> : 'إرسال الشكوى'}
                                    </BlueButton>
                                </Box>
                            </Stack>
                        </form>
                        {showPopup && <Popup message={message} onClose={() => setShowPopup(false)} />}
                    </CardContent>
                </Card>
            </Box>
        </>
    );
};

export default StudentComplain;