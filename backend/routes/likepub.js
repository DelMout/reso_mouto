const express = require("express");
const router = express.Router();

const likepubCtrl = require("../controllers/likepub");

const auth = require("../middleware/auth"); // Request authentification

// * Add a likepub
router.post("/:pubid/like/:userid", auth, likepubCtrl.addLike);

// * Count likes
router.get("/:pubid/like/", likepubCtrl.countLike);

module.exports = router;
