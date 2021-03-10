'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const { Schema } = mongoose;
  const AccountBookSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, require: true },
    createdAt: { type: Date, default: Date.now },
    amount: { type: Number, require: true },
    date: { type: Date, require: true },
    status: { type: String, require: true },
    desc: { type: String },
  });

  return mongoose.model('AccountBook', AccountBookSchema);
};
