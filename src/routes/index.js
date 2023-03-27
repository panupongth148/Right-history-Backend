const express = require("express");



router = express.Router();


router.get("/", (req, res) => {
    res.send("welcome to initial express node js resful api");
});




exports.router = router;