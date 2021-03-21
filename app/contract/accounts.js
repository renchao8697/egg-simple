'use strict';

module.exports = {
  createAccountBook: {
    // id: { type: 'string', require: true },
    // createdAt: { type: 'dateTime', require: true },
    amount: { type: 'int', require: true },
    date: { type: 'date', require: true },
    status: { type: 'enum', values: [ '1', '2', '3', '4', '5', '6', '7', '8', '9' ], require: true },
    desc: { type: 'string' },
  },
};
