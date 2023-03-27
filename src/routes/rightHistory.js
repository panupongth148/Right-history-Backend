const express = require("express");
const rightHistoryController = require("../controllers/rightHistoryController")
var multer = require("multer");
var path = require('path');
const { router } = require("./accountClaimant");
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./static/uploads");
  },
  filename: function (req, file, callback) {
    // console.log(file.originalname)
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });



router.post("/righthistory/create", upload.array("files"), rightHistoryController.createRightHistory);
router.delete("/rights/:id", rightHistoryController.deleteById)
router.get("/rights/:id", rightHistoryController.findRightDetail)





exports.router = router;