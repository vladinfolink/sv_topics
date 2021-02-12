const mongoose = require("mongoose");

const commitSchema = new mongoose.Schema(
  {
    forMessageId: {
      type: String,
      required: true,
    },
    forUserName: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Commit = mongoose.model("Commit", commitSchema);
module.exports = Commit;
