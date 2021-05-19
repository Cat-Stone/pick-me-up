const { db, models: { User, Game, UserGame, Message } } = require('./index');
const moment = require('moment');
const faker = require('faker');

//I am sure there us a more elegant way of doing this 

const syncAndSeed = async()=> {
  await db.sync({ force: true });
  //10 generic users
  for (let i = 1; i<= 20; i++){
    let age = Math.floor(Math.random() * 20 + 16);
    let description = faker.lorem.sentence();
    let email = "test"+i+"@email.com";
    let height = Math.ceil(Math.random() * 3 + 4) + '\'';
    let name = faker.name.firstName();
    await User.create({ age, description, email, height, name, password: '123'});
  }
  
  //4 generic open games with UserGame -- these will be open for varying minutes from start of runtime
  for (let i = 1; i<= 4; i++){
    await Game.create({location: '14973', dateAndTime: moment().add((i * 3), 'hours')._d, host: i, zipcode: '10025', long: '-73.95990891665473', lat: '40.79092207965378'});
    await UserGame.create({ userId: i, gameId: i, team: 'TEAM A' });
  }

  await UserGame.create({ userId: 2, gameId: 1, team: 'TEAM B' })
  
  //4 generic expired games with UserGame -- these will be expired at runtime
  for (let i = 5; i<= 8; i++){
    await Game.create({location: '17998', dateAndTime: moment()._d, host: i, zipcode: '10025', long: '-73.9683617998236', lat: '40.79551611458094'});
    await UserGame.create({ userId: i, gameId: i, team: 'TEAM A' });
  }

  //creating some data for user
  await User.create({ email: "MichaelJordan@gmail.com", name: 'Michael Jordan', age: 21, height:'6\'6', description: "GOAT", photo: 'https://media.gq.com/photos/5e99bf6fe5102200088e8eb2/3:4/w_1107,h_1476,c_limit/GQ-MichaelJordan-041720.jpg', password: "helloworld", })

  // an almost full game
  await Game.create({location: '17583', open: true, dateAndTime: moment().add(7, 'days')._d, maxPlayerCount: 4, host: 10, zipcode: '10019', long: '-73.9949361317764', lat: '40.76835005351661'});// adding 7 days to the game start-time to simulate a future game 
  await UserGame.create({ userId: 10, gameId: 9, team: 'TEAM A' });
  await UserGame.create({ userId: 9, gameId: 9, team: 'TEAM B' });
  // seeding an ongoing chat
  await Message.create({ content: 'Where are we meeting?', gameId: 9, userId: 10, date: moment().format() })
  await Message.create({ content: 'Court 1 by the parking lot.', gameId: 9, userId: 9, date: moment().format() })
  await Message.create({ content: 'Cool', gameId: 9, userId: 10, date: moment().format() })
  await Message.create({ content: 'Waiting on more players', gameId: 9, userId: 9, date: moment().format() })
  await Message.create({ content: 'No problem.', gameId: 9, userId: 10, date: moment().format() })
  await Message.create({ content: 'It\'l fill up quick', gameId: 9, userId: 10, date: moment().format() })

  // a finished game
  await Game.create({ winner: 'TEAM A', finalScore: '100 - 2', done: true, location: '17587', open: false, dateAndTime: moment().subtract(1, 'days')._d, host: 1, zipcode: '10019', long: '-73.99022462047117', lat: '40.76361755002875'});
  await Message.create({ content: 'Hello World!', gameId: 1, userId: 1, sender: ''})
  await UserGame.create({ userId: 1, gameId: 10, team: 'TEAM A', messageId: 1 });
  await UserGame.create({ userId: 2, gameId: 10, team: 'TEAM A'  });
  await UserGame.create({ userId: 3, gameId: 10, team: 'TEAM B'  });
  await UserGame.create({ userId: 4, gameId: 10, team: 'TEAM B'  });

  // a finished game but needs to be scored
  await Game.create({ location: '17542', open: false, dateAndTime: moment().subtract(3, 'days')._d, host: 5, zipcode: '11215', long: '-73.9854166015614', lat: '40.67244868801578' });
  await UserGame.create({ userId: 5, gameId: 11, team: 'TEAM A' });
  await UserGame.create({ userId: 6, gameId: 11, team: 'TEAM A' });
  await UserGame.create({ userId: 3, gameId: 11, team: 'TEAM B' });
  await UserGame.create({ userId: 1, gameId: 11, team: 'TEAM B'});

  // another random finished game
  await Game.create({ winner: 'TEAM B', finalScore: '60 - 42', done: true, location: '18723', open: false, dateAndTime: moment().subtract(7, 'days')._d, host: 10, zipcode: '11215', long: '-73.99397905916075', lat: '40.670707733961045' });
  await UserGame.create({ userId: 10, gameId: 12, team: 'TEAM A' });
  await UserGame.create({ userId: 9, gameId: 12, team: 'TEAM A' });
  await UserGame.create({ userId: 8, gameId: 12, team: 'TEAM B' });
  await UserGame.create({ userId: 7, gameId: 12, team: 'TEAM B'  });

  // some finished games
  await Game.create({ winner: 'TEAM B', finalScore: '44 - 18', done: true, location: '17540', open: false, dateAndTime: moment().subtract(14, 'days')._d, host: 1, zipcode: '11215', long: '-73.9855164184356', lat: '40.6723154820107' });
  await UserGame.create({ userId: 1, gameId: 13, team: 'TEAM A' });
  await UserGame.create({ userId: 2, gameId: 13, team: 'TEAM A'  });
  await UserGame.create({ userId: 3, gameId: 13, team: 'TEAM B'  });
  await UserGame.create({ userId: 4, gameId: 13, team: 'TEAM B'  });

  await Game.create({ winner: 'TEAM B', finalScore: '67 - 45', done: true, location: '17583', open: false, dateAndTime: moment().subtract(6, 'days')._d, host: 1, zipcode: '10019', long: '-73.9949361317764', lat: '40.76835005351661' });
  await UserGame.create({ userId: 1, gameId: 14, team: 'TEAM A' });
  await UserGame.create({ userId: 2, gameId: 14, team: 'TEAM A'  });
  await UserGame.create({ userId: 3, gameId: 14, team: 'TEAM B'  });
  await UserGame.create({ userId: 4, gameId: 14, team: 'TEAM B'  });

  await Game.create({ winner: 'TEAM A', finalScore: '123 - 111', done: true, location: '17998', open: false, dateAndTime: moment().subtract(7, 'days')._d, host: 1, zipcode: '10025', long: '-73.9683617998236', lat: '40.79551611458094' });
  await UserGame.create({ userId: 1, gameId: 15, team: 'TEAM A' });
  await UserGame.create({ userId: 2, gameId: 15, team: 'TEAM A'  });
  await UserGame.create({ userId: 3, gameId: 15, team: 'TEAM B'  });
  await UserGame.create({ userId: 4, gameId: 15, team: 'TEAM B'  });

  // a finished game but needs to be scored  
  await Game.create({ location: '14973', open: false, dateAndTime: moment().subtract(17, 'days')._d, host: 1, zipcode: '10025', long: '-73.95990891665473', lat: '40.79092207965378' });
  await UserGame.create({ userId: 1, gameId: 16, team: 'TEAM A' });
  await UserGame.create({ userId: 2, gameId: 16, team: 'TEAM A'  });
  await UserGame.create({ userId: 3, gameId: 16, team: 'TEAM B'  });
  await UserGame.create({ userId: 4, gameId: 16, team: 'TEAM B'  });
  

};

module.exports = syncAndSeed;