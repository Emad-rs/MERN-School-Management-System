const Schedule = require('../models/scheduleSchema.js');

// جلب جدول صف معين
const getScheduleByClass = async (req, res) => {
  try {
    const { sclassId } = req.params;
    const schedule = await Schedule.find({ sclass: sclassId });
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ message: 'خطأ في جلب الجدول', error: err });
  }
};

// إضافة حصة للجدول
const addScheduleItem = async (req, res) => {
  console.log('تم استقبال طلب إضافة:', req.body); // لعرض البيانات المستقبلة
  try {
    const { day, period, subject, sclass, school } = req.body;
    // تحقق من وجود جميع الحقول المطلوبة
    if (!day || !period || !subject || !sclass || !school) {
      return res.status(400).json({ message: 'يجب تعبئة جميع الحقول المطلوبة' });
    }
    const newItem = new Schedule({ day, period, subject, sclass, school });
    await newItem.save();
    console.log('تم حفظ الحصة في قاعدة البيانات:', newItem); // تأكيد الحفظ
    res.json(newItem);
  } catch (err) {
    console.error('خطأ في إضافة الحصة:', err);
    res.status(500).json({ message: 'خطأ في إضافة الحصة', error: err });
  }
};

// تعديل حصة
const updateScheduleItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { day, period, subject } = req.body;
    const updated = await Schedule.findByIdAndUpdate(
      id,
      { $set: { day, period, subject } },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'خطأ في تعديل الحصة', error: err });
  }
};

// حذف حصة
const deleteScheduleItem = async (req, res) => {
  try {
    const { id } = req.params;
    await Schedule.findByIdAndDelete(id);
    res.json({ message: 'تم حذف الحصة بنجاح' });
  } catch (err) {
    res.status(500).json({ message: 'خطأ في حذف الحصة', error: err });
  }
};

module.exports = {
  getScheduleByClass,
  addScheduleItem,
  updateScheduleItem,
  deleteScheduleItem,
};
