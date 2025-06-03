const mongoose = require('mongoose');

console.log('بدأ اختبار الاتصال بقاعدة البيانات...');

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', () => {
  console.log('تم الاتصال بقاعدة البيانات بنجاح');
  process.exit(0);
});

mongoose.connection.on('error', err => {
  console.error('خطأ في الاتصال بقاعدة البيانات:', err);
  process.exit(1);
});
