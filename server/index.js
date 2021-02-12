const app = require("./sockets/io").app;
const server = require("./sockets/io").server;

const bodyParser = require("body-parser");
const cors = require("cors");

const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");
const messagesRoutes = require("./routes/messages");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");
const db = require("./models");

require("dotenv").config();

const apiPort = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use(
  "/api/users/:id/messages",
  loginRequired,
  ensureCorrectUser,
  messagesRoutes
);

app.get("/api/messages", loginRequired, async function (req, res, next) {
  try {
    let messages = await db.Message.find()
      .sort({ createdAt: "desc" })
      .populate("user", {
        username: true
      });
    return res.status(200).json(messages);
  } catch (err) {
    return next(err);
  }
});

app.get(
  "/api/commits/:messageId",
  loginRequired,
  async function (req, res, next) {
    try {
      let commits = await db.Commit.find({
        forMessageId: req.params.messageId,
      }).sort({
        createdAt: "desc",
      });

      return res.status(200).json(commits);
    } catch (err) {
      return next(err);
    }
  }
);

app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

server.listen(apiPort, () => console.log(`Server on port ${apiPort}`));
