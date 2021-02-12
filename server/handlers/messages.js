const db = require("../models");

exports.createMessage = async function (req, res, next) {
  try {
    let message = await db.Message.create({
      text: req.body.text,
      category: req.body.category,
      deadline: req.body.deadline,
      user: req.params.id,
    });
    let foundUser = await db.User.findById(req.params.id);
    foundUser.messages.push(message.id);
    await foundUser.save();
    let foundMessage = await db.Message.findById(message._id).populate("user", {
      username: true,
    });
    return res.status(200).json(foundMessage);
  } catch (err) {
    return next(err);
  }
};

exports.commitToMessage = async function (req, res, next) {
  try {
    let messageId = await db.Message.findById(req.params.message_id).select(
      "_id"
    );
    let user = await db.User.findById(req.params.id).select("username");

    const payload = {
      forMessageId: messageId._id,
      forUserName: user.username,
    };

    // if commit exists:
    let existingCommit = await db.Commit.findOne({ ...payload });

    if (!!existingCommit) {
      return res.status(303).json({ commitAlreadyExists: existingCommit });
    }

    let newCommit = await db.Commit.create({ ...payload });

    await newCommit.save();
    return res.status(200).json(newCommit);
  } catch (err) {
    return next(err);
  }
};

exports.decommitFromMessage = async function (req, res, next) {
  try {
    let messageId = await db.Message.findById(req.params.message_id).select(
      "_id"
    );
    let user = await db.User.findById(req.params.id).select("username");

    const payload = {
      forMessageId: messageId._id,
      forUserName: user.username,
    };

    // if commit exists:
    let existingCommit = await db.Commit.findOneAndDelete({ ...payload });

    return res.status(200).json(existingCommit);
  } catch (err) {
    return next(err);
  }
};

// GET - /api/users/:id/messages/:message_id
exports.getMessage = async function (req, res, next) {
  try {
    let message = await db.Message.find(req.params.message_id);
    return res.status(200).json(message);
  } catch (err) {
    return next(err);
  }
};

// DELETE /api/users/:id/messages/:message_id
exports.deleteMessage = async function (req, res, next) {
  try {
    let foundMessage = await db.Message.findById(req.params.message_id);
    await foundMessage.remove();

    return res.status(200).json(foundMessage);
  } catch (err) {
    return next(err);
  }
};
