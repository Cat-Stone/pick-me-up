//could be split into models and database
const Sequelize = require("sequelize");
const { INTEGER, STRING, BOOLEAN, ENUM } = Sequelize;
// const db = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:JerryPine@localhost/basketball');
const db = new Sequelize(
	process.env.DATABASE_URL || "postgres://localhost/basketball"
);

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
		},
	},
	// timestamps will be added back at the end too confusing to look at right now
	{ timestamps: false }
);

const Game = db.define('game', {
  //Once matching does not need to be exact time/date, and location will need 
  //to be put back 
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
    type: ENUM('COURT 1', 'COURT 2', 'COURT 3','COURT 4','COURT 5'), 
  },
  // I think date and time can go together, keeping it very simple at the moment
  // just time date will be added back again very restrive for testing 
  time: { 
      type: INTEGER
  }
},{ timestamps: false });  

// we are not using this for the moment but going to leave in just in case
//this is the through table to connect users to a game 
const UserGame = db.define('usergame', {
  team: {
    type: STRING,
  }
},{ timestamps: false });

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
