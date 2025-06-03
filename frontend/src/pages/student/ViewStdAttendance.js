import React, { useEffect, useState } from 'react'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Card, Typography, Box, BottomNavigation, BottomNavigationAction, Table, TableHead, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../components/attendanceCalculator';

import CustomBarChart from '../../components/CustomBarChart'

import PieChartIcon from '@mui/icons-material/PieChart';
import TableChartIcon from '@mui/icons-material/TableChart';
import { StyledTableCell, StyledTableRow } from '../../components/styles';

const ViewStdAttendance = () => {
    const dispatch = useDispatch();

    const [openStates, setOpenStates] = useState({});

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    const { userDetails, currentUser, response, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id]);

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails])

    const attendanceBySubject = groupAttendanceBySubject(subjectAttendance)

    const subjectData = Object.entries(attendanceBySubject).map(([subName, { subCode, present, sessions }]) => {
        const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
        return {
            subject: subName,
            attendancePercentage: subjectAttendancePercentage,
            totalClasses: sessions,
            attendedClasses: present
        };
    });

    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const renderTableSection = () => {
        return (
            <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3, mb: 3 }}>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <TableChartIcon sx={{ fontSize: 32, color: '#1976d2' }} />
                    <Typography variant="h5" color="#1976d2" fontWeight="bold">جدول الحضور</Typography>
                </Box>
                <Table>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>المادة</StyledTableCell>
                            <StyledTableCell>حاضر</StyledTableCell>
                            <StyledTableCell>إجمالي الحصص</StyledTableCell>
                            <StyledTableCell>نسبةالحضور</StyledTableCell>
                            <StyledTableCell align="center">الاجراءات</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    {Object.entries(attendanceBySubject).map(([subName, { present, allData, subId, sessions }], index) => {
                        const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
                        return (
                            <StyledTableRow key={index}>
                                <StyledTableCell>{subName}</StyledTableCell>
                                <StyledTableCell>{present}</StyledTableCell>
                                <StyledTableCell>{sessions}</StyledTableCell>
                                <StyledTableCell>{subjectAttendancePercentage}%</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button
                                        size="small"
                                        onClick={() => handleOpen(subId)}
                                        endIcon={openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                    >
                                        تفاصيل
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        );
                    })}
                </Table>
            </Card>
        );
    };

    const renderChartSection = () => {
        return (
            <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3, mb: 3 }}>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <PieChartIcon sx={{ fontSize: 32, color: '#0288d1' }} />
                    <Typography variant="h5" color="#0288d1" fontWeight="bold">رسم بياني للحضور</Typography>
                </Box>
                <CustomBarChart chartData={subjectData} dataKey="attendancePercentage" />
            </Card>
        );
    };

    return (
        <Box sx={{ mt: 4, mb: 4 }}>
            <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, mb: 3, background: 'linear-gradient(135deg, #e3f0ff 0%, #fafcff 100%)' }}>
                <Box display="flex" alignItems="center" gap={2}>
                    <PieChartIcon sx={{ fontSize: 32, color: '#1976d2' }} />
                    <Typography variant="h5" color="#1976d2" fontWeight="bold">حضور الطالب</Typography>
                </Box>
            </Card>
            <BottomNavigation
                showLabels
                value={selectedSection}
                onChange={handleSectionChange}
                sx={{ mb: 3, borderRadius: 2, boxShadow: 1 }}
            >
                <BottomNavigationAction label="جدول الحضور" value="table" icon={<TableChartIcon />} />
                <BottomNavigationAction label="رسم بياني" value="chart" icon={<PieChartIcon />} />
            </BottomNavigation>
            {selectedSection === 'table' && renderTableSection()}
            {selectedSection === 'chart' && renderChartSection()}
        </Box>
    );
}

export default ViewStdAttendance