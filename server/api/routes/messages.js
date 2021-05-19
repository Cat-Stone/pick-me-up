const router = require('express').Router();
const { models: { Message, UserGame, User, Game }} = require('../../db');
const passport = require("passport");
module.exports = router;

// gets all messages
router.get('/', async (req, res, next) => {
  try {
    res.send(await Message.findAll());
  } 
  catch (ex) {
    next(ex)
  }
});

// gets all messages with same gameId (using JWT)
router.get(
  '/:gameId',
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      res.send(await Message.findAll({
        where: {
          gameId: req.params.gameId
        },
        include: [ User ]
      }));
    } 
    catch (ex) {
      next(ex)
    }
  }
);

router.post('/', async (req, res, next) => {
  try {
    const created = await Message.create(req.body);
    const message = await Message.findByPk(created.id, {include: [ User ]})
    res.status(201).send(message);
  }
  catch(ex) {
    next(ex);
  }
});