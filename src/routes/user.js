const express = require("express");
const userController = require("../controllers/userController")
const { isLoggedIn } = require('../middlewares')

router = express.Router();


router.post("/registerpeople", userController.registerPeople)
router.post("/register", userController.registerAccount)
router.post("/login", userController.loginUser)
router.get('/user/me', isLoggedIn, async (req, res, next) => {
    res.json(req.user)
})

exports.router = router;