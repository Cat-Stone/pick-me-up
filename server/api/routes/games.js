const router = require('express').Router();
const { models: {Request, User, Game}  } = require('../../db');
const { Op } = require("sequelize");


// ------------------------------GAMES--------------------------------------------

//gets all games
router.get("/", async (req, res, next) => {
	try {
		res.send(await Game.findAll());
	} catch (ex) {
		next(ex);
	}
});

//gets all open games
router.get('/open', async(req, res, next)=> {
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

//gets all closed games
router.get('/closed', async(req, res, next)=> {
  try {
    res.send(await Game.findAll({
			where: {
				[Op.and]: [
					{ open: false },
					{ finalScore: { [Op.not]: null } }
				],
			},
			include: { 
				model: User,
			} 
    }));
  }
  catch(ex){
    next(ex);
  }
});

//gets a game
router.get('/:id', async(req, res, next)=> {
  try {
    res.send(await Game.findByPk(req.params.id));
  }
  catch(ex){
    next(ex);
  }
});

// creates a game
router.post("/", async (req, res, next) => {
	try {
		res.status(201).send(await Game.create(req.body));
	} catch (ex) {
		next(ex);
	}
});

//deletes a game
router.delete("/:id", async (req, res, next) => {
	try {
		const game = await Game.findByPk(req.params.id);
		await game.destroy();
		res.sendStatus(204);
	} catch (ex) {
		next(ex);
	}
});





module.exports = router;