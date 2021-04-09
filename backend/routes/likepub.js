const express = require("express");
const router = express.Router();

const likepubCtrl = require("../controllers/likepub");

const auth = require("../middleware/auth"); // Request authentification

// * Add a likepub
router.post("/:pubid/like/:userid/", likepubCtrl.addLike); //! auth retiré !

// * Count likes
router.get("/:pubid/like/", likepubCtrl.countLike);

// TODO fonctionne
// * Count each symbol
router.get("/:pubid/count/:symbol", likepubCtrl.countSymbol);

// TODO Fonctionne
// * Add a symbol on publication (heart/thumb/...)
router.post("/:pubid/like/:userid/symbol/:symbol", likepubCtrl.addSymbol); //! auth retiré !

module.exports = router;
