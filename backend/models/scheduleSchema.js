const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
    enum: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس']
  },
  period: {
    type: Number, // 1 = الأولى, 2 = الثانية, ...
    required: true,
    min: 1,
    max: 6
  },
  subject: {
    type: String,
    required: true
  },
  sclass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sclass',
    required: true
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  }
});

module.exports = mongoose.model('Schedule', scheduleSchema);
