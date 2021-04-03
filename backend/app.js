require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const helmet = require("helmet"); // Protect HTTP headers

const userRoutes = require("./routes/user");
const pubRoutes = require("./routes/publication");
const commRoutes = require("./routes/comment");
const likecomRoutes = require("./routes/likecom");
const likepubRoutes = require("./routes/likepub");

// Models
const { user } = require("./models");
const { publication } = require("./models");
const { comment } = require("./models");
const { likecom } = require("./models");
const { likepub } = require("./models");

//association tables user/publication
publication.belongsTo(user);
module.exports = { user, publication };

//association tables user/comment et pub/comment
comment.belongsTo(user);
module.exports = { user, comment };
comment.belongsTo(publication);
module.exports = { publication, comment };

//association tables likepub/pub et likepub/user
likepub.belongsTo(user);
module.exports = { user, likepub };
likepub.belongsTo(publication);
module.exports = { publication, likepub };

//association tables likecom/com et likecom/user
likecom.belongsTo(user);
module.exports = { user, likecom };
likecom.belongsTo(comment);
module.exports = { comment, likecom };

app.use(cors()); // Security CORS
app.use(bodyParser.json());
app.use(helmet());

// **** ROUTES ****

//  * User authentification
app.use("/api/auth", userRoutes);

// * Publications
app.use("/api/pub", pubRoutes);

// * Comments
app.use("/api/pub", commRoutes);

// * Likecom
app.use("/api/pub", likecomRoutes);

// * Likepub
app.use("/api/pub", likepubRoutes);

// * Access images
app.use("/images/", express.static(path.join(__dirname, "images")));

module.exports = app;
