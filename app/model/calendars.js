'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const { Schema } = mongoose;
  const CalendarSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, require: true },
    date: { type: String, require: true, unique: true },
    morning: Boolean,
    listen: Boolean,
    English: Boolean,
    algorithm: Boolean,
    interview: Boolean,
    code: Boolean,
    read: Boolean,
    sport: Boolean,
  });

  return mongoose.model('Calendar', CalendarSchema);
};
