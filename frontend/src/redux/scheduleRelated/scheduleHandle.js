import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

// تعريف الحالة الأولية للجدول الزمني
const initialState = {
  schedule: [],
  loading: false,
  error: null,
};

// Slice للجدول الزمني
const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    getScheduleRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getScheduleSuccess(state, action) {
      state.loading = false;
      state.schedule = action.payload;
    },
    getScheduleFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getScheduleRequest,
  getScheduleSuccess,
  getScheduleFailure,
} = scheduleSlice.actions;

export default scheduleSlice.reducer;

// دالة لجلب الجدول الزمني لصف معين
export const fetchScheduleByClass = (classId) => async (dispatch) => {
  dispatch(getScheduleRequest());
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/Schedule/${classId}`);
    dispatch(getScheduleSuccess(response.data));
  } catch (error) {
    dispatch(getScheduleFailure(error.message));
  }
};

// دالة لإضافة حصة جديدة
export const addScheduleItem = (data) => async (dispatch) => {
  dispatch(getScheduleRequest());
  try {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/Schedule`, data);
    // بعد الإضافة الناجحة، لا حاجة لإرسال getScheduleSuccess هنا لأننا سنجلب الجدول مجددًا في الصفحة
    return true;
  } catch (error) {
    dispatch(getScheduleFailure(error.message));
    return false;
  }
};

// دالة لتعديل الحصة
export const updateScheduleItem = (id, updatedData) => async (dispatch) => {
  dispatch(getScheduleRequest());
  try {
    await axios.put(`${process.env.REACT_APP_BASE_URL}/Schedule/${id}`, updatedData);
    return true;
  } catch (error) {
    dispatch(getScheduleFailure(error.message));
    return false;
  }
};

// دالة لحذف الحصة
export const deleteScheduleItem = (id) => async (dispatch) => {
  dispatch(getScheduleRequest());
  try {
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/Schedule/${id}`);
    return true;
  } catch (error) {
    dispatch(getScheduleFailure(error.message));
    return false;
  }
};
