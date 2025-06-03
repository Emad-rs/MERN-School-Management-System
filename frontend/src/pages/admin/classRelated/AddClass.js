import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Stack, TextField } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { updateClass, getClassDetails } from '../../../redux/sclassRelated/sclassHandle';
import Popup from "../../../components/Popup";
import Classroom from "../../../assets/classroom.png";
import styled from "styled-components";
import AdminMainButton from '../../../components/AdminMainButton';

const AddClass = ({ editMode }) => {
    const [sclassName, setSclassName] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams();
    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error, tempDetails } = userState;
    const adminID = currentUser._id
    const address = "Sclass"
    const [loader, setLoader] = useState(false)
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    // جلب بيانات الصف عند التعديل
    useEffect(() => {
        if (editMode && params.id) {
            dispatch(getClassDetails(params.id, "Sclass"));
        }
    }, [editMode, params.id, dispatch]);
    // تعبئة الحقول عند التعديل
    const sclassDetails = useSelector(state => state.sclass?.sclassDetails);
    useEffect(() => {
        if (editMode && sclassDetails && sclassDetails.sclassName) {
            setSclassName(sclassDetails.sclassName);
        }
    }, [editMode, sclassDetails]);
    const fields = {
        sclassName,
        adminID,
        ...(editMode && params.id ? { _id: params.id } : {})
    };
    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        if (editMode && params.id) {
            dispatch(updateClass(params.id, fields, "Sclass"))
                .then((action) => {
                    if (action && action.type && action.type.includes('failed')) {
                        setLoader(false);
                        setMessage('فشل في تعديل الصف.');
                        setShowPopup(true);
                    } else {
                        setMessage('تم تعديل الصف بنجاح.');
                        setShowPopup(true);
                        setTimeout(() => {
                            navigate("/Admin/classes/class/" + params.id);
                            setLoader(false);
                        }, 1200);
                    }
                });
        } else {
            dispatch(addStuff(fields, address)).then((action) => {
                console.log('رد السيرفر عند إضافة صف:', action);
                if (action && action.type && action.type.includes('authFailed')) {
                    setLoader(false);
                    setMessage('فشل في إنشاء الصف. ربما الاسم مستخدم مسبقاً.');
                    setShowPopup(true);
                } else if (action && action.payload && action.payload._id) {
                    // تم إنشاء الصف بنجاح وسيتم التوجيه في useEffect
                } else if (action && action.payload && !action.payload._id) {
                    setLoader(false);
                    setMessage('لم يتم إنشاء الصف فعليًا. تحقق من البيانات أو تواصل مع الدعم.');
                    setShowPopup(true);
                }
            });
        }
    };
    useEffect(() => {
        if (!editMode) {
            if (status === 'added' && tempDetails && tempDetails._id) {
                navigate("/Admin/classes/class/" + tempDetails._id);
                dispatch(underControl());
                setLoader(false);
            } else if (status === 'added' && (!tempDetails || !tempDetails._id)) {
                setMessage('تم إنشاء الصف بنجاح. سيتم تحديث القائمة.');
                setShowPopup(true);
                setTimeout(() => {
                    navigate("/Admin/classes");
                    dispatch(underControl());
                    setLoader(false);
                }, 1200);
            } else if (status === 'failed') {
                setMessage(response);
                setShowPopup(true);
                setLoader(false);
            } else if (status === 'error') {
                setMessage("لايوجد انترنت");
                setShowPopup(true);
                setLoader(false);
            }
        }
    }, [status, navigate, error, response, dispatch, tempDetails, editMode]);
    return (
        <>
            <StyledContainer>
                <StyledBox>
                    <Stack sx={{
                        alignItems: 'right',
                        mb: 3
                    }}>
                        <img
                            src={Classroom}
                            alt="classroom"
                            style={{ width: '80%' }}
                        />
                    </Stack>
                    <form onSubmit={submitHandler}>
                        <Stack spacing={3}>
                            <TextField
                                label={editMode ? "تعديل اسم الصف" : "انشاء فصل"}
                                variant="outlined"
                                value={sclassName}
                                onChange={(event) => {
                                    setSclassName(event.target.value);
                                }}
                                required
                            />
                            <AdminMainButton type="submit" disabled={loader} startIcon={loader ? <CircularProgress size={24} color="inherit" /> : null}>
                                {loader ? (editMode ? 'جاري التعديل...' : 'جاري الإنشاء...') : (editMode ? 'تعديل' : 'إنشاء')}
                            </AdminMainButton>
                            <Button variant="outlined" onClick={() => navigate(-1)}>
                                الرجوع للخلف
                            </Button>
                        </Stack>
                    </form>
                </StyledBox>
            </StyledContainer>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    )
}

export default AddClass

const StyledContainer = styled(Box)`
  flex: 1 1 auto;
  align-items: right;
  display: flex;
  justify-content: right;
`;

const StyledBox = styled(Box)`
  max-width: 550px;
  padding: 50px 3rem 50px;
  margin-top: 1rem;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border: 1px solid #ccc;
  border-radius: 4px;
`;