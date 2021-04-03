const express = require("express");
const router = express.Router();

const likecomCtrl = require("../controllers/likecom");

const auth = require("../middleware/auth"); // Request authentification

// * Add a likecom
router.post("/:commentid/like/:userid", auth, likecomCtrl.addLike);

// * Count likecom
router.get("/:commentid/like/", likecomCtrl.countLike);

module.exports = router;
