const Sequelize = require('sequelize');
const { db, models: { User, Request, Game, UserGame } } = require('./db');
const app = require('./api')
const faker = require('faker');

// should be able to add relationships here

//one to many relationship
User.hasMany(Request);
Request.belongsTo(User);

Game.hasMany(Request);
Request.belongsTo(Game);

// not using for the moment leaving in just in case
// sequelize makes us do this to use include 
User.belongsToMany(Game, { through: UserGame });
Game.belongsToMany(User, { through: UserGame });
User.hasMany(UserGame);
UserGame.belongsTo(User);
Game.hasMany(UserGame);
UserGame.belongsTo(Game);


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
  //10 generic requests closed request so past requests
  // for (let i = 1; i<= 10; i++){
  //   // let email = "test"+i+"@email.com";
  //   await Request.create({ location: 'COURT 1', open: false, time: i, userId: i});
  // }
  //8 generic open requests
  for (let i = 1; i<= 8; i++){
    // let email = "test"+i+"@email.com";
    await Game.create({location: 'COURT 1', time: 9-i});
    await UserGame.create({ userId: i, gameId: i });
    // await Request.create({ location: 'COURT 1', time: 9-i, userId: i, gameId: i});
  }

  //creating some data for user
  await User.create({ email: "MichaelJordan@gmail.com", name: 'Michael Jordan', age: 21, height:'6\'6', description: "GOAT", photo: 'https://media.gq.com/photos/5e99bf6fe5102200088e8eb2/3:4/w_1107,h_1476,c_limit/GQ-MichaelJordan-041720.jpg', password: "helloworld", })

  // an almost full game
  await Game.create({location: 'COURT 1', time: 3});
  await UserGame.create({ userId: 10, gameId: 9 });
  await UserGame.create({ userId: 9, gameId: 9 });
  // await Request.create({ location: 'COURT 1', time: 3, userId: 10, gameId: 9});
  // await Request.create({ location: 'COURT 1', time: 3, userId: 9, gameId: 9});

  // a finished game
  await Game.create({ winner: 'TEAM A', finalScore: '100 - 2', done: true, location: 'COURT 1', open: false, time: 1 });
  await UserGame.create({ userId: 1, gameId: 10, team: 'TEAM A' });
  await UserGame.create({ userId: 2, gameId: 10, team: 'TEAM A'  });
  await UserGame.create({ userId: 3, gameId: 10, team: 'TEAM B'  });
  await UserGame.create({ userId: 4, gameId: 10, team: 'TEAM B'  });



  // with scores and two people who were wait listed  
  // await Request.create({ location: 'COURT 1', open: false, time: 1, userId: 1, gameId: 10, team: 'TEAM A', baskets: 98});
  // await Request.create({ location: 'COURT 1', open: false, time: 1, userId: 2, gameId: 10, team: 'TEAM A', baskets: 2});
  // await Request.create({ location: 'COURT 1', open: false, time: 1, userId: 3, gameId: 10, team: 'TEAM B', baskets: 0});
  // await Request.create({ location: 'COURT 1', open: false, time: 1, userId: 4, gameId: 10, team: 'TEAM B', baskets: 2});
  // await Request.create({ location: 'COURT 1', open: false, time: 1, userId: 5, gameId: 10, waitlist: true});
  // await Request.create({ location: 'COURT 1', open: false, time: 1, userId: 6, gameId: 10, waitlist: true});



  //an ongoing game (or game about to happen) with one player on wait list
  await Game.create({ location: 'COURT 1', open: false, time: 9 });
  await UserGame.create({ userId: 5, gameId: 11 });
  await UserGame.create({ userId: 6, gameId: 11 });
  await UserGame.create({ userId: 3, gameId: 11 });
  await UserGame.create({ userId: 1, gameId: 11 });

  // await Request.create({ location: 'COURT 1', open: false, time: 9, userId: 5, gameId: 11});
  // await Request.create({ location: 'COURT 1', open: false, time: 9, userId: 6, gameId: 11});
  // await Request.create({ location: 'COURT 1', open: false, time: 9, userId: 3, gameId: 11});
  // await Request.create({ location: 'COURT 1', open: false, time: 9, userId: 1, gameId: 11});
  // await Request.create({ location: 'COURT 1', open: false, time: 9, userId: 8, gameId: 11, waitlist: true});1


  // another random game finished game
  await Game.create({ winner: 'TEAM B', finalScore: '60 - 42', done: true, location: 'COURT 2', open: false, time: 2 });
  await UserGame.create({ userId: 10, gameId: 12 });
  await UserGame.create({ userId: 9, gameId: 12 });
  await UserGame.create({ userId: 8, gameId: 12 });
  await UserGame.create({ userId: 7, gameId: 12 });
  // with scores and two people who were wait listed  
  // await Request.create({ location: 'COURT 2', open: false, time: 2, userId: 10, gameId: 12, team: 'TEAM A', baskets: 32});
  // await Request.create({ location: 'COURT 2', open: false, time: 2, userId: 9, gameId: 12, team: 'TEAM A', baskets: 10});
  // await Request.create({ location: 'COURT 2', open: false, time: 2, userId: 8, gameId: 12, team: 'TEAM B', baskets: 28});
  // await Request.create({ location: 'COURT 2', open: false, time: 2, userId: 7, gameId: 12, team: 'TEAM B', baskets: 32});
  // await Request.create({ location: 'COURT 2', open: false, time: 2, userId: 4, gameId: 12, waitlist: true});
  // await Request.create({ location: 'COURT 2', open: false, time: 2, userId: 1, gameId: 12, waitlist: true});
    // a finished game
    await Game.create({ winner: 'TEAM B', finalScore: '44 - 18', done: true, location: 'COURT 3', open: false, time: 1 });
    await UserGame.create({ userId: 1, gameId: 13, team: 'TEAM A' });
    await UserGame.create({ userId: 2, gameId: 13, team: 'TEAM A'  });
    await UserGame.create({ userId: 3, gameId: 13, team: 'TEAM B'  });
    await UserGame.create({ userId: 4, gameId: 13, team: 'TEAM B'  });

    await Game.create({ winner: 'TEAM B', finalScore: '67 - 45', done: true, location: 'COURT 5', open: false, time: 6 });
    await UserGame.create({ userId: 1, gameId: 14, team: 'TEAM A' });
    await UserGame.create({ userId: 2, gameId: 14, team: 'TEAM A'  });
    await UserGame.create({ userId: 3, gameId: 14, team: 'TEAM B'  });
    await UserGame.create({ userId: 4, gameId: 14, team: 'TEAM B'  });

    await Game.create({ winner: 'TEAM A', finalScore: '123 - 111', done: true, location: 'COURT 4', open: false, time: 3 });
    await UserGame.create({ userId: 1, gameId: 15, team: 'TEAM A' });
    await UserGame.create({ userId: 2, gameId: 15, team: 'TEAM A'  });
    await UserGame.create({ userId: 3, gameId: 15, team: 'TEAM B'  });
    await UserGame.create({ userId: 4, gameId: 15, team: 'TEAM B'  });
};

const init = async () => {
	try {
		await syncAndSeed();
		const port = process.env.PORT || 3000;
		app.listen(port, () => console.log(`listening on port ${port}`));
	} catch (ex) {
		console.log(ex);
	}
};

init();
