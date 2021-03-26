const db = require('../db')
const Sequelize = require('sequelize')
const { STRING, INTEGER, BOOLEAN, DATE, BIGINT } = Sequelize;

const Game = db.define('game', {
    winner: { 
      type: STRING, 
    },  
    finalScore: { 
      type: STRING, 
    },
    // this should not be necessary, but seems like a nice safety measure for the moment
    done:{
      type:BOOLEAN,
      defaultValue: false
    },
    open: {
      type: BOOLEAN,
      defaultValue: true
    },
    // this will need to be changed starting off really restirctive to  make testing
    // easier will need to replaced with LAT, LONG I assume
    location: {  
      type: STRING 
    },
    time: { 
      type: BIGINT
    },
    dateAndTime: {
      type: DATE
    },
    host: {
      type: STRING
    },
    maxPlayerCount: {
      type: INTEGER,
      defaultValue: 2
    }
      
  },{ timestamps: false });  

  // setting milliseconds to time 
  Game.beforeCreate(game => {
    if(game.dateAndTime){
      game.time = game.dateAndTime.getTime();
    }
  });

module.exports = Game;
