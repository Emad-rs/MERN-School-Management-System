import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import CustomBarChart from '../../components/CustomBarChart'

import TableChartIcon from '@mui/icons-material/TableChart';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BarChartIcon from '@mui/icons-material/BarChart';
import { StyledTableCell, StyledTableRow } from '../../components/styles';
import { Card, Typography, Box, BottomNavigation, BottomNavigationAction, Container, Table, TableBody, TableHead } from '@mui/material';

const StudentSubjects = () => {

    const dispatch = useDispatch();
    const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id])

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [subjectMarks, setSubjectMarks] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');

    useEffect(() => {
        if (userDetails) {
            setSubjectMarks(userDetails.examResult || []);
        }
    }, [userDetails])

    useEffect(() => {
        if (subjectMarks.length === 0) {
            dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
        }
    }, [subjectMarks, dispatch, currentUser.sclassName._id]);

    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const renderTableSection = () => {
        return (
            <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3, mb: 3 }}>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <TableChartIcon sx={{ fontSize: 32, color: '#1976d2' }} />
                    <Typography variant="h5" color="#1976d2" fontWeight="bold">درجات المواد</Typography>
                </Box>
                <Table>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>المادة</StyledTableCell>
                            <StyledTableCell>درجات</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {subjectMarks.map((result, index) => {
                            if (!result.subName || !result.marksObtained) {
                                return null;
                            }
                            return (
                                <StyledTableRow key={index}>
                                    <StyledTableCell>{result.subName.subName}</StyledTableCell>
                                    <StyledTableCell>{result.marksObtained}</StyledTableCell>
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Card>
        );
    };

    const renderChartSection = () => {
        return (
            <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3, mb: 3 }}>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <BarChartIcon sx={{ fontSize: 32, color: '#0288d1' }} />
                    <Typography variant="h5" color="#0288d1" fontWeight="bold">رسم بياني للدرجات</Typography>
                </Box>
                <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
            </Card>
        );
    };

    const renderClassDetailsSection = () => {
        return (
            <Container>
                <Typography variant="h4" align="center" gutterBottom>
                    بيانات الصف
                </Typography>
                <Typography variant="h5" gutterBottom>
                    أنت الان في الصف {sclassDetails && sclassDetails.sclassName}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    ومواده هي:
                </Typography>
                {subjectsList &&
                    subjectsList.map((subject, index) => (
                        <div key={index}>
                            <Typography variant="subtitle1">
                                {subject.subName} ({subject.subCode})
                            </Typography>
                        </div>
                    ))}
            </Container>
        );
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, mb: 3, background: 'linear-gradient(135deg, #e3f0ff 0%, #fafcff 100%)' }}>
                <Box display="flex" alignItems="center" gap={2}>
                    <MenuBookIcon sx={{ fontSize: 32, color: '#1976d2' }} />
                    <Typography variant="h5" color="#1976d2" fontWeight="bold">مواد الطالب</Typography>
                </Box>
            </Card>
            {loading ? (
                <div>جاري التحميل...</div>
            ) : (
                <div>
                    {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0
                        ?
                        (<>
                            <BottomNavigation
                                showLabels
                                value={selectedSection}
                                onChange={handleSectionChange}
                                sx={{ mb: 3, borderRadius: 2, boxShadow: 1 }}
                            >
                                <BottomNavigationAction label="جدول الدرجات" value="table" icon={<TableChartIcon />} />
                                <BottomNavigationAction label="رسم بياني" value="chart" icon={<BarChartIcon />} />
                            </BottomNavigation>
                            {selectedSection === 'table' && renderTableSection()}
                            {selectedSection === 'chart' && renderChartSection()}
                        </>)
                        :
                        (<>
                            {renderClassDetailsSection()}
                        </>)
                    }
                </div>
            )}
        </Container>
    );
};

export default StudentSubjects;