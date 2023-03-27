const express = require("express");
const AccountClaimantController = require("../controllers/accountClaimantController")

router = express.Router();


router.post("/accountclaimant", AccountClaimantController.registerAccountClaimant);

router.get("/searchname", AccountClaimantController.searchNameClaimant);

router.get("/searchidcard", AccountClaimantController.searchIdCard);

router.get("/accbyid/:id", AccountClaimantController.searchById);

router.get("/accountclaimant", AccountClaimantController.getAllAccountClaimant)



exports.router = router;