const db = require('../db');
const Sequelize = require('sequelize');
const { STRING } = Sequelize;

const Message = db.define('message', {
  content: {
    type: STRING(1000)
  },
  date: {
    type: STRING
  },
});

module.exports = Message;
