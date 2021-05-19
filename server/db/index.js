const db = require("./db");
const Game = require("./models/Game");
const Message = require("./models/Message");
const Request = require("./models/Request");
const UserGame = require("./models/UserGame");
const User = require("./models/User");
require('dotenv').config();

module.exports = {
	// Include your models in this exports object as well!
	db,
	models: {
		User,
		Request,
		Game,
		UserGame,
		Message
	},
};

//one to many relationship
User.hasMany(Request);
Request.belongsTo(User);

Game.hasMany(Request);
Request.belongsTo(Game);

// sequelize makes us do this to use include 
User.belongsToMany(Game, { through: UserGame });
Game.belongsToMany(User, { through: UserGame });
User.hasMany(UserGame);
UserGame.belongsTo(User);
Game.hasMany(UserGame);
UserGame.belongsTo(Game);

// Message associations
Message.belongsTo(User);
Message.belongsTo(Game);
User.hasMany(Message);
Game.hasMany(Message);
