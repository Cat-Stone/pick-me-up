const router = require("express").Router();
module.exports = router;

router.use("/requests", require("./requests"));

router.use("/games", require("./games"));

router.use("/user_games", require("./user_games"));

router.use("/users", require("./users"));

router.use("/login", require("./login"));

router.use("/messages", require("./messages"));

router.use((req, res, next) => {
	const error = new Error("Not Found");
	error.status = 404;
	next(error);
});
