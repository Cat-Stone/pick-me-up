const express = require("express");
const { static } = express;
const path = require("path");
<<<<<<< HEAD
const axios = require("axios");
const {
	db,
	models: { User, Request, Game, UserGame },
} = require("../db");
// i think there is a way to get it from db...?
const { Op } = require("sequelize");
const Sequelize = require("sequelize");

// Authentication
const bcrypt = require("bcrypt");

async function authenticate(password, hash) {
	const authStatus = await bcrypt.compare(password, hash);
	return authStatus;
}

const jwt = require("jsonwebtoken");
const jwtSecret  = require("../../secrets");


// const jwtSecret2 = 'shh'

async function generateAccessToken(user) {
	// console.log('---------------------------');
	// console.log(jwtSecret);
	const token = await jwt.sign(user, jwtSecret);
}
=======

>>>>>>> master

const app = express();
module.exports = app;

app.use(express.json());

app.use("/dist", static(path.join(__dirname, "..", "..", "dist")));
// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "..", "public")));

<<<<<<< HEAD
// login user
app.post("/login", async (req, res, next) => {
	let hash = "";

	// look up user
	try {
		user = await User.findOne({
			where: {
				email: req.body.email,
			},
		});

		hash = user.password;
	} catch (er) {
		res.status(401).send("User not found");
	}

	// compare hash with submitted password
	try {
		const authStatus = await authenticate(req.body.password, hash);
		if (authStatus) {
			const token = await generateAccessToken(req.body.email);
			res.status(200).json(token);
		} else {
			res.status(401).send("Invalid password");
		}
	} catch (er) {
		// throw new Error(er);
	}
});

// ------------------------------USERS--------------------------------------------
// can these litterally just be seperated out?? can I just add a router having a
// router would probably be the simpliest that is probably what I would try first
// but it can wait

//Update user
app.put('/api/users/update/:id', async (req,res,next) => {
  try {
		const user = await User.findByPk(req.params.id)
		console.log(req.body);
    res.send(await user.update({
			email: req.body.email,
			name: req.body.name,
			height: req.body.height,
			description: req.body.description,
			photo: req.body.photo
		}))
  }
  catch(error) {
    next(error)
  }
})

//gets all users
app.get("/api/users", async (req, res, next) => {
	try {
		res.send(await User.findAll());
	} catch (ex) {
		next(ex);
	}
});

//gets a user
app.get("/api/users/:id", async (req, res, next) => {
	try {
		res.send(await User.findByPk(req.params.id));
	} catch (ex) {
		next(ex);
	}
});

// creates a user
app.post("/api/users", async (req, res, next) => {
	try {
		res.status(201).send(await User.create(req.body));
	} catch (ex) {
		next(ex);
	}
});

//deletes a user
app.delete("/api/users/:id", async (req, res, next) => {
	try {
		const user = await User.findByPk(req.params.id);
		await user.destroy();
		res.sendStatus(204);
	} catch (ex) {
		next(ex);
	}
});

// ------------------------------REQUESTS--------------------------------------------

//gets all request
app.get("/api/requests", async (req, res, next) => {
	try {
		res.send(await Request.findAll({ include: [User, Game] }));
	} catch (ex) {
		next(ex);
	}
});

//gets all requests for a user joined with user and game :)
app.get("/api/requests/user/:id", async (req, res, next) => {
	try {
		res.send(
			await Request.findAll({
				where: { userId: req.params.id },
				include: [User, Game],
			})
		);
	} catch (ex) {
		next(ex);
	}
});

//gets all requests for a user when they are associated with a game they might have been waitlisted
app.get("/api/requests/user/game/:userId", async (req, res, next) => {
	try {
		res.send(
			await Request.findAll({
				where: {
					[Op.and]: [
						{ userId: req.params.userId },
						{ gameId: { [Op.not]: null } },
					],
				},
				include: [User, Game],
			})
		);
	} catch (ex) {
		next(ex);
	}
});

