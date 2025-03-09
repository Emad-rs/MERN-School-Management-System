import React, { useState } from 'react';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/userRelated/userHandle';
import { useNavigate } from 'react-router-dom';
import { Button, Collapse } from '@mui/material';

const AdminProfile = () => {
    const [showTab, setShowTab] = useState(false);
    const buttonText = showTab ? 'إلغاء' : 'تعديل الملف الشخصي';

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const address = "Admin";

    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [password, setPassword] = useState("");
    const [schoolName, setSchoolName] = useState(currentUser.schoolName);

    const fields = password === "" ? { name, email, schoolName } : { name, email, password, schoolName };

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(updateUser(fields, currentUser._id, address));
    };

    return (
        <div>
            <p><strong>الاسم:</strong> {currentUser.name}</p>
            <p><strong>البريد الإلكتروني:</strong> {currentUser.email}</p>
            <p><strong>المدرسة:</strong> {currentUser.schoolName}</p>

            <Button variant="contained" sx={styles.attendanceButton} onClick={() => setShowTab(!showTab)}>
                {showTab ? <KeyboardArrowUp /> : <KeyboardArrowDown />} {buttonText}
            </Button>

            <Collapse in={showTab} timeout="auto" unmountOnExit>
                <div className="register">
                    <form className="registerForm" onSubmit={submitHandler}>
                        <span className="registerTitle">تعديل التفاصيل</span>

                        <label>الاسم</label>
                        <input
                            className="registerInput"
                            type="text"
                            placeholder="أدخل اسمك..."
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            autoComplete="name"
                            required
                        />

                        <label>اسم المدرسة</label>
                        <input
                            className="registerInput"
                            type="text"
                            placeholder="أدخل اسم مدرستك..."
                            value={schoolName}
                            onChange={(event) => setSchoolName(event.target.value)}
                            autoComplete="organization"
                            required
                        />

                        <label>البريد الإلكتروني</label>
                        <input
                            className="registerInput"
                            type="email"
                            placeholder="أدخل بريدك الإلكتروني..."
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            autoComplete="email"
                            required
                        />

                        <label>كلمة المرور</label>
                        <input
                            className="registerInput"
                            type="password"
                            placeholder="أدخل كلمة المرور..."
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            autoComplete="new-password"
                        />

                        <button className="registerButton" type="submit">تحديث</button>
                    </form>
                </div>
            </Collapse>
        </div>
    );
};

export default AdminProfile;

const styles = {
    attendanceButton: {
        backgroundColor: "#270843",
        "&:hover": {
            backgroundColor: "#3f1068",
        }
    }
};