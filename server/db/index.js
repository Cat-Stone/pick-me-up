//could be split into models and database
const Sequelize = require("sequelize");
<<<<<<< HEAD
const { INTEGER, STRING, BOOLEAN, ENUM, DATE, BIGINT } = Sequelize;


//to see logging, do 'npm run start:dev:logger'
const config = {
  logging: false
};

if(process.env.LOGGING === 'true'){
  delete config.logging
}

// const db = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:JerryPine@localhost/basketball');
const db = new Sequelize(
	process.env.DATABASE_URL || "postgres://localhost/basketball", config
);
=======
const { INTEGER, STRING, BOOLEAN, ENUM, DATE} = Sequelize;
const db = require('./db');
const Game = require('./models/Game');
const Request = require('./models/Request');
const UserGame = require('./models/UserGame');
>>>>>>> master

// Auth
const bcrypt = require("bcrypt");

//So we can include a ton more personal information but just wanted to get
// us started
const User = db.define(
	"user",
	{
		email: {
			type: STRING,
		},
		password: {
			type: STRING,
		},
		name: {
			type: STRING,
		},
		age: {
			type: INTEGER,
		},
		height: {
			type: STRING,
		},
		description: {
			type: STRING,
		},
		photo: {
			type: STRING,
		},
	},
	{ timestamps: false }
);

// Salt passwords
User.beforeCreate(async (user, options) => {
	user.password = await bcrypt.hash(user.password, 10);
});

<<<<<<< HEAD
//Everything has been simplified to get us started :)
const Request = db.define(
	"request",
	{
		// this will need to be changed starting off really restirctive to  make testing
		// easier will need to replaced with LAT, LONG I assume
		location: {
			type: ENUM("COURT 1", "COURT 2", "COURT 3", "COURT 4", "COURT 5"),
		},
		// I think date and time can go together, keeping it very simple at the moment
		// just time date will be added back again very restrive for testing
		time: {
			type: INTEGER,
		},
		//it would be better if it just checked the time to see if it was an
		//open and closed request but this should work for now
		open: {
			type: BOOLEAN,
			defaultValue: true,
		},
		team: {
			type: STRING,
		},
		waitlist: {
			type: BOOLEAN,
			defaultValue: false,
		},
		baskets: {
			type: INTEGER,
		}
	},
	{ timestamps: false }
);



=======
>>>>>>> master
module.exports = {
  // Include your models in this exports object as well!
  db,
  models: {
    User, 
    Request,
    Game,
    UserGame
  }
}