//gets all requests for a user when they are associated with a game and were not waitlisted so they most have played (in theory should check if game is over)
app.get("/api/requests/user/game/played/:userId", async (req, res, next) => {
	try {
		res.send(
			await Request.findAll({
				where: {
					[Op.and]: [
						{ userId: req.params.userId },
						{ gameId: { [Op.not]: null } },
						{ waitlist: false },
					],
				},
				include: [User, Game],
			})
		);
	} catch (ex) {
		next(ex);
	}
});

//trying to just get the games won by user
// NOT WORKING, works with {winner: "TEAM A"}
app.get(
	"/api/requests/user/game/played/won/:userId",
	async (req, res, next) => {
		try {
			res.send(
				await Request.findAll({
					where: {
						[Op.and]: [
							{ userId: req.params.userId },
							{ gameId: { [Op.not]: null } },
							{ waitlist: false },
						],
					},
					include: [
						{ model: Game, where: { winner: Sequelize.col("request.team") } },
					],
				})
			);
		} catch (ex) {
			console.log(ex);
			next(ex);
		}
	}
);

//gets a request not sure if we will need this but it's easy to write
app.get("/api/requests/:id", async (req, res, next) => {
	try {
		res.send(await Request.findByPk(req.params.id, { include: [User, Game] }));
	} catch (ex) {
		next(ex);
	}
});

// creates a request
app.post("/api/requests", async (req, res, next) => {
	try {
		res.status(201).send(await Request.create(req.body));
	} catch (ex) {
		next(ex);
	}
});

//deletes a user
app.delete("/api/requests/:id", async (req, res, next) => {
	try {
		const request = await Request.findByPk(req.params.id);
		await request.destroy();
		res.sendStatus(204);
	} catch (ex) {
		next(ex);
	}
});

// ------------------------------GAMES--------------------------------------------

//gets all games
app.get("/api/games", async (req, res, next) => {
	try {
		res.send(await Game.findAll());
	} catch (ex) {
		next(ex);
	}
});

//gets all open games
app.get('/api/games/open', async(req, res, next)=> {
  try {
    res.send(await Game.findAll({
      where: {
        open: true
      },
			include: [ User ]
    }));
  }
  catch(ex){
    next(ex);
  }
});

//gets a game
app.get('/api/games/:id', async(req, res, next)=> {
  try {
    res.send(await Game.findByPk(req.params.id));
  }
  catch(ex){
    next(ex);
  }
});

// creates a game
app.post("/api/games", async (req, res, next) => {
	try {
		res.status(201).send(await Game.create(req.body));
	} catch (ex) {
		next(ex);
	}
});

//deletes a game
app.delete("/api/games/:id", async (req, res, next) => {
	try {
		const game = await Game.findByPk(req.params.id);
		await game.destroy();
		res.sendStatus(204);
	} catch (ex) {
		next(ex);
	}
});

// again not using at the moment but will leave in
//gets all user_games
app.get("/api/user_games", async (req, res, next) => {
	try {
		res.send(await UserGame.findAll({ include: [User, Game] }));
	} catch (ex) {
		next(ex);
	}
});
=======
app.get("/", (req, res, next) =>
	res.sendFile(path.join(__dirname, "..", "..", "public/index.html"))
);

//the router :)
app.use("/api", require("./routes"));
>>>>>>> master


//gets players of a single game
app.get('/api/user_games/:gameId/players', async(req, res, next)=> {
  try{
    const gameUsers = await UserGame.findAll({
      where: {
        gameId: req.params.gameId
      },
      include: [ User ]
    });
    const players = gameUsers.map(user => user.user);
    res.send(players);
  }
  catch(ex){
    next(ex);
  }
})

//creates a user-game link
app.post('/api/user_games', async(req, res, next)=> {
	try{
		res.status(201).send(await UserGame.create(req.body));
	}
	catch(ex){
		next(ex);
	}
})


//final error catcher 
app.use((err, req, res, next)=>{
  res.status(500).send({ error: err });
});
