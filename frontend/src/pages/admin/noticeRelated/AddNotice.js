import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress } from '@mui/material';
import Popup from '../../../components/Popup';
import AdminMainButton from '../../../components/AdminMainButton';

const AddNotice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, response, error } = useSelector(state => state.user);
  const { currentUser } = useSelector(state => state.user);

  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');
  const adminID = currentUser._id

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const fields = { title, details, date, adminID };
  const address = "Notice"

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === 'added') {
      navigate('/Admin/notices');
      dispatch(underControl())
    } else if (status === 'error') {
      setMessage("Network Error")
      setShowPopup(true)
      setLoader(false)
    }
  }, [status, navigate, error, response, dispatch]);

  return (
    <>
      <div className="register">
        <form className="registerForm" onSubmit={submitHandler}>
          <span className="registerTitle">إضافة ملاحظة</span>
          <label>عنوان الملاحظة</label>
          <input className="registerInput" type="text" placeholder="أدخل عنوان الملاحظة..."
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required />

          <label>التفاصيل</label>
          <input className="registerInput" type="text" placeholder="أدخل تفاصيل الملاحظة..."
            value={details}
            onChange={(event) => setDetails(event.target.value)}
            required />

          <label>التاريخ</label>
          <input className="registerInput" type="date" placeholder="أدخل تاريخ الملاحظة..."
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required />

          <AdminMainButton type="submit" disabled={loader} startIcon={loader ? <CircularProgress size={24} color="inherit" /> : null}>
            {loader ? 'جاري الإضافة...' : 'إضافة'}
          </AdminMainButton>
        </form>
      </div>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default AddNotice;